"use client";

import React, { useState } from 'react';
import BMICalculator from '../components/BMICalculator';
import NutritionSection from '../components/NutritionSection';
import { Calculator, Apple, Flame, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Tools() {
  const [activeTab, setActiveTab] = useState<'bmi' | 'nutrition'>('bmi');

  return (
    <div className="space-y-16 py-16 pb-24" id="tools-page">
      
      {/* Header section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4" id="tools-header">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
          BIOLOGICALLY CALIBRATED SYSTEMS
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
          Fitness & Macros Coach Labs
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-semibold">
          Unlock the exact mathematical estimates relevant to your physical framework. Calculate body mass index scores first, then customize protein targets instantly.
        </p>

        {/* Toggles */}
        <div className="flex justify-center pt-4" id="tools-tabs-wrapper">
          <div className="flex rounded-xl bg-zinc-950 p-1 border border-zinc-900">
            <button
              onClick={() => setActiveTab('bmi')}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 text-xs font-black uppercase tracking-widest transition-colors ${
                activeTab === 'bmi'
                  ? 'bg-zinc-800 text-white shadow-xl'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Calculator className="h-4 w-4" />
              BMI Biomarker Tracker
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 text-xs font-black uppercase tracking-widest transition-colors ${
                activeTab === 'nutrition'
                  ? 'bg-zinc-805 text-white bg-zinc-800 shadow-xl'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Apple className="h-4 w-4" />
              Protein Macros Planner
            </button>
          </div>
        </div>
      </section>

      {/* Pages content block */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="tools-active-display">
        {activeTab === 'bmi' ? (
          <div className="space-y-10 animate-fadeIn">
            {/* Direct advice notice before calculator */}
            <div className="rounded-2xl border border-zinc-850/60 bg-gradient-to-r from-[#121212] to-zinc-950 p-6 flex flex-col sm:flex-row items-center gap-5 justify-between">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-sm font-bold uppercase text-white tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
                  Step 1: Discover Your Standard Index Bounds
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">
                  Adjust weight & height sliders. Our system determines if you correspond to Underweight, Optimal, or high density muscular indices, and selects compound lifts directly.
                </p>
              </div>
              <span className="text-[10px] text-zinc-500 hover:text-zinc-400 font-mono hidden md:inline">
                ESTIMATIONS BASED ON WHO SYSTEMS
              </span>
            </div>

            <BMICalculator />
          </div>
        ) : (
          <div className="space-y-10 animate-fadeIn text-left">
            {/* Direct advice notice before calculator */}
            <div className="rounded-2xl border border-zinc-850/60 bg-gradient-to-r from-[#121212] to-zinc-950 p-6 flex flex-col sm:flex-row items-center gap-5 justify-between">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-sm font-bold uppercase text-white tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                  <Heart className="h-4 w-4 text-[#00D2FF]" />
                  Step 2: Customize Visceral & Muscle Intake Target
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">
                  Select clean bulks or metabolic shredding goals. Obtain protein, carbohydrate, and dietary fat totals calculated from healthy target averages.
                </p>
              </div>
              <span className="text-[10px] text-zinc-500 hover:text-zinc-400 font-mono hidden md:inline">
                RECONSTRUCTION ADVICE BY CO-COACHES
              </span>
            </div>

            <NutritionSection />
          </div>
        )}
      </section>

    </div>
  );
}
