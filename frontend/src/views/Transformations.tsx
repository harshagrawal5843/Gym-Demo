"use client";

import React, { useState } from 'react';
import { PageType } from '../types';
import { transformationsData } from '../data';
import { Sparkles, Trophy, Play } from 'lucide-react';

interface TransformationsProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Transformations({ setCurrentPage }: TransformationsProps) {
  // Slider states for custom Before / After interactive sliders
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [showAfterState, setShowAfterState] = useState<boolean>(true); // Click to toggle perspective
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'fat_loss' | 'muscle_gain'>('all');

  const stats = [
    { label: 'Visceral Weight Lost', value: '8,450 kg', desc: 'Over Birgunj active registers' },
    { label: 'Complete Transformations', value: '1,200+', desc: 'Scientifically validated' },
    { label: 'Mastery Success Rate', value: '98.7%', desc: 'Adhering to diet blueprints' }
  ];

  // Specific selected story
  const selectedStory = transformationsData[activeStoryIdx];

  const filteredStories = transformationsData.filter(item => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'fat_loss') return item.id !== '3'; // Rohit & Ananya are fat loss / tone
    if (categoryFilter === 'muscle_gain') return item.id === '3'; // Vikram is lean bulk / powerlifting
    return true;
  });

  return (
    <div className="space-y-24 py-16 pb-24 font-sans text-white border-none" id="transformations-page">
      
      {/* HEADER SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4" id="transformations-header">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
          VERIFIABLE EMPIRICAL OUTCOMES
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
          Real People. Undeniable Results.
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-semibold text-center leading-relaxed">
          We do not trade on fake marketing claims or soft light photography. These are actual Fitex Gym members who executed their customized training & macros blueprints.
        </p>
      </section>

      {/* 1. DYNAMIC STATS COUNTERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="transformations-stats-grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="rounded-none border border-white/10 bg-[#151515] p-6 sm:p-8 space-y-2 hover:border-white/20 transition-all">
              <div className="text-3xl sm:text-4xl font-mono font-black text-white flex items-center justify-center">
                <span className="text-[#FF6600]">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-xs font-black uppercase text-zinc-300 tracking-wider font-sans">{stat.label}</h3>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. DEDICATED INTERACTIVE BEFORE / AFTER SLIDER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="transformations-interactive-showcase">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-none bg-[#FF6600]/10 px-3.5 py-1 text-[10px] font-black uppercase text-[#FF6600] border border-[#FF6600]/20">
            <Trophy className="h-3 w-3" />
            Interactive Visual Slider
          </div>
          <h2 className="text-2xl font-black uppercase text-white sm:text-3.5xl">
            Spotlight: {selectedStory.name}
          </h2>
          <p className="text-xs text-zinc-450 font-semibold">
            Toggle the Before / After state buttons below to analyze professional postural and composition adjustments.
          </p>
        </div>

        {/* The interactive slider structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="featured-transformation-card">
          
          {/* Member details column */}
          <div className="lg:col-span-5 space-y-6 bg-[#151515] p-6 sm:p-8 rounded-none border border-white/10 flex flex-col justify-between" id="transformation-metadata">
            <div>
              <div className="flex gap-4 border-b border-white/5 pb-4">
                <div className="bg-[#FF6600]/15 rounded-none h-11 w-11 flex items-center justify-center text-[#FF6600] border border-[#FF6600]/25 flex-shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-md font-black text-white uppercase tracking-wider">{selectedStory.name}</h3>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                    Age: {selectedStory.age} | Duration: {selectedStory.duration}
                  </div>
                </div>
              </div>

              {/* Weights markers comparison */}
              <div className="grid grid-cols-3 gap-3 pt-6">
                <div className="bg-[#0D0D0D] p-3 rounded-none border border-white/5 text-center">
                  <div className="text-[8px] text-zinc-500 uppercase tracking-widest font-black">Before Weight</div>
                  <div className="text-md text-[#FF6600] font-black font-mono mt-1">{selectedStory.beforeWeight}</div>
                </div>
                <div className="bg-[#0D0D0D] p-3 rounded-none border border-white/5 text-center">
                  <div className="text-[8px] text-zinc-500 uppercase tracking-widest font-black">After Weight</div>
                  <div className="text-md text-emerald-400 font-black font-mono mt-1">{selectedStory.afterWeight}</div>
                </div>
                <div className="bg-emerald-500/10 p-3 rounded-none border border-emerald-500/20 text-center">
                  <div className="text-[8px] text-emerald-400 uppercase tracking-widest font-black">Net Change</div>
                  <div className="text-md text-white font-black font-mono mt-1">
                    -{Math.abs(parseInt(selectedStory.beforeWeight) - parseInt(selectedStory.afterWeight))} kg
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-6">
                <div className="text-[9px] uppercase tracking-widest text-[#FF6600] font-black">Member Testimonial Story</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                  "{selectedStory.story}"
                </p>
              </div>
            </div>

            <div className="space-y-3.5 pt-6 border-t border-white/5">
              <div className="text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Inspect other client profiles:</div>
              <div className="flex flex-wrap gap-2">
                {transformationsData.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveStoryIdx(idx);
                      setShowAfterState(true); // Reset view state
                    }}
                    className={`rounded-none px-3.5 py-2 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                      activeStoryIdx === idx
                        ? 'bg-white text-black'
                        : 'bg-[#0D0D0D] text-zinc-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    {item.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive visual slider column */}
          <div className="lg:col-span-7 flex" id="transformation-interactive-slider">
            <div className="relative rounded-none overflow-hidden bg-[#151515] border border-white/10 p-4 flex flex-col items-center justify-between w-full">
              
              {/* Toggles above graphic block */}
              <div className="flex rounded-none bg-[#0D0D0D] border border-white/10 p-1 mb-4 h-11 w-full max-w-[280px]">
                <button
                  onClick={() => setShowAfterState(false)}
                  className={`flex-1 rounded-none text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                    !showAfterState ? 'bg-white text-black' : 'text-zinc-550 hover:text-white'
                  }`}
                >
                  BEFORE
                </button>
                <button
                  onClick={() => setShowAfterState(true)}
                  className={`flex-1 rounded-none text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                    showAfterState ? 'bg-[#FF6600] text-black' : 'text-zinc-550 hover:text-white'
                  }`}
                >
                  AFTER
                </button>
              </div>

              {/* Graphic Display frame */}
              <div className="relative h-[320px] sm:h-[420px] w-full rounded-none overflow-hidden bg-black border border-white/5">
                
                {/* Before / After graphic with fade states */}
                <div className="absolute inset-0">
                  <img
                    src={showAfterState ? selectedStory.afterImg : selectedStory.beforeImg}
                    alt={selectedStory.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-opacity duration-300 grayscale select-none"
                    id="transformation-primary-viewer"
                  />
                  
                  {/* Absolute visual badge depending on view state */}
                  <span className={`absolute top-4 right-4 rounded-none px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                    showAfterState ? 'bg-[#25D366] text-black' : 'bg-red-500 text-white'
                  }`}>
                    {showAfterState ? 'Current Form (After)' : 'Starting State (Before)'}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 bg-[#0D0D0D]/90 rounded-none border border-white/10 p-3 flex sm:items-center justify-between gap-2 max-w-md backdrop-blur-md">
                    <div>
                      <div className="text-[8px] text-zinc-550 uppercase tracking-widest font-black">Active Program Blueprint</div>
                      <div className="text-xs text-white font-black uppercase tracking-wider mt-0.5">{selectedStory.goal}</div>
                    </div>
                    <span className="rounded-none bg-[#FF6600]/10 border border-[#FF6600]/20 px-2.5 py-1 text-[9px] font-black text-[#FF6600] font-mono">
                      {selectedStory.duration} Base
                    </span>
                  </div>
                </div>

              </div>
              <p className="text-[9px] text-zinc-500 mt-3 font-mono uppercase tracking-widest">
                Alternate states view to explore muscle definition transitions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CATEGORIZED SUCCESS DIRECTORY list */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="success-directory">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest text-white">Verified Client Logs</h3>
            <p className="text-xs text-zinc-500 font-semibold mt-0.5">Filter profiles to read individual recovery progressions.</p>
          </div>
          <div className="flex rounded-none bg-[#151515] p-1 border border-white/10" id="stories-category-filter">
            {(['all', 'fat_loss', 'muscle_gain'] as const).map((filterOpt) => (
              <button
                key={filterOpt}
                onClick={() => setCategoryFilter(filterOpt)}
                className={`rounded-none px-3.5 py-1.5 text-[9px] font-black uppercase tracking-widest cursor-pointer ${
                  categoryFilter === filterOpt ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {filterOpt === 'all' && 'All Clients'}
                {filterOpt === 'fat_loss' && 'Weight Loss'}
                {filterOpt === 'muscle_gain' && 'Muscle Gain'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="stories-filtered-grid">
          {filteredStories.map((item) => (
            <div key={item.id} className="p-6 rounded-none border border-white/10 bg-[#151515] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-white uppercase tracking-wider text-sm">{item.name}</h4>
                  <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-mono mt-0.5">Duration: {item.duration}</p>
                </div>
                <span className="block px-2.5 py-1 rounded-none bg-[#FF6600]/10 border border-[#FF6600]/20 text-[9px] font-black uppercase text-[#FF6600] font-mono">
                  {item.beforeWeight} → {item.afterWeight}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                "{item.story}"
              </p>
              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-zinc-500">
                <span className="font-bold">Plan: Pro Elite Tier</span>
                <span className="text-[#FF6600]">Verified Form Update</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VIDEO TESTIMONIALS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="transformations-video-section">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black uppercase text-white sm:text-3xl">
            Pro Video Testimonials Log
          </h2>
          <p className="text-xs text-zinc-450 leading-relaxed font-semibold">
            Listen directly to corporate professionals and athletes as they describe their daily workflow synchronization.
          </p>
        </div>

        {/* 2-Column simulated streaming dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="video-sim-grid">
          {/* Video 1 */}
          <div className="rounded-none border border-white/10 bg-[#151515] overflow-hidden flex flex-col justify-between p-5 sm:p-6 gap-6" id="video-mock-card-1">
            <div className="relative h-56 rounded-none overflow-hidden bg-black/45 border border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop"
                alt="Member streaming"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-60 group-hover:scale-101 transition-transform duration-500 grayscale"
              />
              <div className="absolute inset-0 bg-black/40" />
              {/* Play overlays with pulsate waves */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-none bg-[#FF6600] text-black shadow-lg cursor-pointer hover:bg-white active:scale-95 transition-all">
                  <Play className="h-6 w-6 ml-1 fill-black text-black" />
                </div>
              </div>
              <span className="absolute bottom-3 left-3 bg-[#0D0D0D]/80 px-2.5 py-1 rounded-none text-[9px] text-[#FF6600] font-mono tracking-widest border border-white/10">
                04:15 OVERALL TRANSCRIPT
              </span>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-black text-white uppercase tracking-wider text-sm flex items-center justify-between">
                <span>Riddhima Sen, Corporate Manager</span>
                <span className="text-[10px] font-bold text-zinc-500 font-mono tracking-widest">Birgunj, Nepal</span>
              </h4>
              <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                "Balancing a 11-hour workload was driving my health off a cliff. The custom macro plans designed by Elena Rostova coupled with 3 focused strength days at Fitex Gym turned things around entirely. I feel 15 years younger and have massive daily clarity."
              </p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="rounded-none border border-white/10 bg-[#151515] overflow-hidden flex flex-col justify-between p-5 sm:p-6 gap-6" id="video-mock-card-2">
            <div className="relative h-56 rounded-none overflow-hidden bg-black/45 border border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
                alt="Strength streaming"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-60 group-hover:scale-101 transition-transform duration-500 grayscale"
              />
              <div className="absolute inset-0 bg-black/40" />
              {/* Play overlays with pulsate waves */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-none bg-[#FF6600] text-black shadow-lg cursor-pointer hover:bg-white active:scale-95 transition-all">
                  <Play className="h-6 w-6 ml-1 fill-black text-black" />
                </div>
              </div>
              <span className="absolute bottom-3 left-3 bg-[#0D0D0D]/80 px-2.5 py-1 rounded-none text-[9px] text-[#FF6600] font-mono tracking-widest border border-white/10">
                06:40 STRENGTH TRANSCRIPT
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="font-black text-white uppercase tracking-wider text-sm flex items-center justify-between">
                <span>Abhishek Roy, Competitive Powerlifter</span>
                <span className="text-[10px] font-bold text-zinc-500 font-mono tracking-widest font-mono">Birgunj HQ</span>
              </h4>
              <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                "I was seeking serious Olympic plates and platform coaching. Under Marcus Steel's structured leverage optimizations. My deadlift peak scaled from 180kg to 255kg in less than six months. The lifting deck at Fitex Gym represents the gold standard."
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
