import React, { useState } from 'react';
import { PageType } from '../types';
import { programsData, classesData, weeklyScheduleData } from '../data';
import { ShieldCheck, Flame, Clock, Heart, ArrowUpRight, Zap, Target, BookOpen } from 'lucide-react';

interface ProgramsProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Programs({ setCurrentPage }: ProgramsProps) {
  const [activeDay, setActiveDay] = useState<string>('Monday');
  const [classFilter, setClassFilter] = useState<string>('all');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Find classes corresponding to active day
  const currentDaySchedule = weeklyScheduleData.find(d => d.day === activeDay) || weeklyScheduleData[0];
  
  // Filter classes inside current day schedule based on category selected
  const filteredClasses = currentDaySchedule.classes.filter(cls => {
    if (classFilter === 'all') return true;
    return cls.category === classFilter;
  });

  return (
    <div className="space-y-24 py-16 pb-24 font-sans text-white" id="programs-page-container">
      
      {/* 1. SECTION: SYSTEM PROGRAMS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="programs-plans">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#3B82F6]">
            ENGINEERED TRAINING SYSTEMS
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl italic">
            Elite Fitness Blueprints
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-semibold leading-relaxed">
            Carefully crafted, multi-week physical training program tracks focused on biological adaptation, neuromuscular synchronization, and structural longevity.
          </p>
        </div>

        {/* Programs display layout (staggered bento style list) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="programs-bento-grid">
          {programsData.map((prog) => (
            <div 
              key={prog.id}
              className="group relative rounded-none overflow-hidden border border-white/10 bg-[#151515] flex flex-col justify-between"
              id={`prog-card-${prog.id}`}
            >
              {/* Cover Photo */}
              <div className="relative h-48 overflow-hidden bg-black/45">
                <img
                  src={prog.image}
                  alt={prog.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover opacity-60 group-hover:scale-105 transition-all duration-700 grayscale brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent" />
                <span className="absolute top-4 left-4 inline-block rounded-none bg-[#3B82F6] px-2.5 py-1 text-[9px] font-black uppercase text-black tracking-widest font-mono">
                  {prog.intensity} TYPE
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white group-hover:text-[#3B82F6] transition-colors italic">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                    {prog.description}
                  </p>
                </div>

                {/* Bullets benefit */}
                <div className="pt-4 border-t border-white/5 space-y-2 mt-auto">
                  <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Verifiable Adaptations</div>
                  <ul className="space-y-1.5 text-xs">
                    {prog.benefits.map((ben, bidx) => (
                      <li key={bidx} className="flex items-start text-zinc-400 font-semibold leading-normal">
                        <span className="text-[#3B82F6] font-bold mr-2">•</span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Footer CTA */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('trial');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex w-full items-center justify-between gap-2.5 rounded-none bg-[#0D0D0D] border border-white/10 px-4 py-3.5 text-xs font-black uppercase tracking-widest text-[#3B82F6] hover:bg-[#3B82F6] hover:text-black hover:border-white/20 transition-all cursor-pointer"
                >
                  <span>Select Active Track</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SECTION: WEEKLY SCHEDULE MATRIX */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="classes-schedule">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6" id="schedule-header">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#3B82F6]">
              REAL TIME TIMETABLE
            </span>
            <h2 className="text-2xl font-black uppercase text-white sm:text-4xl italic">
              Interactive Classes Schedule
            </h2>
            <p className="max-w-2xl text-xs text-zinc-400 font-semibold leading-relaxed">
              Filter classes, coordinate time slots, and verify elite trainer supervision to optimize daily sports targets.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2" id="class-filters-list">
            <button
              onClick={() => setClassFilter('all')}
              className={`rounded-none px-3.5 py-2 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${
                classFilter === 'all'
                  ? 'bg-white text-black border border-white'
                  : 'bg-[#151515] border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              All Matches
            </button>
            {classesData.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setClassFilter(cls.category)}
                className={`rounded-none px-3.5 py-2 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${
                  classFilter === cls.category
                    ? 'bg-white text-black border border-white'
                    : 'bg-[#151515] border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {cls.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Day-Selector matrix tabs (Horizontal Slider) */}
        <div className="flex overflow-x-auto gap-2 pb-2 border-b border-white/10" id="schedule-days-selector">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`min-w-[110px] text-center rounded-none py-3 px-4 font-black uppercase text-xs tracking-widest transition-all cursor-pointer ${
                activeDay === day
                  ? 'bg-[#3B82F6] text-black'
                  : 'bg-[#151515] border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Classes grid display */}
        <div className="min-h-[220px]" id="schedule-slots-grid">
          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="rounded-none border border-white/10 bg-[#151515] p-5 flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#3B82F6]" />
                        <span className="font-semibold text-zinc-400">{cls.time}</span>
                      </div>
                      <span className="rounded-none bg-[#0D0D0D] px-2 py-0.5 border border-white/10 text-zinc-400 uppercase tracking-widest text-[9px] font-black">
                        {cls.duration}
                      </span>
                    </div>

                    <h4 className="text-sm font-black uppercase text-white tracking-wider italic">
                      {cls.name}
                    </h4>

                    <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                      Coach: <span className="text-white font-black">{cls.trainer}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500">
                    <span>{cls.category} slot</span>
                    <span className={`inline-block px-2 py-0.5 rounded-none ${
                      cls.intensity === 'High' ? 'bg-rose-500/10 text-rose-450 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {cls.intensity} Intensity
                    </span>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-none bg-[#151515] border border-white/10 p-8 text-center space-y-2">
              <BookOpen className="mx-auto h-8 w-8 text-zinc-600" />
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-widest">No matching classes on {activeDay}</h4>
              <p className="text-[11px] text-zinc-500 max-w-md mx-auto leading-relaxed">
                Try selecting "All Matches" or change the active day tabs above to coordinate open time slots. Standard gym floor training is open during all operating hours.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. SECTION: CLASS DIRECTORY PROFILES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn" id="programs-directory">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white sm:text-3xl italic">
            Signature Masterclasses Guide
          </h2>
          <p className="text-xs text-zinc-450 leading-relaxed font-semibold">
            Our specialized masterclasses are high-sweat structured experiences calibrated for all levels. Included on standard Pro/Elite tier access bounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="classes-directory-grid">
          {classesData.map((cls) => (
            <div key={cls.id} className="p-6 rounded-none border border-white/10 bg-[#151515] space-y-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-none bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                {cls.id === 'hiit' && <Zap className="h-5.5 w-5.5" />}
                {cls.id === 'yoga' && <Heart className="h-5.5 w-5.5" />}
                {cls.id === 'zumba' && <Flame className="h-5.5 w-5.5" />}
                {cls.id === 'functional' && <Target className="h-5.5 w-5.5" />}
                {cls.id === 'crossfit' && <ShieldCheck className="h-5.5 w-5.5" />}
                {cls.id === 'boxing' && <BookOpen className="h-5.5 w-5.5" />}
              </div>
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-zinc-500 font-bold tracking-widest uppercase">{cls.duration} Duration</span>
                <h4 className="text-sm font-black uppercase text-white tracking-wider italic">{cls.name}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                  {cls.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
