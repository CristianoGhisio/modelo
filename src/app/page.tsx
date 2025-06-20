'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading) {
      if (auth.isAuthenticated) {
        console.log('✅ User authenticated, redirecting to dashboard');
        router.push('/dashboard');
      } else {
        console.log('🔐 User not authenticated, redirecting to login');
        router.push('/login');
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);

  // 📊 Loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
          ⚖️
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Sistema de Advocacia
        </h1>
        <p className="text-gray-600 mb-6">
          Carregando...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
