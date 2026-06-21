"use client";

import React, { useEffect } from 'react';
import Dashboard from '../../views/Dashboard';
import { useRouter } from 'next/navigation';
import { useGym } from '../../context/GymContext';
import { ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Page() {
  const router = useRouter();
  const { currentUser } = useGym();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }
  }, [currentUser, router]);

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="h-10 w-10 text-rose-500 animate-pulse" />
        <p className="text-sm font-black uppercase tracking-wider text-rose-400">Unauthorized Session. Redirecting to Login...</p>
      </div>
    );
  }

  return <Dashboard setCurrentPage={handleNavigate} />;
}
