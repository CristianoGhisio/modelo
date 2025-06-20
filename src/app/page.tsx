'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o usuário já está logado, redireciona para o dashboard
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  // Enquanto verifica o estado de autenticação, mostra um loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  // Se não está logado, mostra a landing page com o botão de login
  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Sistema</h1>
          <p className="text-lg mb-8">Por favor, faça o login para continuar.</p>
          <Link href="/login">
            <button className="bg-gray-900 text-white hover:bg-gray-800 h-10 py-2 px-6 rounded-md">
              Ir para Login
            </button>
          </Link>
        </div>
      </main>
    );
  }

  // Este retorno é um fallback, caso o redirecionamento do useEffect demore
  return null;
}
