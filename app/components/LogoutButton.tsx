'use client';

import { useRouter } from 'next/navigation';
import NavMenuLink from './navbar/NavMenuLink';
import { resetAuthCokkies } from '@/lib/actions';

const LogoutButton = () => {
  const router = useRouter();
  const submitLogout = async () => {
    resetAuthCokkies();
    router.push('/');
  };

  return <NavMenuLink label='Logout' onClick={submitLogout} />;
};
export default LogoutButton;
