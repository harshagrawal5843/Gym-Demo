"use client";

import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const { galleryItems } = useGym();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Shots' },
    { id: 'interior', label: 'Gym Interior' },
    { id: 'equipment', label: 'Bespoke Equipment' },
    { id: 'classes', label: 'In-Action Classes' },
    { id: 'events', label: 'Special Events' },
    { id: 'members', label: 'The Community' }
  ];

  // Filtering images
  const filteredGallery = galleryItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (id: string) => {
    const idx = galleryItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % galleryItems.length);
    }
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const activeLightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div className="space-y-24 py-16 pb-24 font-sans" id="gallery-page-container">
      
      {/* HEADER SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4" id="gallery-header">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
          VISUAL SANCTUARY PROTOCOLS
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
          Fitex Gym Photo Registry
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-semibold leading-relaxed">
          Step into our modern architectural layout. View our bespoke Eleiko strength frames, clean wet suites, and daily active training environments.
        </p>

        {/* GALLERY CLASSIFIER CONTROLS */}
        <div className="flex flex-wrap justify-center gap-2 pt-6" id="gallery-classifiers-wrapper">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-none px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-black border border-white'
                  : 'bg-[#151515] border border-white/10 text-zinc-450 hover:text-white hover:border-[#FF6600]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY MASONRY CONTAINER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="gallery-masonry-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="gallery-composite-grid">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(item.id)}
                className="group relative rounded-none overflow-hidden bg-[#0D0D0D] border border-white/10 h-[260px] cursor-pointer"
                id={`gallery-item-card-${item.id}`}
              >
                
                {/* Cover Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* Cover Overlay with actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 sm:opacity-0 group-hover:opacity-95 transition-all duration-300 flex flex-col justify-end p-5">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] font-mono font-black uppercase text-[#FF6600] tracking-widest bg-[#FF6600]/10 px-2.5 py-0.5 rounded-none border border-[#FF6600]/20">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-black uppercase text-white tracking-widest mt-2 max-w-[170px] truncate">
                        {item.title}
                      </h4>
                    </div>
                    {/* Visual indicators */}
                    <div className="rounded-none bg-[#FF6600] p-2.5 text-white shadow-xl">
                      <Eye className="h-4 w-4 text-black" />
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/98 p-4 sm:p-10 backdrop-blur-md cursor-zoom-out select-none"
            id="gallery-fullscreen-lightbox"
          >
            {/* Top Toolbar actions */}
            <div className="flex items-center justify-between text-zinc-400 max-w-7xl mx-auto w-full border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <span className="rounded-none bg-[#FF6600]/15 border border-[#FF6600]/20 px-2.5 py-1 text-[9px] font-black uppercase text-[#FF6600]">
                  {activeLightboxItem.category}
                </span>
                <p className="text-xs font-black text-white uppercase tracking-wider">{activeLightboxItem.title}</p>
              </div>
              
              <button
                onClick={closeLightbox}
                className="rounded-none border border-white/10 bg-[#151515] p-2 hover:bg-zinc-800 hover:text-white transition-all focus:outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Middle visual presenter Frame */}
            <div className="relative flex-grow flex items-center justify-center max-w-7xl mx-auto w-full my-6 select-none">
              
              {/* Prev indicators */}
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:-left-6 rounded-none border border-white/10 bg-[#151515]/90 p-3.5 hover:bg-zinc-800 hover:text-white transition-all text-zinc-400 focus:outline-none cursor-pointer z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] max-w-[85vw] sm:max-w-[70vw] rounded-none object-contain border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Stop closing lightbox on active item clicks
              />

              {/* Next indicators */}
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:-right-6 rounded-none border border-white/10 bg-[#151515]/90 p-3.5 hover:bg-zinc-800 hover:text-white transition-all text-zinc-400 focus:outline-none cursor-pointer z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

            </div>

            {/* Bottom help guide */}
            <div className="text-center text-[10px] text-zinc-500 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4">
              <span className="font-mono uppercase tracking-widest">SHOT {lightboxIndex + 1} OF {galleryItems.length} IN MASTER DATABASE</span>
              <span className="uppercase tracking-widest font-bold mt-1 sm:mt-0 text-zinc-400">Click transparent dark zones to collapse viewer</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
