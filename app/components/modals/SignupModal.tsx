'use client';

import Modal from './Modal';
import CustomButton from '../CustomButton';
import useSignupModal from '@/app/hooks/useSignupModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import apiServive from '@/app/services/apiServices';
import { handleLogin } from '@/lib/actions';

const SignupModal = () => {
  const signupModal = useSignupModal();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password1, setPassowrd1] = useState('');
  const [password2, setPassowrd2] = useState('');
  const [error, setError] = useState<string[]>([]);

  const submitSignup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2,
    };
    const response = await apiServive.postWithoutToken(
      `auth/register/`,
      JSON.stringify(formData),
    );
    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      signupModal.close();
      router.push('/');
    } else {
      const tempErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });
      setError(tempErrors);
    }
  };

  const content = (
    <>
      <h2 className='mb-6 text-2xl'>Please sign-up</h2>
      <form action={submitSignup} className='space-y-4'>
        <input
          placeholder='Email address'
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          id=''
          className='h-[54px] px-4 border w-full  border-gray-100 rounded-xl'
        />
        <input
          placeholder='Password'
          type='password'
          name='password1'
          onChange={(e) => setPassowrd1(e.target.value)}
          id=''
          className='h-[54px] px-4 border w-full  border-gray-100 rounded-xl'
        />

        <input
          placeholder='Confirm Password'
          type='password'
          name='password2'
          onChange={(e) => setPassowrd2(e.target.value)}
          id=''
          className='h-[54px] px-4 border w-full  border-gray-100 rounded-xl'
        />
        {error?.map((error, index) => (
          <div
            key={index}
            className='p-3 bg-airbnb text-white rounded-xl opacity-80'>
            {error}
          </div>
        ))}

        <CustomButton label='Sign-up' onClick={submitSignup} className='' />
      </form>
    </>
  );
  return (
    <>
      <Modal
        isOpen={signupModal.isOpen}
        close={signupModal.close}
        content={content}
        label='Sign-up'
      />
    </>
  );
};
export default SignupModal;
