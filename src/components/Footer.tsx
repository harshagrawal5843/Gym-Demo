import React from 'react';
import { PageType } from '../types';
import { Dumbbell, Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Star, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: PageType) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-800 bg-[#070707] pt-16 pb-8 text-zinc-400" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Motivation */}
          <div className="space-y-5" id="footer-brand-col">
            <div className="flex cursor-pointer items-center space-x-2.5" onClick={() => handleLinkClick('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <Dumbbell className="h-5.5 w-5.5 text-white rotate-45" />
              </div>
              <span className="text-lg font-black uppercase tracking-wider text-white">
                IRON<span className="text-[#FF6600]">FORGE</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Forging elite physical forms and unbreakable mental structures in the heart of Delhi NCR. Our legacy is built on science, premium Eleiko equipment, and top tier coaches.
            </p>
            <div className="flex space-x-4" id="footer-social-wrapper">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FF6600] hover:border-[#FF6600]/40 transition-all">
                <span className="text-xs font-bold font-mono">IG</span>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#FF6600] hover:border-[#FF6600]/40 transition-all">
                <span className="text-xs font-bold font-mono">YT</span>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#00D2FF] hover:border-[#00D2FF]/40 transition-all">
                <span className="text-xs font-bold font-mono">FB</span>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#00D2FF] hover:border-[#00D2FF]/40 transition-all">
                <span className="text-xs font-bold font-mono">IN</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4" id="footer-links-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-orange-500 pl-3">Explore Club</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-white transition-colors text-left py-1 pr-2">Home</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('membership')} className="hover:text-white transition-colors text-left py-1 pr-2">Plans</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('programs')} className="hover:text-white transition-colors text-left py-1 pr-2">Programs</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('trainers')} className="hover:text-white transition-colors text-left py-1 pr-2">Coaches</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('transformations')} className="hover:text-white transition-colors text-left py-1 pr-2">Success</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('gallery')} className="hover:text-white transition-colors text-left py-1 pr-2">Gallery</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-white transition-colors text-left py-1 pr-2">Contact</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('trial')} className="text-[#FF6600] font-bold hover:underline py-1 pr-2 text-left">Free Trial</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Operations */}
          <div className="space-y-4" id="footer-hours-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-orange-500 pl-3">Operating Hours</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-zinc-300">Monday - Friday</div>
                  <div className="text-zinc-500 font-mono text-xs mt-0.5">05:00 AM - 11:00 PM</div>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-zinc-300">Saturday</div>
                  <div className="text-zinc-500 font-mono text-xs mt-0.5">06:00 AM - 09:00 PM</div>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-zinc-300">Sunday & Holidays</div>
                  <div className="text-zinc-500 font-mono text-xs mt-0.5">07:00 AM - 05:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Location Info */}
          <div className="space-y-4" id="footer-location-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-l-2 border-orange-500 pl-3">Contact HQ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="mt-0.5 h-5 w-5 text-[#00D2FF] flex-shrink-0" />
                <span className="text-zinc-300">
                  Plot 15, Sector 43, Golf Course Road, Gurugram, Delhi NCR - 122002
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-[#00D2FF]" />
                <a href="tel:+919876543210" className="text-zinc-300 font-mono hover:text-white">+91 98765 43210</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-[#00D2FF]" />
                <a href="mailto:membership@ironforge.com" className="text-zinc-300 font-mono hover:text-white">membership@ironforge.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Badging and Copy */}
        <div className="mt-12 border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" id="footer-copyright-and-badges">
          <div className="flex flex-wrap items-center gap-4 text-zinc-500">
            <p>© {currentYear} Iron Forge Fitness Club. All Rights Reserved.</p>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-zinc-600" />
              <span>Certified Safe Space & Dynamic Training Center</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-zinc-600 font-medium">
            <span>Built by Iron Forge Digital Core</span>
            <Sparkles className="h-3 w-3 text-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
