'use client';

import { useState, FormEvent } from 'react';
import { useRedirectIfAuthenticated } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function LoginPage() {
  const auth = useRedirectIfAuthenticated();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 📊 Loading state durante verificação de auth
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <LoadingSpinner 
          size="xl" 
          color="amber" 
          text="Verificando autenticação..."
        />
      </div>
    );
  }

  // 🔐 Handle submit do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await auth.login(formData);
      
      if (!result.success) {
        setError(result.error || 'Erro no login');
      }
    } catch (error) {
      setError('Erro de conexão com o servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 📝 Handle mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* 🌟 Background Effects */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat' 
      }}></div>
      
      {/* 🎭 Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 min-h-screen flex">
        {/* 📄 Left Side - Hero Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 text-white">
          <div className="max-w-xl">
            {/* 🏛️ Logo & Brand */}
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-slate-900 shadow-2xl">
                ⚖️
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  LexAdvocacia
                </h1>
                <p className="text-slate-300 text-sm">Excelência Jurídica</p>
              </div>
            </div>

            {/* 🎯 Hero Message */}
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Onde a <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Justiça</span><br />
              encontra a <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Excelência</span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Há mais de 20 anos defendendo seus direitos com a máxima competência técnica e dedicação pessoal.
            </p>

            {/* ⭐ Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4"></div>
                <span className="text-slate-300">Mais de 5.000 casos de sucesso</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                <span className="text-slate-300">Equipe especializada em todas as áreas</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-4"></div>
                <span className="text-slate-300">Atendimento 24/7 para emergências</span>
              </div>
            </div>

            {/* 🏆 Awards */}
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">2024</div>
                <div>Melhor Escritório</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">98%</div>
                <div>Taxa de Sucesso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">24h</div>
                <div>Resposta Média</div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔐 Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border-0 p-8 lg:p-10">
            {/* 📱 Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-slate-900 shadow-lg mb-4">
                ⚖️
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                LexAdvocacia
              </h1>
            </div>

            {/* 🎯 Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Área do Cliente
              </h2>
              <p className="text-slate-600">
                Acesse seu painel de acompanhamento processual
              </p>
            </div>

            {/* 🚨 Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-500">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 📝 Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Profissional
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="seu.email@exemplo.com"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400">📧</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="••••••••••••"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400">🔒</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient-amber"
                size="lg"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                className="w-full rounded-xl font-semibold"
              >
                {!isSubmitting && (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🚀</span>
                    Acessar Sistema
                  </div>
                )}
              </Button>
            </form>

            {/* 💡 Demo Credentials */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-200 rounded-xl">
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Acesso de Demonstração
              </h3>
              <div className="text-xs text-slate-600 space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="font-medium">Email:</span>
                  <code className="text-blue-600 font-mono">admin@modelo.com</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="font-medium">Senha:</span>
                  <code className="text-blue-600 font-mono">admin123</code>
                </div>
              </div>
            </div>

            {/* 🔗 Footer Links */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <div className="flex justify-center space-x-6 text-sm text-slate-500">
                <a href="#" className="hover:text-amber-600 transition-colors">Esqueci minha senha</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-600 transition-colors">Primeiro acesso</a>
                <span>•</span>
                <a href="#" className="hover:text-amber-600 transition-colors">Suporte</a>
              </div>
            </div>

            {/* 🛡️ Security Badge */}
            <div className="mt-6 flex items-center justify-center text-xs text-slate-400">
              <span className="mr-2">🛡️</span>
              Conexão protegida por SSL • Dados criptografados
            </div>
          </Card>
        </div>
      </div>

      {/* 📊 Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-2xl font-bold text-amber-400">20+</div>
              <div className="text-sm text-slate-300">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">5.000+</div>
              <div className="text-sm text-slate-300">Casos Resolvidos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">98%</div>
              <div className="text-sm text-slate-300">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-slate-300">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 