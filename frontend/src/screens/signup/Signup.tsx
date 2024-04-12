'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { ISignup } from '@/interfaces/auth.interface';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const { signup, user } = useAuth();
  const { selectedRole } = user;
  const router = useRouter();

  const [payload, setPayload] = useState<ISignup>({
    name: '',
    email: '',
    password: '',
    role: selectedRole,
  });

  const handleInputChange = (event: any): void => {
    const name = event.target.name;
    const value = event.target.value;

    setPayload((prev: ISignup): ISignup => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const register = async () => {
    try {
      await signup(payload);
      router.push(`/login`);
    } catch (error: any) {
      if (error.status && error.status === 'ERROR') {
        alert(error?.errors?.message ?? error?.errors[0]);
      }
    }
  };

  return (
    <main className='w-full flex justify-center flex-col items-center h-[500px]'>
      <h1>Sign up</h1>
      <input
        onChange={handleInputChange}
        name='name'
        placeholder='username'
        className='w-[400px] text-black block mb-[1rem] border-[1px]  border-lime-400 text-black'
      />
      <input
        onChange={handleInputChange}
        name='email'
        placeholder='email'
        className='w-[400px] text-black block mb-[1rem] border-[1px]  border-lime-400 text-black'
      />
      <input
        onChange={handleInputChange}
        name='password'
        placeholder='password'
        className='w-[400px] text-black block mb-[1rem] border-[1px]  border-lime-400 text-black'
      />
      <button className='text-black' onClick={register}>
        Sign up
      </button>
      <Link className='text-blue-500' href={'/login'}>
        already have account login
      </Link>
    </main>
  );
}
