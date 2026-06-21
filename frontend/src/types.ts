export type PageType =
  | 'home'
  | 'membership'
  | 'programs'
  | 'trainers'
  | 'transformations'
  | 'gallery'
  | 'trial'
  | 'contact'
  | 'tools'
  | 'login'
  | 'dashboard';

export interface StatItem {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  metrics: string;
}

export interface PriceTier {
  name: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular: boolean;
  tagline: string;
}

export interface GymClass {
  id: string;
  name: string;
  time: string;
  trainer: string;
  category: string;
  intensity: 'High' | 'Medium' | 'Low';
  duration: string;
}

export interface DaySchedule {
  day: string;
  classes: GymClass[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  category: 'strength' | 'weight_loss' | 'nutrition' | 'functional';
  photoUrl: string;
  certifications: string[];
  experience: string;
  specialization: string[];
  successMetric: string;
  quote: string;
}

export interface Transformation {
  id: string;
  name: string;
  age: number;
  goal: string;
  beforeImg: string;
  afterImg: string;
  beforeWeight: string;
  afterWeight: string;
  duration: string;
  story: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: 'interior' | 'equipment' | 'classes' | 'events' | 'members';
  title: string;
}

export interface TrialBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  goal: string;
  preferredTime: string;
  selectedDay: string;
  voucherId: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
