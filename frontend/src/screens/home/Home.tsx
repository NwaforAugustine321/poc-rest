'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { setSignupSelectedRole } = useAuth();

  const register = (role: string) => {
    setSignupSelectedRole(role);
    router.push('signup');
  };

  return (
    <main className='w-full flex justify-center flex-col items-center h-[500px]'>
      <h1 className='mb-[1rem] text-black'>home</h1>

      <div className='flex gap-[1rem]'>
        <button
          className='text-green-500 w-[max-content]'
          onClick={() => register('mentee')}
        >
          become mentee
        </button>
        <button
          onClick={() => register('mentor')}
          className='text-green-500 w-[max-content]'
        >
          become mentor
        </button>
      </div>
    </main>
  );
}
