"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGym } from '../context/GymContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useGym();
  const pathname = usePathname();

  const navItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'membership', path: '/membership', label: 'Plans' },
    { id: 'programs', path: '/programs', label: 'Programs' },
    { id: 'trainers', path: '/trainers', label: 'Coaches' },
    { id: 'transformations', path: '/transformations', label: 'Stories' },
    { id: 'gallery', path: '/gallery', label: 'Gallery' },
    { id: 'tools', path: '/tools', label: 'BMI & Diet' },
    { id: 'contact', path: '/contact', label: 'Contact' }
  ] as const;

  // Role Security Filtering: If logged in, hide consumer sign-up routes to keep staff view clean
  const filteredNavItems = navItems.filter((item) => {
    if (currentUser) {
      // Gym Owners/Devs do not need public trial passes, contact forms, or plans
      return item.id !== 'contact' && item.id !== 'membership' && item.id !== 'tools';
    }
    return true;
  });

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/"
          onClick={handleLinkClick}
          className="flex cursor-pointer items-center space-x-1.5 transition-opacity hover:opacity-90 animate-fadeIn"
          id="nav-logo"
        >
          <img src="/logo.png" alt="Fitex Gym Logo" className="w-10 h-10 object-contain rounded" />
          <span className="text-xl font-black tracking-tighter uppercase ml-2 text-white">
            FIT<span className="text-[#FF6600]">EX</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5" id="nav-desktop-menu">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`relative px-2 xl:px-3 py-2 text-[10px] xl:text-[11px] font-bold tracking-[0.1em] xl:tracking-[0.18em] uppercase transition-colors duration-200 outline-none ${
                  isActive ? 'text-[#FF6600]' : 'text-white/70 hover:text-white'
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
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3" id="nav-cta-container">
          <Link
            href={currentUser ? '/dashboard' : '/login'}
            className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              currentUser
                ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                : 'border-white/10 text-white/70 hover:border-white hover:text-white'
            }`}
            id="nav-login-btn"
          >
            {currentUser ? 'Dashboard' : 'Staff Login'}
          </Link>
          
          {/* Hide public CTA buttons for logged in staff */}
          {!currentUser && (
            <>
              <Link
                href="/trial"
                className="px-4 py-2 border border-[#F97316] text-[#F97316] text-xs font-bold uppercase tracking-widest hover:bg-[#F97316] hover:text-white transition-all duration-300 cursor-pointer"
                id="nav-trial-btn"
              >
                Free Pass
              </Link>
            </>
          )}
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
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={handleLinkClick}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'border border-[#FF6600]/20 bg-[#FF6600]/10 text-[#FF6600]'
                        : 'border border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                    id={`nav-mobile-item-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono opacity-40">→</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 flex flex-col gap-2.5" id="nav-mobile-cta-wrapper">
                <Link
                  href={currentUser ? '/dashboard' : '/login'}
                  onClick={handleLinkClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 text-white/70 py-3.5 text-center text-xs font-bold uppercase tracking-widest hover:border-white hover:text-white active:scale-[0.98] transition-all"
                  id="nav-mobile-login-btn"
                >
                  {currentUser ? 'Go to Dashboard' : 'Staff Login'}
                </Link>
                
                {!currentUser && (
                  <>
                    <Link
                      href="/trial"
                      onClick={handleLinkClick}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#F97316] text-[#F97316] py-3.5 text-center text-xs font-bold uppercase tracking-widest hover:bg-[#F97316] hover:text-white active:scale-[0.98] transition-all"
                      id="nav-mobile-trial-btn"
                    >
                      Book Free Trial
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
