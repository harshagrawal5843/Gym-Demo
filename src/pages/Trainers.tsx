import React, { useState } from 'react';
import { PageType } from '../types';
import { trainersData } from '../data';
import { Award, ChevronDown, ChevronUp, CheckCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrainersProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Trainers({ setCurrentPage }: TrainersProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedTrainerId, setExpandedTrainerId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Coaches' },
    { id: 'strength', label: 'Strength Coaches' },
    { id: 'weight_loss', label: 'Weight Loss Coaches' },
    { id: 'nutrition', label: 'Nutrition Experts' },
    { id: 'functional', label: 'Functional Fitness' }
  ];

  // Change expanded card state
  const toggleExpand = (id: string) => {
    if (expandedTrainerId === id) {
      setExpandedTrainerId(null);
    } else {
      setExpandedTrainerId(id);
    }
  };

  // Filter coaches based on category selected
  const filteredTrainers = trainersData.filter(coach => {
    if (activeCategory === 'all') return true;
    return coach.category === activeCategory;
  });

  return (
    <div className="space-y-24 py-16 pb-24 font-sans text-white" id="trainers-page-container">
      
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4" id="trainers-header">
        <span className="text-xs font-black uppercase tracking-widest text-[#3B82F6]">
          Delhi NCR’s Prime Sports Specialists
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl italic">
          Meet Our Elite Master Coaches
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-semibold leading-relaxed">
          We do not hire generic flooring assistants. All Iron Forge specialists are internationally certified coaches, kinesiologists, and elite competitive athletes.
        </p>

        {/* 1. INTERACTIVE CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-2 pt-6" id="coaches-tabs-selector">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedTrainerId(null); // Fold state of all cards on tab changes
              }}
              className={`rounded-none px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-black border border-white'
                  : 'bg-[#151515] border border-white/10 text-zinc-450 hover:text-white hover:border-[#3B82F6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. TRAINERS GRID (WITH EXPANSION MECHANISMS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="trainers-grid-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="trainers-cards-display">
          {filteredTrainers.map((coach) => {
            const isExpanded = expandedTrainerId === coach.id;
            return (
              <div
                key={coach.id}
                className={`relative rounded-none overflow-hidden border transition-all duration-300 bg-[#151515] ${
                  isExpanded ? 'border-[#3B82F6] shadow-2xl' : 'border-white/10 hover:border-white/20'
                }`}
                id={`coach-card-${coach.id}`}
              >
                
                {/* Visual Cover Photo with Hover scaling */}
                <div className="relative h-72 w-full overflow-hidden bg-black/45">
                  <img
                    src={coach.photoUrl}
                    alt={coach.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover grayscale brightness-90 hover:scale-105 transition-all duration-700"
                    id={`coach-photo-${coach.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                  
                  {/* Category Stamp info */}
                  <span className="absolute bottom-4 left-4 inline-block rounded-none bg-[#0D0D0D] border border-white/10 text-zinc-300 font-mono font-bold uppercase tracking-widest text-[9px] px-2.5 py-1">
                    {coach.role}
                  </span>
                </div>

                {/* Card Main text */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-wider text-white italic">
                        {coach.name}
                      </h3>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                        Experience: {coach.experience}
                      </div>
                    </div>
                    {/* Visual Stamp */}
                    <div className="rounded-none bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-1.5 text-[#3B82F6]">
                      <Award className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  {/* Highlights Metric Boxes */}
                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <div className="bg-[#0D0D0D] p-2.5 rounded-none border border-white/5 text-center">
                      <div className="text-[9px] text-[#3B82F6] uppercase font-bold tracking-widest">Success Metric</div>
                      <div className="text-[11px] text-white font-semibold mt-1 font-mono">{coach.successMetric}</div>
                    </div>
                    <div className="bg-[#0D0D0D] p-2.5 rounded-none border border-white/5 text-center">
                      <div className="text-[9px] text-emerald-400 uppercase font-bold tracking-widest">Certified Standards</div>
                      <div className="text-[11px] text-white font-semibold mt-1 font-mono">Gold Standard</div>
                    </div>
                  </div>

                  {/* Interactive expansion triggers */}
                  <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                    <button
                      onClick={() => toggleExpand(coach.id)}
                      className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Fold Coach Profile' : 'Inspect Credentials & Bio'}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-[#3B82F6]" /> : <ChevronDown className="h-4 w-4 text-[#3B82F6]" />}
                    </button>

                    {/* Smooth expansion drawer panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden space-y-4 pt-1"
                        >
                          {/* Coach customized motto */}
                          <div className="bg-[#0D0D0D] p-3.5 rounded-none border border-white/5 text-xs italic text-zinc-400 leading-relaxed font-semibold">
                            "{coach.quote}"
                          </div>

                          {/* Certification list */}
                          <div className="space-y-1.5">
                            <div className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Academics & Credentials</div>
                            <ul className="space-y-1 text-xs">
                              {coach.certifications.map((cert, cidx) => (
                                <li key={cidx} className="flex items-center text-zinc-350 font-medium">
                                  <CheckCircle className="mr-2 h-3.5 w-3.5 text-emerald-450 flex-shrink-0" />
                                  <span>{cert}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Training Specializations tags */}
                          <div className="space-y-1.5">
                            <div className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Exercise Specialties</div>
                            <div className="flex flex-wrap gap-1.5">
                              {coach.specialization.map((spec, sidx) => (
                                <span key={sidx} className="rounded-none bg-[#0D0D0D] border border-white/10 px-2 py-0.5 text-[9px] font-bold text-zinc-400 uppercase">
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-white/5">
                            <button
                              onClick={() => {
                                setCurrentPage('trial');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="flex-1 rounded-none bg-white text-center py-2 text-xs font-black uppercase text-black hover:bg-[#3B82F6] hover:text-white transition-all cursor-pointer"
                            >
                              Reserve Slot
                            </button>
                            <a
                              href={`mailto:${coach.name.toLowerCase().replace(' ', '')}@ironforge.com`}
                              className="flex h-8.5 w-8.5 items-center justify-center rounded-none bg-[#0D0D0D] border border-white/10 text-zinc-400 hover:text-white hover:border-[#3B82F6]"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. VERIFIABLE QUALITY ACCREDITATIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="trainers-accreditations">
        <div className="rounded-none border border-white/10 bg-[#151515] p-8 sm:p-12 text-center space-y-6">
          <div className="flex justify-center gap-6 text-zinc-600 font-black text-xl uppercase tracking-[0.2em] opacity-55 flex-wrap">
            <span>NSCA APPROVED</span>
            <span>NASM COMPLIANT</span>
            <span>ACE REGISTERED</span>
            <span>USA COMPETING ATHLETES</span>
          </div>
          <p className="max-w-2xl mx-auto text-xs text-zinc-500 leading-relaxed font-semibold">
            All coaching schedules are structured under the direct biomechanics supervision of Dr. Elena Rostova. Routine assessments are executed quarterly to maintain Delhi NCR's safest joint-injury preventative protocols.
          </p>
        </div>
      </section>

    </div>
  );
}
