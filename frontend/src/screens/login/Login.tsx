'use client';
import { useAuth } from '@/hooks/useAuth';
import { ILogin } from '@/interfaces/auth.interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (event: any): void => {
    const name = event.target.name;
    const value = event.target.value;

    setPayload((prev: ILogin): ILogin => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [payload, setPayload] = useState<ILogin>({
    email: '',
    password: '',
  });

  const loginUser = async () => {
    try {
      await login(payload);
      router.push('/');
    } catch (error: any) {
      if (error.status && error.status === 'ERROR') {
        alert(error?.errors?.message);
      }
    }
  };

  return (
    <main className='w-full flex justify-center flex-col items-center h-[500px]'>
      <input
        onChange={handleInputChange}
        name='email'
        placeholder='email'
        className='w-[400px] text-black block mb-[1rem] border-[1px]  border-lime-400'
      />
      <input
        onChange={handleInputChange}
        name='password'
        placeholder='password'
        className='w-[400px] text-black  block mb-[1rem] border-[1px]  border-lime-400'
      />
      <button className='text-black' onClick={loginUser}>
        login
      </button>

      <Link className='text-blue-500' href={'/signup'}>
        sign up
      </Link>
    </main>
  );
}
