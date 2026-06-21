"use client";

import React from 'react';
import { Dumbbell, Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useGym } from '../context/GymContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentUser, contactInfo } = useGym();

  const handleLinkClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-zinc-800 bg-[#070707] pt-16 pb-8 text-zinc-400" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Motivation */}
          <div className="space-y-5" id="footer-brand-col">
            <Link href="/" className="flex cursor-pointer items-center space-x-2.5" onClick={handleLinkClick}>
              <img src="/logo.png" alt="Fitex Gym Logo" className="w-10 h-10 object-contain rounded" />
              <span className="text-lg font-black uppercase tracking-wider text-white">
                FIT<span className="text-[#FF6600]">EX</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Forging elite physical forms and unbreakable mental structures in the heart of Birgunj, Nepal. Our legacy is built on science, premium Eleiko equipment, and top tier coaches.
            </p>
            <div className="flex space-x-4" id="footer-social-wrapper">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FF6600] hover:border-[#FF6600]/40 transition-all">
                <span className="text-xs font-bold font-mono">IG</span>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FF6600] hover:border-[#FF6600]/40 transition-all">
                <span className="text-xs font-bold font-mono">YT</span>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FF6600] hover:border-[#FF6600]/40 transition-all">
                <span className="text-xs font-bold font-mono">FB</span>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FF6600] hover:border-[#FF6600]/40 transition-all">
                <span className="text-xs font-bold font-mono">IN</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4" id="footer-links-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-orange-500 pl-3">Explore Club</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              <li>
                <Link href="/" onClick={handleLinkClick} className="hover:text-white transition-colors text-left py-1 pr-2 block">Home</Link>
              </li>
              
              {/* Hide client pages for logged in staff */}
              {!currentUser ? (
                <>
                  <li>
                    <Link href="/membership" onClick={handleLinkClick} className="hover:text-white transition-colors text-left py-1 pr-2 block">Plans</Link>
                  </li>
                  <li>
                    <Link href="/programs" onClick={handleLinkClick} className="hover:text-white transition-colors text-left py-1 pr-2 block">Programs</Link>
                  </li>
                  <li>
                    <Link href="/trainers" onClick={handleLinkClick} className="hover:text-white transition-colors text-left py-1 pr-2 block">Coaches</Link>
                  </li>
                  <li>
                    <Link href="/transformations" onClick={handleLinkClick} className="hover:text-white transition-colors text-left py-1 pr-2 block">Success</Link>
                  </li>
                  <li>
                    <Link href="/gallery" onClick={handleLinkClick} className="hover:text-white transition-colors text-left py-1 pr-2 block">Gallery</Link>
                  </li>
                  <li>
                    <Link href="/contact" onClick={handleLinkClick} className="hover:text-white transition-colors text-left py-1 pr-2 block">Contact</Link>
                  </li>
                  <li>
                    <Link href="/trial" onClick={handleLinkClick} className="text-[#FF6600] font-bold hover:underline py-1 pr-2 text-left block">Free Trial</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/dashboard" onClick={handleLinkClick} className="text-emerald-400 font-bold hover:underline py-1 pr-2 text-left block">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Hours & Operations */}
          <div className="space-y-4" id="footer-hours-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-orange-500 pl-3">Operating Hours</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-zinc-300">Sunday - Friday</div>
                  <div className="text-zinc-500 font-mono text-xs mt-0.5">
                    Morning: 05:00 AM - 10:00 AM<br />
                    Evening: 03:30 PM - 10:00 PM
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-rose-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-zinc-500">Saturday</div>
                  <div className="text-zinc-600 font-mono text-xs mt-0.5 uppercase font-bold tracking-wider">Closed / Rest Day</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Location Info */}
          <div className="space-y-4" id="footer-location-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-orange-500 pl-3">Iron Deck Registry</h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="leading-relaxed text-zinc-300">
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="font-mono text-zinc-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-zinc-300">{contactInfo.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Badging and Copy */}
        <div className="mt-12 border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" id="footer-copyright-and-badges">
          <div className="flex flex-wrap items-center gap-4 text-zinc-500">
            <p>© {currentYear} Fitex Gym Club. All Rights Reserved.</p>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-zinc-600" />
              <span>Certified Safe Space & Dynamic Training Center</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-zinc-600 font-medium">
            <span>Built by Fitex Digital Core</span>
            <Sparkles className="h-3 w-3 text-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
