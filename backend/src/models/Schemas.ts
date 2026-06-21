import { Schema, model } from 'mongoose';

// Plan Schema (PriceTier)
const PlanSchema = new Schema({
  name: { type: String, required: true, unique: true },
  monthlyPrice: { type: Number, required: true },
  quarterlyPrice: { type: Number, required: true },
  yearlyPrice: { type: Number, required: true },
  features: { type: [String], required: true },
  popular: { type: Boolean, default: false },
  tagline: { type: String, required: true }
});

// Trainer Schema (Coach)
const TrainerSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  category: { type: String, required: true },
  photoUrl: { type: String, required: true },
  certifications: { type: [String], required: true },
  experience: { type: String, required: true },
  specialization: { type: [String], required: true },
  successMetric: { type: String, required: true },
  quote: { type: String, required: true }
});

// TrialBooking Schema
const TrialBookingSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  goal: { type: String, required: true },
  preferredTime: { type: String, required: true },
  selectedDay: { type: String, required: true },
  voucherId: { type: String },
  createdAt: { type: String, required: true }
});

// ContactSubmission Schema
const ContactSubmissionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: String, required: true }
});

// GalleryItem Schema
const GalleryItemSchema = new Schema({
  id: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true }
});

// ContactInfo Schema
const ContactInfoSchema = new Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  mapEmbedUrl: { type: String }
});

export const Plan = model('Plan', PlanSchema);
export const Trainer = model('Trainer', TrainerSchema);
export const TrialBooking = model('TrialBooking', TrialBookingSchema);
export const ContactSubmission = model('ContactSubmission', ContactSubmissionSchema);
export const GalleryItem = model('GalleryItem', GalleryItemSchema);
export const ContactInfo = model('ContactInfo', ContactInfoSchema);
