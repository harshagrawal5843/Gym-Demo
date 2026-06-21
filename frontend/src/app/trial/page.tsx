"use client";

import React, { useEffect } from 'react';
import BookTrial from '../../views/BookTrial';
import { useRouter } from 'next/navigation';
import { useGym } from '../../context/GymContext';
import { ShieldAlert } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const { currentUser } = useGym();

  useEffect(() => {
    if (currentUser) {
      router.replace('/dashboard');
    }
  }, [currentUser, router]);

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  if (currentUser) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="h-10 w-10 text-orange-500 animate-pulse" />
        <p className="text-sm font-black uppercase tracking-wider">Redirecting staff session to dashboard...</p>
      </div>
    );
  }

  return <BookTrial setCurrentPage={handleNavigate} />;
}
