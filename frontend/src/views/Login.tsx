"use client";

import React, { useState } from 'react';
import { PageType } from '../types';
import { useGym } from '../context/GymContext';
import { KeyRound, Mail, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Login({ setCurrentPage }: LoginProps) {
  const { login } = useGym();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const success = login(email, password);
    if (success) {
      setCurrentPage('dashboard');
    } else {
      setErrorMsg('Invalid credentials. Check your email and password.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-white/10 bg-[#151515] p-8 shadow-2xl relative"
        id="login-card"
      >
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto w-12 h-12 bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center text-[#FF6600] rounded-xl">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
            Fitex Administrative Gate
          </h2>
          <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
            Authorized staff only — enter your credentials
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[#FF6600]" />
              Staff Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. manager@fitex.com"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF6600] transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5 text-[#FF6600]" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF6600] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#FF6600] text-white text-xs font-black uppercase tracking-widest hover:bg-[#cc5200] shadow-[0_0_20px_rgba(255,102,0,0.3)] transition-all cursor-pointer"
          >
            Authenticate Credentials
          </button>
        </form>

        <div className="mt-8 p-4 bg-zinc-900/50 border border-white/5 text-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
            <ShieldAlert className="inline h-3.5 w-3.5 mr-1 text-zinc-600" />
            Restricted access — contact system admin if locked out
          </p>
        </div>
      </motion.div>
    </div>
  );
}
