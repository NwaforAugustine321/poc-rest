'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { IVerification } from '@/interfaces/auth.interface';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Verification() {
  const { verify } = useAuth();
  const param = useSearchParams();

  const router = useRouter();

  const [payload, setPayload] = useState<IVerification>({
    code: '',
    email: param.get('account') ?? '',
  });

  const handleInputChange = (event: any): void => {
    const name = event.target.name;
    const value = event.target.value;

    setPayload((prev: IVerification): IVerification => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const verifyAccount = async (): Promise<void> => {
    try {
      await verify(payload);
      router.push('/login');
    } catch (error: any) {
      console.log('failed verification');
    }
  };

  useEffect(() => {
    setPayload((prev) => {
      return {
        ...prev,
        email: param.get('account') ?? '',
      };
    });
  }, [param]);

  return (
    <main className='w-full flex justify-center flex-col items-center h-[500px]'>
      <h1>Verification</h1>
      <input
        onChange={handleInputChange}
        name='code'
        placeholder='code'
        className='w-[400px] block mb-[1rem] border-[1px]  border-lime-400 text-black'
      />

      <button className='text-black' onClick={verifyAccount}>
        verify
      </button>
      <Link className='text-blue-500' href={'/'}>
        home
      </Link>
    </main>
  );
}
