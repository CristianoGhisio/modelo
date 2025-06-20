'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// 🔐 Tipos para autenticação
interface User {
  id: number;
  email: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<AuthResponse>;
  logout: () => void;
  checkAuth: () => void;
}

// 🎯 Configuração da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// 📊 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🛡️ Provider do contexto de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔍 Verifica se usuário está autenticado
  const isAuthenticated = !!user && !!token;

  // 🔐 Função de login
  const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
      console.log('🔐 Attempting login:', { email: data.email });
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success && result.data) {
        console.log('✅ Login successful:', { user: result.data.user });
        
        // 💾 Salvar dados no localStorage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        
        // 📊 Atualizar estado
        setToken(result.data.token);
        setUser(result.data.user);
        
        return result;
      } else {
        console.log('❌ Login failed:', result.error);
        return result;
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        error: 'Erro de conexão com o servidor'
      };
    }
  };

  // 🚪 Função de logout
  const logout = () => {
    console.log('🚪 Logging out user');
    
    // 🗑️ Limpar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 📊 Limpar estado
    setToken(null);
    setUser(null);
  };

  // 🔍 Verificar autenticação no carregamento
  const checkAuth = () => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        console.log('🔍 Found saved auth data');
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        console.log('🔍 No saved auth data found');
      }
    } catch (error) {
      console.error('❌ Error checking auth:', error);
      logout(); // Limpar dados corrompidos
    } finally {
      setIsLoading(false);
    }
  };

  // 🚀 Verificar autenticação na inicialização
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 🎯 Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 