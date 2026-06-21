"use client";

import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { statsData, facilitiesData } from '../data';
import { Dumbbell, Shield, Award, Calendar, ChevronRight, Activity, Zap, Flame, UserCheck, HeartHandshake, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const [activeFacility, setActiveFacility] = useState(facilitiesData[0].id);
  const [heroBgIndex, setHeroBgIndex] = useState(0);

  const heroBgs = [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop', // heavy weights
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600&auto=format&fit=crop', // high-end gym view
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop', // powerlifting barbell
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroBgIndex((prev) => (prev + 1) % heroBgs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const selectedFacility = facilitiesData.find(f => f.id === activeFacility) || facilitiesData[0];

  return (
    <div className="space-y-24 pb-24" id="home-page-container">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black py-20" id="home-hero">
        {/* Background slider with fade cross effects */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroBgIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroBgs[heroBgIndex]})` }}
            />
          </AnimatePresence>
          {/* Subtle overlay gradients for heavy theatrical contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 w-full text-center sm:px-6 lg:px-8 lg:text-left" id="hero-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-[10px] font-bold uppercase tracking-widest mb-6 w-fit rounded-none"
                id="hero-badge"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse"></span>
                Birgunj, Nepal’s Ultimate Luxury Fitness Citadel
              </div>

              <h1 className="text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl leading-[0.95]" id="hero-title">
                BUILD STRENGTH.<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white', fontFamily: 'var(--font-display)' }}>
                  TRANSFORM
                </span> YOUR LIFE.
              </h1>

              <p className="max-w-2xl text-base text-zinc-300 md:text-lg leading-relaxed font-semibold" id="hero-subtitle">
                Professional coaching, world-class certified Olympic strength equipment, and an elite high-energy community engineered for undeniable physical outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4" id="hero-ctas">
                <button
                  onClick={() => {
                    setCurrentPage('membership');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-[#FF6600] text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:bg-[#cc5200] hover:shadow-[0_0_25px_rgba(255,102,0,0.5)] transition-all cursor-pointer"
                  id="hero-join-cta"
                >
                  Join the Iron Core
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('trial');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 border border-[#F97316] text-[#F97316] text-xs font-bold uppercase tracking-widest hover:bg-[#F97316] hover:text-white transition-all cursor-pointer"
                  id="hero-trial-cta"
                >
                  Book Free Trial
                </button>
              </div>
            </div>

            {/* Glowing Teaser Membership Card */}
            <div className="hidden lg:col-span-4 lg:flex justify-end" id="hero-card-supplement">
              <div className="bg-[#151515] border border-white/10 p-6 w-80 shadow-2xl backdrop-blur-xl relative">
                <div className="absolute -top-3.5 -right-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6600] text-white font-black rotate-12 shadow-[0_0_15px_rgba(255,102,0,0.5)] text-sm font-mono">
                  100%
                </div>
                <div className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-1">PROMOTION OFFER</div>
                <div className="text-2xl font-black mb-1 text-white">ELITE MEMBERSHIP</div>
                <div className="text-3xl font-black text-white flex items-start gap-1 mb-4 font-mono">
                  <span className="text-sm mt-1 text-[#FF6600]">₹</span>3,999<span className="text-sm text-zinc-500 font-normal lowercase">/mo</span>
                </div>
                
                <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                  Join Birgunj's athletic sanctuary with zero admission fees this week. Free customized bio-impedance composition tracking included.
                </p>

                <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
                  <li className="text-[10px] text-zinc-350 flex items-center gap-2 uppercase tracking-wide">
                    <span className="text-[#FF6600] font-bold">•</span> 24/7 Floor Access
                  </li>
                  <li className="text-[10px] text-zinc-350 flex items-center gap-2 uppercase tracking-wide">
                    <span className="text-[#FF6600] font-bold">•</span> 2 Sessions with Personal Trainer
                  </li>
                  <li className="text-[10px] text-zinc-350 flex items-center gap-2 uppercase tracking-wide">
                    <span className="text-[#FF6600] font-bold">•</span> Custom Macro Blueprint
                  </li>
                </ul>

                <button 
                  onClick={() => {
                    setCurrentPage('membership');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6600] hover:text-white transition-all cursor-pointer"
                  id="hero-teaser-btn"
                >
                  Secure My Spot
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC REVEAL STATISTICS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-stats">
        <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-y-0 divide-x-0 md:divide-x divide-zinc-800" id="stats-grid">
            {statsData.map((stat, idx) => (
              <div key={stat.id} className={`text-center ${idx > 0 ? 'md:pl-6' : ''}`} id={`stat-box-${stat.id}`}>
                <div className="text-3xl sm:text-5xl font-black text-white font-mono flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                    {stat.value}
                  </span>
                  <span className="text-orange-500 text-2xl sm:text-4xl ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-500 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="home-why-choose-us">
        <div className="text-center max-w-3xl mx-auto space-y-3" id="why-header">
          <span className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            THE FITEX GYM BENCHMARK
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Where Science Meets Intensity
          </h2>
          <p className="text-sm text-zinc-400">
            We reject standard cookie-cutter commercial methodologies. Our facility is engineered for members who take their health, power, and posture seriously.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5" id="why-cards">
          {/* Pitch 1 */}
          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 space-y-4 hover:border-zinc-700 transition-all duration-300">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600/10 text-[#FF6600]">
              <UserCheck className="h-5.5 w-5.5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Elite Coaches</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Our coaching staff hold CSCS credentials, kinesiology degrees, and active competition certificates. No online course trainers.
            </p>
          </div>

          {/* Pitch 2 */}
          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 space-y-4 hover:border-zinc-700 transition-all duration-300">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D2FF]/10 text-[#00D2FF]">
              <Dumbbell className="h-5.5 w-5.5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Bespoke Iron</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Official Eleiko barbells, heavy Hammer Strength mechanics, custom premium free weight selection up to 80kg dumbbells.
            </p>
          </div>

          {/* Pitch 3 */}
          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 space-y-4 hover:border-zinc-700 transition-all duration-300">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Zap className="h-5.5 w-5.5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Diet Blueprints</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Detailed calorie, protein and macronutrient analysis guided by our in-house nutritionists. Customized for your lifestyle.
            </p>
          </div>

          {/* Pitch 4 */}
          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 space-y-4 hover:border-zinc-700 transition-all duration-300">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <HeartHandshake className="h-5.5 w-5.5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Flexible Tiers</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Absolutely straightforward monthly, quarterly and annual memberships. No hidden transfer or initial startup fees.
            </p>
          </div>

          {/* Pitch 5 */}
          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 space-y-4 hover:border-zinc-700 transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
              <Compass className="h-5.5 w-5.5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Personalized Focus</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              A comprehensive initial walkthrough assessment that ensures you lift within joint-healthy patterns from day one.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FACILITIES SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="home-facilities">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4" id="facilities-header">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
              PREMIUM ARCHITECTURE
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              Tour the Sanctuary Zones
            </h2>
            <p className="max-w-2xl text-sm text-zinc-400">
              Browse through our dedicated zones curated specifically to maximize recovery, metabolic rate, and explosive output.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 bg-[#0D0D0D] px-3.5 py-1.5 rounded-lg border border-white/10">
            <Activity className="h-4 w-4 text-[#FF6600] animate-pulse" />
            <span>Select zone tabs to inspect parameters</span>
          </div>
        </div>

        {/* Dynamic Interactive Show area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="facilities-interactive-panel">
          
          {/* Tabs Selector list column (5-cols on large screen) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 justify-center" id="facilities-tabs-list">
            {facilitiesData.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFacility(f.id)}
                className={`group flex items-center justify-between rounded-xl px-5 py-4 text-left transition-all ${
                  activeFacility === f.id
                    ? 'bg-[#FF6600]/10 border-l-4 border-[#FF6600] text-white'
                    : 'border-l-4 border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
                id={`facility-tab-${f.id}`}
              >
                <div>
                  <div className="font-bold uppercase tracking-wider text-xs sm:text-sm">{f.title}</div>
                  <div className="text-[10px] font-mono opacity-50 mt-1">{f.metrics.split('|')[0]}</div>
                </div>
                <ChevronRight className={`h-4 w-4 text-[#FF6600] transition-transform ${activeFacility === f.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>

          {/* Active Facility Presentation card column (8-cols on large screen) */}
          <div className="lg:col-span-8" id="facilities-details-display">
            <div className="relative h-full min-h-[350px] sm:min-h-[450px] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] flex flex-col justify-end">
              
              {/* Feature Unsplash Image background */}
              <div className="absolute inset-0 z-0">
                <img
                  src={selectedFacility.imageUrl}
                  alt={selectedFacility.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover opacity-60 transition-all duration-700 hover:scale-105"
                  id={`facility-image-${selectedFacility.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
              </div>

              {/* Text content details card */}
              <div className="relative z-10 p-6 sm:p-10 space-y-4">
                <span className="rounded-none bg-[#F97316]/10 border border-[#F97316]/20 px-2.5 py-1 text-[10px] font-black uppercase text-[#F97316] font-mono">
                  {selectedFacility.metrics}
                </span>

                <h3 className="text-2xl font-black uppercase text-white sm:text-3.5xl">
                  {selectedFacility.title}
                </h3>

                <p className="max-w-2xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {selectedFacility.description}
                </p>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => {
                      setCurrentPage('trial');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 text-xs font-black uppercase bg-white text-black hover:bg-[#FF6600] hover:text-white transition-all cursor-pointer"
                  >
                    Tour In Person
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('membership');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 text-xs font-black uppercase border border-white/10 text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    View Packages
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. QUICK MOTIVATION PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-motivational-banner">
        <div className="relative rounded-2xl overflow-hidden bg-[#151515] border border-white/10 p-8 sm:p-14 text-center space-y-6">
          <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0D0D0D]/90 to-black z-0" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="text-[10px] font-black tracking-[0.25em] text-[#FF6600] uppercase">STRETCH YOUR POTENTIAL</span>
            <h3 className="text-xl sm:text-3xl font-black uppercase text-white leading-tight">
              An Elite Environment Dictates Absolute Performance
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Step onto Birgunj's premium flooring. Meet coaches with continuous records of producing verifiable athletic milestones. First session is absolutely free of charge.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('trial');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 text-xs font-black uppercase bg-[#FF6600] text-white shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:bg-[#cc5200] hover:shadow-[0_0_25px_rgba(255,102,0,0.5)] transition-all cursor-pointer"
              >
                Claim Free Trial Pass
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

