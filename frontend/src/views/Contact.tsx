"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Compass, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGym } from '../context/GymContext';

export default function Contact() {
  const { addContactSubmission, contactInfo } = useGym();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'membership_inquiry',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const topics = [
    { id: 'membership_inquiry', label: 'Membership Inquiry' },
    { id: 'personal_coaching', label: 'Elite Coaching Assignment' },
    { id: 'corporate_inquiry', label: 'Corporate Wellness Pass' },
    { id: 'support_billing', label: 'Billing & Frozen Status' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorText('Please fill out all contact blanks before transmitting.');
      return;
    }
    setErrorText(null);
    addContactSubmission({
      name: formData.name,
      email: formData.email,
      subject: formData.topic,
      message: formData.message
    });
    setFormSubmitted(true);
  };

  const handleWhatsAppAction = () => {
    // Standard direct wa.me link with encoded text
    const cleanPhone = contactInfo.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=Hi%20Fitex%20Gym%2C%20I'm%20interested%20in%20arranging%20a%20membership!`, "_blank");
  };

  return (
    <div className="space-y-24 py-16 pb-24 animate-fadeIn font-sans" id="contact-page-container">
      
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4" id="contact-header">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
          DIRECT CLIENT CONDUIT
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
          Get In Touch
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-semibold leading-relaxed">
          Whether you want to freeze your active membership, query corporate rates, or request coach assessments, we respond within 120 minutes.
        </p>
      </section>

      {/* COMPOSITE CONTACT GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="contact-grid-body">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info, Map and Actions (7-cols on large) */}
          <div className="lg:col-span-7 space-y-8" id="contact-directory-section">
            
            {/* Quick Action Buttons (Call / WhatsApp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="quick-links-panel">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-3 rounded-none bg-[#151515] hover:bg-[#FF6600]/10 border border-white/10 hover:border-[#FF6600]/20 px-6 py-4.5 text-xs font-black uppercase tracking-widest text-white transition-all cursor-pointer"
              >
                <Phone className="h-4.5 w-4.5 text-[#FF6600]" />
                Call Front Desk Now
              </a>

              <button
                onClick={handleWhatsAppAction}
                className="flex items-center justify-center gap-3 rounded-none bg-[#151515] hover:bg-[#25D366]/10 border border-white/10 hover:border-[#25D366]/20 px-6 py-4.5 text-xs font-black uppercase tracking-widest text-white transition-all cursor-pointer"
              >
                {/* Custom green WhatsApp message ball */}
                <span className="text-[10px] font-black font-mono text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2 py-0.5 rounded-none">
                  WA
                </span>
                Chat on WhatsApp
              </button>
            </div>

            {/* Dynamic Location Map */}
            <div className="rounded-none border border-white/10 bg-[#151515] overflow-hidden p-3.5 space-y-4" id="simulated-vector-map-card">
              <div className="flex items-center justify-between px-2 pt-1.5">
                <div className="flex items-center space-x-2 text-xs">
                  <Compass className="h-4 w-4 text-[#F97316]" />
                  <span className="font-bold text-white uppercase tracking-wider text-[11px] truncate max-w-xs sm:max-w-md">{contactInfo.address}</span>
                </div>
                <span className="rounded-none bg-[#0D0D0D] text-zinc-500 font-mono text-[9px] px-2 py-0.5 border border-white/10 uppercase">
                  WGS-84 coordinate system
                </span>
              </div>

              {/* Graphic container block */}
              <div className="relative h-64 rounded-none overflow-hidden bg-[#0D0D0D] border border-white/10">
                {contactInfo.mapEmbedUrl ? (
                  <iframe
                    src={contactInfo.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.85) invert(0.92) contrast(1.1)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Fitex Gym Location Map"
                  />
                ) : (
                  /* Mock vector map styled using CSS and custom visual grids */
                  <div className="absolute inset-0 bg-[#0B0B0B] opacity-95">
                    {/* Grid lines */}
                    <div className="absolute inset-0 divide-x divide-white/5 flex justify-between px-6" />
                    <div className="absolute inset-0 divide-y divide-white/5 flex flex-col justify-between py-6" />
                    
                    {/* Styled roads lines */}
                    <div className="absolute top-1/2 left-0 right-0 h-10 bg-[#151515] border-y border-white/5 transform -translate-y-1/2" />
                    <div className="absolute left-1/3 top-0 bottom-0 w-8 bg-[#151515] border-x border-white/5" />
                    
                    {/* Map label */}
                    <div className="absolute left-[38%] top-[55%] text-[10px] font-mono text-zinc-750 tracking-widest uppercase origin-bottom -rotate-12">
                      Golf Course Road Expressway
                    </div>

                    {/* Active Pinpoint */}
                    <div className="absolute top-[42%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-none bg-[#FF6600]/10 border border-[#FF6600]/30 text-white font-black z-10 hover:scale-105 transition-transform duration-300">
                        <MapPin className="h-5 w-5 text-[#FF6600] animate-bounce" />
                        <span className="absolute inset-0 rounded-none bg-[#FF6600]/30 animate-ping -z-10" />
                      </div>
                      <div className="mt-1 bg-[#0D0D0D] border border-white/10 py-1 px-2.5 text-[9px] text-[#FF6600] font-black uppercase tracking-widest shadow-2xl">
                        FITEX GYM REGISTRY
                      </div>
                    </div>

                    {/* Directions metadata overlay box */}
                    <div className="absolute bottom-3 right-3 bg-black/80 rounded-none p-2.5 text-[10px] font-mono max-w-[160px] border border-white/10">
                      <span className="text-emerald-400 font-bold block">→ METRO LINK</span>
                      <span className="text-zinc-400 block mt-0.5">200m from Sector 42 Metro interchange Station</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="px-2 text-[10px] text-zinc-500 font-mono text-center">
                Interactive cartography. Safe vehicle parking and premium valet stands fully available.
              </p>
            </div>

            {/* Direct Coordinates Metadata Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-none border border-white/10 bg-[#151515]/50 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">General help desk</span>
                <a href={`tel:${contactInfo.phone}`} className="text-xs text-white font-semibold font-mono hover:underline block">{contactInfo.phone}</a>
              </div>
              <div className="p-4 rounded-none border border-white/10 bg-[#151515]/50 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Operations email</span>
                <a href={`mailto:${contactInfo.email}`} className="text-xs text-white font-semibold font-mono hover:underline block">{contactInfo.email}</a>
              </div>
            </div>

          </div>          {/* Right Column: Contact Inquiry Form (5-cols on large) */}
          <div className="lg:col-span-5" id="contact-transmission-form">
            <div className="relative rounded-none border border-white/10 bg-[#151515] p-5 sm:p-8" id="contact-form-card">
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="original-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#FF6600]/10 text-[#FF6600] border border-[#FF6600]/20">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Transmitter Terminal</h4>
                        <p className="text-[10px] text-zinc-500">Transfers directly to our floor manager desks.</p>
                      </div>
                    </div>

                    {/* Error Banner */}
                    {errorText && (
                      <div className="p-3 text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-450 font-bold uppercase tracking-wider text-center">
                        {errorText}
                      </div>
                    )}

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Your Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Harsha Agrawal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-none border border-white/10 bg-[#0D0D0D] p-3.5 text-xs font-semibold text-white outline-none focus:border-[#FF6600] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="e.g. cells@ironforge.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-none border border-white/10 bg-[#0D0D0D] p-3.5 text-xs font-semibold text-white outline-none focus:border-[#FF6600] transition-colors"
                      />
                    </div>

                    {/* Topic choose */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-440">Query Topic category</label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full rounded-none border border-white/10 bg-[#0D0D0D] p-3.5 text-xs font-bold text-white outline-none focus:border-[#FF6600] transition-all font-sans"
                      >
                        {topics.map((t) => (
                          <option key={t.id} value={t.id} className="bg-[#151515] text-white font-semibold">{t.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Your Explanation Message</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe your queries or account requests in brief details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-none border border-white/10 bg-[#0D0D0D] p-3.5 text-xs font-semibold text-white outline-none focus:border-[#FF6600] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit action */}
                    <button
                      type="submit"
                      className="w-full py-3.5 text-xs font-black uppercase tracking-widest bg-white text-black hover:bg-[#FF6600] hover:text-white transition-all cursor-pointer rounded-none"
                    >
                      Transmit Message
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-black uppercase text-white tracking-widest animate-pulse">Transmission complete!</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                        Hi <span className="text-white font-bold">{formData.name}</span>, your message under category <span className="text-[#FF6600] font-bold font-mono">{formData.topic.replace('_', ' ').toUpperCase()}</span> was transferred. A manager will email you directly inside 120 minutes.
                      </p>
                    </div>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 rounded-none bg-[#0D0D0D] border border-white/10 text-zinc-400 hover:text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Send another query
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
