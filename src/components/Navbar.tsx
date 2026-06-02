import React, { useState } from 'react';
import { PageType } from '../types';
import { Dumbbell, Menu, X, Landmark, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'membership', label: 'Memberships' },
    { id: 'programs', label: 'Programs & Classes' },
    { id: 'trainers', label: 'Our Coaches' },
    { id: 'transformations', label: 'Success Stories' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'tools', label: 'BMI & Nutrition' },
    { id: 'contact', label: 'Contact' }
  ] as const;

  const handleNavClick = (pageId: PageType) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    // Smooth scroll to top of page on change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex cursor-pointer items-center space-x-1.5 transition-opacity hover:opacity-90 animate-fadeIn"
          id="nav-logo"
        >
          <div className="w-10 h-10 bg-[#3B82F6] flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <div className="-rotate-45 font-black text-xl italic tracking-tighter text-white">IF</div>
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase ml-2 text-white">
            IRON<span className="text-[#3B82F6]">FORGE</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" id="nav-desktop-menu">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 outline-none ${
                  isActive ? 'text-[#3B82F6]' : 'text-white/70 hover:text-white'
                }`}
                id={`nav-item-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-lg bg-white/5 -z-10 border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3" id="nav-cta-container">
          <button
            onClick={() => handleNavClick('trial')}
            className="px-5 py-2 border border-[#F97316] text-[#F97316] text-xs font-bold uppercase tracking-widest hover:bg-[#F97316] hover:text-white transition-all duration-300 cursor-pointer"
            id="nav-trial-btn"
          >
            Free Trial
          </button>
          <button
            onClick={() => handleNavClick('membership')}
            className="px-5 py-2 bg-[#3B82F6] text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-[#2563EB] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 cursor-pointer"
            id="nav-join-btn"
          >
            Join Now
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden" id="nav-mobile-hamburger-container">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            aria-expanded={isOpen}
            id="nav-toggle-btn"
          >
            {isOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-white/10 bg-[#0D0D0D]"
            id="nav-mobile-menu"
          >
            <div className="space-y-1.5 px-4 pb-6 pt-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'border border-[#3B82F6]/20 bg-[#3B82F6]/10 text-[#3B82F6]'
                        : 'border border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                    id={`nav-mobile-item-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono opacity-40">→</span>
                  </button>
                );
              })}
              
              <div className="pt-4 flex flex-col gap-2.5" id="nav-mobile-cta-wrapper">
                <button
                  onClick={() => handleNavClick('trial')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#F97316] text-[#F97316] py-3.5 text-center text-xs font-bold uppercase tracking-widest hover:bg-[#F97316] hover:text-white active:scale-[0.98] transition-all"
                  id="nav-mobile-trial-btn"
                >
                  Book Free Trial
                </button>
                <button
                  onClick={() => handleNavClick('membership')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] text-white py-3.5 text-center text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.98] transition-all"
                  id="nav-mobile-join-btn"
                >
                  Join the Iron Core
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
