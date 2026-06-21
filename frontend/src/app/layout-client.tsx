"use client";

import React from 'react';
import { GymProvider } from '../context/GymContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <GymProvider>
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col justify-between overflow-x-hidden font-sans" id="gym-app-root">
        {/* 1. Header Navigation elements */}
        <Navbar />

        {/* 2. Page viewport with elegant path-based animations */}
        <main className="flex-grow relative" id="gym-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 3. Footer credits */}
        <Footer />
      </div>
    </GymProvider>
  );
}
