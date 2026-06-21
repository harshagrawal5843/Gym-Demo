"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PriceTier, Trainer, TrialBooking, ContactSubmission, GalleryItem } from '../types';
import { 
  pricingPlans as initialPlans, 
  trainersData as initialCoaches,
  galleryItemsData as initialGallery
} from '../data';

interface UserSession {
  email: string;
  role: 'owner' | 'developer';
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
}

interface GymContextType {
  membershipPlans: PriceTier[];
  coaches: Trainer[];
  trialBookings: TrialBooking[];
  contactSubmissions: ContactSubmission[];
  galleryItems: GalleryItem[];
  contactInfo: ContactInfo;
  currentUser: UserSession | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  addTrialBooking: (booking: Omit<TrialBooking, 'id' | 'createdAt'>) => Promise<void>;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'createdAt'>) => Promise<void>;
  updateMembershipPlan: (updatedPlan: PriceTier) => Promise<void>;
  addCoach: (coach: Omit<Trainer, 'id'>) => Promise<void>;
  updateCoach: (coach: Trainer) => Promise<void>;
  deleteCoach: (id: string) => Promise<void>;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  updateContactInfo: (info: ContactInfo) => Promise<void>;
  resetDatabase: () => Promise<void>;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

const defaultContact: ContactInfo = {
  address: "Link Road, Birgunj, Nepal - 44300",
  phone: "+977 51-523456",
  email: "birgunj@fitex.com",
  mapEmbedUrl: "https://maps.google.com/maps?q=Birgunj%20Nepal&t=&z=14&ie=UTF8&iwloc=&output=embed"
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function GymProvider({ children }: { children: React.ReactNode }) {
  const [membershipPlans, setMembershipPlans] = useState<PriceTier[]>([]);
  const [coaches, setCoaches] = useState<Trainer[]>([]);
  const [trialBookings, setTrialBookings] = useState<TrialBooking[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContact);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  // Helper fetcher with fallback logic
  const fetchData = async () => {
    try {
      // 1. Fetch Plans
      const plansRes = await fetch(`${API_BASE}/plans`);
      if (plansRes.ok) {
        const plansData = await plansRes.json();
        if (plansData && plansData.length > 0) {
          setMembershipPlans(plansData);
        } else {
          // If empty in DB, try to seed
          await fetch(`${API_BASE}/seed`, { method: 'POST' });
          const rePlans = await fetch(`${API_BASE}/plans`).then(r => r.json());
          setMembershipPlans(rePlans);
        }
      } else {
        throw new Error('Offline');
      }

      // 2. Fetch Coaches
      const coachesRes = await fetch(`${API_BASE}/coaches`);
      if (coachesRes.ok) {
        setCoaches(await coachesRes.json());
      }

      // 3. Fetch Gallery
      const galleryRes = await fetch(`${API_BASE}/gallery`);
      if (galleryRes.ok) {
        setGalleryItems(await galleryRes.json());
      }

      // 4. Fetch Contact Info
      const infoRes = await fetch(`${API_BASE}/contact-info`);
      if (infoRes.ok) {
        setContactInfo(await infoRes.json());
      }

      // 5. Fetch Bookings
      const bookingsRes = await fetch(`${API_BASE}/bookings`);
      if (bookingsRes.ok) {
        setTrialBookings(await bookingsRes.json());
      }

      // 6. Fetch Submissions
      const contactRes = await fetch(`${API_BASE}/contacts`);
      if (contactRes.ok) {
        setContactSubmissions(await contactRes.json());
      }

    } catch (err) {
      console.warn("Backend API not reachable. Loading from localStorage fallback:", err);
      loadLocalStorageFallback();
    }
  };

  const loadLocalStorageFallback = () => {
    const plans = localStorage.getItem('fitex_plans');
    const trainerList = localStorage.getItem('fitex_coaches');
    const bookings = localStorage.getItem('fitex_bookings');
    const contacts = localStorage.getItem('fitex_contacts');
    const gallery = localStorage.getItem('fitex_gallery');
    const info = localStorage.getItem('fitex_contact_info');

    if (plans) setMembershipPlans(JSON.parse(plans));
    else {
      setMembershipPlans(initialPlans);
      localStorage.setItem('fitex_plans', JSON.stringify(initialPlans));
    }

    if (trainerList) setCoaches(JSON.parse(trainerList));
    else {
      setCoaches(initialCoaches);
      localStorage.setItem('fitex_coaches', JSON.stringify(initialCoaches));
    }

    if (gallery) setGalleryItems(JSON.parse(gallery));
    else {
      setGalleryItems(initialGallery);
      localStorage.setItem('fitex_gallery', JSON.stringify(initialGallery));
    }

    if (info) setContactInfo(JSON.parse(info));
    else {
      setContactInfo(defaultContact);
      localStorage.setItem('fitex_contact_info', JSON.stringify(defaultContact));
    }

    if (bookings) setTrialBookings(JSON.parse(bookings));
    if (contacts) setContactSubmissions(JSON.parse(contacts));
  };

  useEffect(() => {
    fetchData();
    const session = localStorage.getItem('fitex_session');
    if (session) setCurrentUser(JSON.parse(session));
  }, []);

  const login = (email: string, pass: string): boolean => {
    let session: UserSession | null = null;

    if (email === 'owner@fitex.com' && pass === 'owner123') {
      session = { email, role: 'owner' };
    } else if (email === 'dev@fitex.com' && pass === 'dev123') {
      session = { email, role: 'developer' };
    }

    if (session) {
      setCurrentUser(session);
      localStorage.setItem('fitex_session', JSON.stringify(session));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fitex_session');
  };

  const addTrialBooking = async (booking: Omit<TrialBooking, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
        const newBooking = await res.json();
        setTrialBookings(prev => [newBooking, ...prev]);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const newBooking: TrialBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [newBooking, ...trialBookings];
    setTrialBookings(updated);
    localStorage.setItem('fitex_bookings', JSON.stringify(updated));
  };

  const addContactSubmission = async (submission: Omit<ContactSubmission, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      if (res.ok) {
        const newSub = await res.json();
        setContactSubmissions(prev => [newSub, ...prev]);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const newSubmission: ContactSubmission = {
      ...submission,
      id: `contact-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [newSubmission, ...contactSubmissions];
    setContactSubmissions(updated);
    localStorage.setItem('fitex_contacts', JSON.stringify(updated));
  };

  const updateMembershipPlan = async (updatedPlan: PriceTier) => {
    try {
      const res = await fetch(`${API_BASE}/plans`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlan),
      });
      if (res.ok) {
        const updatedData = await res.json();
        setMembershipPlans(prev => prev.map(p => p.name === updatedData.name ? updatedData : p));
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const updated = membershipPlans.map(p => p.name === updatedPlan.name ? updatedPlan : p);
    setMembershipPlans(updated);
    localStorage.setItem('fitex_plans', JSON.stringify(updated));
  };

  const addCoach = async (coach: Omit<Trainer, 'id'>) => {
    try {
      const res = await fetch(`${API_BASE}/coaches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coach),
      });
      if (res.ok) {
        const newCoach = await res.json();
        setCoaches(prev => [...prev, newCoach]);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const newCoach: Trainer = {
      ...coach,
      id: `coach-${Date.now()}`,
    };
    const updated = [...coaches, newCoach];
    setCoaches(updated);
    localStorage.setItem('fitex_coaches', JSON.stringify(updated));
  };

  const updateCoach = async (updatedCoach: Trainer) => {
    try {
      const res = await fetch(`${API_BASE}/coaches/${updatedCoach.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCoach),
      });
      if (res.ok) {
        const newCoach = await res.json();
        setCoaches(prev => prev.map(c => c.id === newCoach.id ? newCoach : c));
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const updated = coaches.map(c => c.id === updatedCoach.id ? updatedCoach : c);
    setCoaches(updated);
    localStorage.setItem('fitex_coaches', JSON.stringify(updated));
  };

  const deleteCoach = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/coaches/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCoaches(prev => prev.filter(c => c.id !== id));
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const updated = coaches.filter(c => c.id !== id);
    setCoaches(updated);
    localStorage.setItem('fitex_coaches', JSON.stringify(updated));
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    try {
      const res = await fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const newItem = await res.json();
        setGalleryItems(prev => [newItem, ...prev]);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const newItem: GalleryItem = {
      ...item,
      id: `gallery-${Date.now()}`,
    };
    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);
    localStorage.setItem('fitex_gallery', JSON.stringify(updated));
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setGalleryItems(prev => prev.filter(item => item.id !== id));
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    const updated = galleryItems.filter(item => item.id !== id);
    setGalleryItems(updated);
    localStorage.setItem('fitex_gallery', JSON.stringify(updated));
  };

  const updateContactInfo = async (info: ContactInfo) => {
    try {
      const res = await fetch(`${API_BASE}/contact-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        const newInfo = await res.json();
        setContactInfo(newInfo);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    setContactInfo(info);
    localStorage.setItem('fitex_contact_info', JSON.stringify(info));
  };

  const resetDatabase = async () => {
    try {
      const res = await fetch(`${API_BASE}/reset`, {
        method: 'POST',
      });
      if (res.ok) {
        fetchData();
        return;
      }
    } catch (err) {
      console.error(err);
    }
    // Local fallback
    setMembershipPlans(initialPlans);
    setCoaches(initialCoaches);
    setGalleryItems(initialGallery);
    setContactInfo(defaultContact);
    setTrialBookings([]);
    setContactSubmissions([]);
    localStorage.setItem('fitex_plans', JSON.stringify(initialPlans));
    localStorage.setItem('fitex_coaches', JSON.stringify(initialCoaches));
    localStorage.setItem('fitex_gallery', JSON.stringify(initialGallery));
    localStorage.setItem('fitex_contact_info', JSON.stringify(defaultContact));
    localStorage.removeItem('fitex_bookings');
    localStorage.removeItem('fitex_contacts');
  };

  return (
    <GymContext.Provider value={{
      membershipPlans,
      coaches,
      trialBookings,
      contactSubmissions,
      galleryItems,
      contactInfo,
      currentUser,
      login,
      logout,
      addTrialBooking,
      addContactSubmission,
      updateMembershipPlan,
      addCoach,
      updateCoach,
      deleteCoach,
      addGalleryItem,
      deleteGalleryItem,
      updateContactInfo,
      resetDatabase
    }}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const context = useContext(GymContext);
  if (!context) {
    return {
      membershipPlans: [],
      coaches: [],
      trialBookings: [],
      contactSubmissions: [],
      galleryItems: [],
      contactInfo: defaultContact,
      currentUser: null,
      login: () => false,
      logout: () => {},
      addTrialBooking: async () => {},
      addContactSubmission: async () => {},
      updateMembershipPlan: async () => {},
      addCoach: async () => {},
      updateCoach: async () => {},
      deleteCoach: async () => {},
      addGalleryItem: async () => {},
      deleteGalleryItem: async () => {},
      updateContactInfo: async () => {},
      resetDatabase: async () => {}
    };
  }
  return context;
}
