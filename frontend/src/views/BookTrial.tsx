"use client";

import React, { useState } from 'react';
import { PageType } from '../types';
import { Calendar, Clock, Flame, ShieldAlert, CheckCircle, Smartphone, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGym } from '../context/GymContext';

interface BookTrialProps {
  setCurrentPage: (page: PageType) => void;
}

export default function BookTrial({ setCurrentPage }: BookTrialProps) {
  const { addTrialBooking } = useGym();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'muscle_building',
    preferredTime: 'evening_rush',
    selectedDay: 'Tomorrow'
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [voucherId] = useState<string>(() => `FORGE-${Math.floor(1000 + Math.random() * 9000)}`);
  const [errorText, setErrorText] = useState<string | null>(null);

  const goals = [
    { id: 'fat_loss', label: 'Metabolic Shred', icon: '🔥' },
    { id: 'muscle_building', label: 'Muscle Building', icon: '💪' },
    { id: 'strength_training', label: 'Absolute Strength', icon: '🏋️' },
    { id: 'posture_symmetry', label: 'Corrective & Joint Safe', icon: '🧘' }
  ];

  const timeSlots = [
    { id: 'morning_early', label: 'Dawn Lifter (05:00 AM - 08:30 AM)', desc: 'Peaceful deck access' },
    { id: 'morning_mid', label: 'Mid-Morning (09:00 AM - 12:00 PM)', desc: 'Coaches highly available' },
    { id: 'evening_rush', label: 'Evening Peak (05:00 PM - 09:00 PM)', desc: 'Absolute high energy' }
  ];

  const days = ['Today', 'Tomorrow', 'Day After Tomorrow', 'Next Monday'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorText('Please fill out all contact fields to reserve your customized voucher.');
      return;
    }
    setErrorText(null);
    addTrialBooking({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      goal: formData.goal,
      preferredTime: formData.preferredTime,
      selectedDay: formData.selectedDay,
      voucherId: voucherId
    });
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-24 py-16 pb-24 font-sans" id="book-trial-container">
      
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          /* FORM ENTRY STATE */
          <motion.div
            key="booking-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-3xl px-4"
            id="trial-lead-form-box"
          >
            {/* Header branding */}
            <div className="text-center space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-2 w-fit rounded-none" id="trial-offer-badge">
                <span className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse"></span>
                Birgunj, Nepal exclusive day pass
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
                Claim Complimentary Day Pass
              </h1>
              <p className="text-sm text-zinc-400 max-w-xl mx-auto font-semibold">
                Unlock 1 full day of unlimited structural equipment access, wet sauna suites, and introductory biomechanical analysis free of charge.
              </p>
            </div>

            {/* Error banner */}
            {errorText && (
              <div className="mb-6 p-4 rounded-none bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black text-center uppercase tracking-widest animate-shake">
                {errorText}
              </div>
            )}

            {/* Form card */}
            <div className="rounded-none border border-white/10 bg-[#151515] p-5 sm:p-8" id="trial-form-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-[#FF6600]" />
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Harsha Agrawal"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-none border border-white/10 bg-[#0D0D0D] p-3.5 text-xs font-semibold text-white outline-none focus:border-[#FF6600] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Smartphone className="h-3.5 w-3.5 text-[#FF6600]" />
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-none border border-white/10 bg-[#0D0D0D] p-3.5 text-xs font-semibold text-white outline-none focus:border-[#FF6600] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#FF6600]" />
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. cells@ironforge.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-none border border-white/10 bg-[#0D0D0D] p-3.5 text-xs font-semibold text-white outline-none focus:border-[#FF6600] transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Day Grid */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-display">
                    <Calendar className="h-3.5 w-3.5 text-[#FF6600]" />
                    Preferred Booking Day
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {days.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedDay: day })}
                        className={`rounded-none border p-3 text-center text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                          formData.selectedDay === day
                            ? 'border-[#FF6600] bg-[#FF6600]/10 text-white shadow-[0_0_15px_rgba(255,102,0,0.2)]'
                            : 'border-white/10 bg-[#0D0D0D] text-zinc-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goals Switcher */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-[#FF6600]" />
                    Primary Adaptation Goal
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {goals.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal: g.id })}
                        className={`rounded-none border p-3 text-left transition-all flex flex-col justify-between min-h-[76px] cursor-pointer ${
                          formData.goal === g.id
                            ? 'border-[#FF6600] bg-[#FF6600]/10 text-white shadow-[0_0_15px_rgba(255,102,0,0.2)]'
                            : 'border-white/10 bg-[#0D0D0D] text-zinc-455 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">{g.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time selector checkmark */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#FF6600]" />
                    Preferred Session Hour Entry
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map((ts) => (
                      <button
                        key={ts.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: ts.id })}
                        className={`w-full rounded-none border p-3.5 flex items-center justify-between text-left transition-all cursor-pointer ${
                          formData.preferredTime === ts.id
                            ? 'border-[#FF6600] bg-[#FF6600]/10 text-white'
                            : 'border-white/10 bg-[#0D0D0D] text-zinc-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider">{ts.label}</div>
                          <div className="text-[9px] text-zinc-500 font-semibold mt-0.5">{ts.desc}</div>
                        </div>
                        {formData.preferredTime === ts.id && (
                          <span className="rounded-none bg-[#FF6600] px-2 py-0.5 text-black text-[9px] font-black uppercase">Active</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Informational security safety warning */}
                <div className="rounded-none bg-[#0D0D0D] border border-white/10 p-4 flex gap-3 text-xs align-top">
                  <ShieldAlert className="h-5 w-5 text-[#FF6600] flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-500 leading-relaxed max-w-2xl text-[11px] font-semibold">
                    By submitting this reservation pass, you verify Birgunj, Nepal residency for active validation. Please carry a valid identification marker (Aadhaar or work ID card) on your scheduled walkthrough reception check-in.
                  </p>
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  className="w-full py-4 text-center text-xs font-black uppercase tracking-widest bg-[#FF6600] text-black shadow-2xl hover:bg-white hover:text-black transition-all cursor-pointer rounded-none"
                >
                  Generate Invitation pass
                </button>

              </form>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS STATE PANEL */
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-xl px-4 text-center"
            id="trial-success-panel"
          >
            <div className="space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase text-white tracking-tighter">
                  Reservation Confirmed!
                </h2>
                <p className="text-xs text-zinc-500 font-semibold">Your personalized guest session pass has been generated successfully.</p>
              </div>

              {/* Graphical pass ticker voucher layout */}
              <div className="relative rounded-none overflow-hidden bg-[#151515] border border-white/10 p-6 text-left space-y-4 shadow-2xl">
                
                {/* Visual line separators and semi-circles */}
                <div className="absolute top-24 -left-3 h-6 w-6 rounded-full bg-[#0D0D0D] border-r border-white/10" />
                <div className="absolute top-24 -right-3 h-6 w-6 rounded-full bg-[#0D0D0D] border-l border-white/10" />

                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF6600] font-bold uppercase tracking-widest">GUEST INVITATION PASS</span>
                    <h3 className="text-sm font-black text-white mt-1 uppercase">FITEX GYM DELUXE</h3>
                  </div>
                  <span className="text-xs font-black font-mono text-black bg-[#FF6600] border border-[#FF6600]/20 px-3 py-1.5">
                    {voucherId}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Invitee</span>
                      <span className="text-xs text-zinc-300 font-bold truncate block">{formData.name}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Slot Hour Target</span>
                      <span className="text-xs text-zinc-350 font-bold block">
                        {formData.preferredTime === 'evening_rush' ? 'Evening Peak' : formData.preferredTime === 'morning_mid' ? 'Mid-Morning' : 'Dawn Early'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Muscle Adaptation Track</span>
                      <span className="text-xs text-zinc-350 font-semibold block uppercase">{formData.goal.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Schedule target</span>
                      <span className="text-xs text-zinc-350 font-semibold block uppercase">{formData.selectedDay}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>SHOW TICKET CODE AT RECEPTION</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider font-mono">● Active Pass</span>
                </div>
              </div>

              {/* What steps to take next guidelines */}
              <div className="rounded-none border border-white/10 bg-[#151515] p-5 text-left space-y-3.5">
                <h4 className="text-xs font-black uppercase text-[#FF6600] tracking-widest">Direct Next Procedures</h4>
                <ul className="space-y-2.5 text-xs text-zinc-400 font-medium leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-[#FF6600] font-black mr-2 font-mono">01.</span>
                    <span>A confirmation verification copy of this voucher code has been dispatched to <span className="text-white font-semibold font-mono">{formData.phone}</span>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6600] font-black mr-2 font-mono">02.</span>
                    <span>An expert coach has been provisioned to orient your dynamic posture profile and squat biomechanics analysis of 15 minutes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6600] font-black mr-2 font-mono">03.</span>
                    <span>Please carry clean indoor athletic training shoes and fresh towel to guarantee elite hygiene protocols. wet lockers and showers are fully complimentary.</span>
                  </li>
                </ul>
              </div>

              {/* Bottom return CTA */}
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 text-xs font-black uppercase border border-white/10 text-white hover:bg-white/5 transition-all cursor-pointer rounded-none"
              >
                Return to Club Home
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

