'use client';
import { useAppSelector } from '@/hooks/storeshooks';
import { AuthState } from '@/interfaces/auth.interface';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();

  const { token, isAuthenticated } = useAppSelector(
    (state: RootState): AuthState => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, token]);

  return <>{isAuthenticated && token && children}</>;
};

export default ProtectedRoute;
