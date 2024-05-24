'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import CustomButton from '../CustomButton';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/lib/actions';
import { useState } from 'react';
import apiServive from '@/app/services/apiServices';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };
    const response = await apiServive.postWithoutToken(
      `auth/login/`,
      JSON.stringify(formData),
    );
    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      loginModal.close();
      router.push('/');
    } else {
      setError(response.non_field_errors);
    }
  };

  const content = (
    <>
      <h2 className='mb-6 text-2xl'>Please login</h2>
      <form action={submitLogin} className='space-y-4'>
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
          name='password'
          onChange={(e) => setPassword(e.target.value)}
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
        <CustomButton label='Login' onClick={submitLogin} className='' />
      </form>
    </>
  );
  return (
    <>
      <Modal
        isOpen={loginModal.isOpen}
        close={loginModal.close}
        content={content}
        label='Login'
      />
    </>
  );
};
export default LoginModal;
