"use client";

import Home from '../views/Home';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  return <Home setCurrentPage={handleNavigate} />;
}
