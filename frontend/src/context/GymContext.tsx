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
  login: (email: string, pass: string) => Promise<boolean>;
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
  address: "FITEX FITNESS GYM Birgunj 44300, Nepal",
  phone: "+977 981-1250236",
  email: "harshagrawal5843@gmail.com",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.6183829078836!2d84.87037317430811!3d27.010619076588878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39935500780209ed%3A0xafc5d195aa2515ee!2sFITEX%20FITNESS%20GYM!5e0!3m2!1sen!2sus!4v1782055781084!5m2!1sen!2sus"
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

  const fetchData = async () => {
    try {
      // 1. Fetch Plans
      const plansRes = await fetch(`${API_BASE}/plans`);
      if (plansRes.ok) {
        const plansData = await plansRes.json();
        if (plansData && plansData.length > 0) {
          setMembershipPlans(plansData);
          localStorage.setItem('fitex_plans', JSON.stringify(plansData));
        } else {
          // If empty in DB, try to seed
          await fetch(`${API_BASE}/seed`, { method: 'POST' });
          const rePlans = await fetch(`${API_BASE}/plans`).then(r => r.json());
          setMembershipPlans(rePlans);
          localStorage.setItem('fitex_plans', JSON.stringify(rePlans));
        }
      } else {
        throw new Error('Offline');
      }

      // 2. Fetch Coaches
      const coachesRes = await fetch(`${API_BASE}/coaches`);
      if (coachesRes.ok) {
        const coachesData = await coachesRes.json();
        setCoaches(coachesData);
        localStorage.setItem('fitex_coaches', JSON.stringify(coachesData));
      }

      // 3. Fetch Gallery
      const galleryRes = await fetch(`${API_BASE}/gallery`);
      if (galleryRes.ok) {
        const galleryData = await galleryRes.json();
        setGalleryItems(galleryData);
        localStorage.setItem('fitex_gallery', JSON.stringify(galleryData));
      }

      // 4. Fetch Contact Info
      const infoRes = await fetch(`${API_BASE}/contact-info`);
      if (infoRes.ok) {
        const infoData = await infoRes.json();
        setContactInfo(infoData);
        localStorage.setItem('fitex_contact_info', JSON.stringify(infoData));
      }

      // 5. Fetch Bookings
      const bookingsRes = await fetch(`${API_BASE}/bookings`);
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setTrialBookings(bookingsData);
        localStorage.setItem('fitex_bookings', JSON.stringify(bookingsData));
      }

      // 6. Fetch Submissions
      const contactRes = await fetch(`${API_BASE}/contacts`);
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContactSubmissions(contactData);
        localStorage.setItem('fitex_contacts', JSON.stringify(contactData));
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
    // Always call fetchData first, which pulls new data from the backend and updates localStorage
    fetchData();
    const session = localStorage.getItem('fitex_session');
    if (session) setCurrentUser(JSON.parse(session));
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (res.ok) {
        const session = await res.json();
        setCurrentUser(session);
        localStorage.setItem('fitex_session', JSON.stringify(session));
        return true;
      }
    } catch (err) {
      console.warn("Backend auth failed or unreachable, trying local fallback:", err);
    }

    // Local fallback for offline mode
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
