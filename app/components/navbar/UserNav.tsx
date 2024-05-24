'use client';

import { useState } from 'react';
import NavMenuLink from './NavMenuLink';
import useLoginModal from '@/app/hooks/useLoginModal';
import useSignupModal from '@/app/hooks/useSignupModal';
import LogoutButton from '../LogoutButton';
import { useRouter } from 'next/navigation';
import apiServive from '@/app/services/apiServices';

interface UserNavProps {
  userId?: string | null;
}

const UserNav = ({ userId }: UserNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();

  const router=useRouter()

  return (
    <div className='p-2 relative inline-block border rounded-full'>
      <button onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
        <svg
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>

        <svg
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='w-[220px] absolute  top-[60px] right-0 bg-white rounded-xl shadow-md'>
          <div className='flex flex-col cursor-pointer'>
            {userId === null ? (
              <>
                {' '}
                <NavMenuLink
                  onClick={() => {
                    console.log('hello');

                    loginModal.open();
                  }}
                  label='Log in'
                />
                <NavMenuLink
                  onClick={() => {
                    console.log('hello');
                    signupModal.open();
                  }}
                  label='Sign up'
                />
              </>
            ) : (
              <>
                <NavMenuLink
                  onClick={() => {
                    router.push('/inbox');
                    setIsOpen(false);
                  }}
                  label='Inbox'
                />
                <NavMenuLink
                  onClick={() => {
                    router.push('/myproperties');
                    setIsOpen(false);
                  }}
                  label='My properties'
                />
                <NavMenuLink
                  onClick={() => {
                    router.push('/myreservations');
                    setIsOpen(false);
                  }}
                  label='My reservations'
                />
                <NavMenuLink
                  onClick={() => {
                    router.push('/myfavourites');
                    setIsOpen(false);
                  }}
                  label='My favourites'
                />
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserNav;
