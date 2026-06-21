"use client";

import Membership from '../../views/Membership';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  return <Membership setCurrentPage={handleNavigate} />;
}
