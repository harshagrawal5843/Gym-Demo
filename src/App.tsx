import React, { useState } from 'react';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Programs from './pages/Programs';
import Trainers from './pages/Trainers';
import Transformations from './pages/Transformations';
import Gallery from './pages/Gallery';
import BookTrial from './pages/BookTrial';
import Contact from './pages/Contact';
import Tools from './pages/Tools';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Custom multi-page routing renderer
  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'membership':
        return <Membership setCurrentPage={setCurrentPage} />;
      case 'programs':
        return <Programs setCurrentPage={setCurrentPage} />;
      case 'trainers':
        return <Trainers setCurrentPage={setCurrentPage} />;
      case 'transformations':
        return <Transformations setCurrentPage={setCurrentPage} />;
      case 'gallery':
        return <Gallery />;
      case 'trial':
        return <BookTrial setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'tools':
        return <Tools />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col justify-between overflow-x-hidden font-sans" id="gym-app-root">
      
      {/* 1. Header Navigation elements */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* 2. Page viewport with elegant animates */}
      <main className="flex-grow relative" id="gym-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer credits and coordinates */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
