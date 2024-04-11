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
      const response = await signup(payload);
      router.push(`verify-account?account=${response?.data?.email}`);
    } catch (error: any) {
      if (error?.code === 400 && error.message === 'Verification required') {
        router.push(`verify-account?account=${error?.data?.email}`);
      } else {
        //do something else
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
        className='w-[400px] block mb-[1rem] border-[1px]  border-lime-400 text-black'
      />
      <input
        onChange={handleInputChange}
        name='email'
        placeholder='email'
        className='w-[400px] block mb-[1rem] border-[1px]  border-lime-400 text-black'
      />
      <input
        onChange={handleInputChange}
        name='password'
        placeholder='password'
        className='w-[400px] block mb-[1rem] border-[1px]  border-lime-400 text-black'
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
