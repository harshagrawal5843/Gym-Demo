"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PriceTier, Trainer, TrialBooking, ContactSubmission, GalleryItem } from '../types';

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
        } else {
          // If empty in DB, try to seed
          await fetch(`${API_BASE}/seed`, { method: 'POST' });
          const rePlans = await fetch(`${API_BASE}/plans`).then(r => r.json());
          setMembershipPlans(rePlans);
        }
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
      console.warn("Backend API not reachable:", err);
    }
  };

  useEffect(() => {
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
      console.warn("Backend auth failed or unreachable:", err);
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
      }
    } catch (err) {
      console.error(err);
    }
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
      }
    } catch (err) {
      console.error(err);
    }
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
      }
    } catch (err) {
      console.error(err);
    }
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
      }
    } catch (err) {
      console.error(err);
    }
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
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCoach = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/coaches/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCoaches(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
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
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setGalleryItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
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
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetDatabase = async () => {
    try {
      const res = await fetch(`${API_BASE}/reset`, {
        method: 'POST',
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
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
      membershipPlans: [] as PriceTier[],
      coaches: [] as Trainer[],
      trialBookings: [] as TrialBooking[],
      contactSubmissions: [] as ContactSubmission[],
      galleryItems: [] as GalleryItem[],
      contactInfo: defaultContact,
      currentUser: null,
      login: async () => false,
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
