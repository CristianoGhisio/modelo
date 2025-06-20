'use client';

import { useAuth as useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 🎯 Hook customizado para autenticação
export function useAuth() {
  return useAuthContext();
}

// 🔐 Hook para proteção de rotas (requer autenticação)
export function useRequireAuth() {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      console.log('🚫 User not authenticated, redirecting to login');
      router.push('/login');
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);

  return auth;
}

// 🚪 Hook para redirecionamento se já autenticado
export function useRedirectIfAuthenticated() {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      console.log('✅ User already authenticated, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);

  return auth;
}

// 📊 Hook para logout com confirmação
export function useLogout() {
  const auth = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    try {
      console.log('🚪 Initiating logout...');
      auth.logout();
      router.push('/login');
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  return logout;
} 