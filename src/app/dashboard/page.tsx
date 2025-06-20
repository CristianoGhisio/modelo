'use client';

import { useRequireAuth, useLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function DashboardPage() {
  const auth = useRequireAuth();
  const logout = useLogout();

  // 📊 Loading state durante verificação de auth
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 🚫 Se não está autenticado, o hook já redireciona
  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 📱 Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* 🏛️ Logo */}
            <div className="flex items-center">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold mr-3">
                ⚖️
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Sistema de Advocacia
              </h1>
            </div>

            {/* 👤 User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Olá, <span className="font-medium">{auth.user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 📊 Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 🎯 Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo ao Dashboard
          </h2>
          <p className="text-gray-600">
            Gerencie seus processos e clientes de forma eficiente.
          </p>
        </div>

        {/* 📱 Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 📊 Stats Cards */}
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="text-blue-600 text-xl">📋</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Processos</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="text-green-600 text-xl">👥</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="text-yellow-600 text-xl">⏰</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Audiências Hoje</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 📱 Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <span className="mr-2">➕</span>
                Novo Processo
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <span className="mr-2">👤</span>
                Cadastrar Cliente
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <span className="mr-2">📅</span>
                Agendar Audiência
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Processos Recentes
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Proc. 001/2024</p>
                  <p className="text-sm text-gray-600">Cliente: João Silva</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Em andamento
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Proc. 002/2024</p>
                  <p className="text-sm text-gray-600">Cliente: Maria Santos</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Concluído
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* 👤 User Details */}
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informações do Usuário
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Nome</p>
              <p className="text-gray-900">{auth.user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-gray-900">{auth.user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">ID do Usuário</p>
              <p className="text-gray-900">{auth.user?.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Ativo
              </span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
} 