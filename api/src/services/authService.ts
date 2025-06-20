import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// 🔐 Configuração JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// 🛡️ Interface para resultado do login
interface LoginResult {
  success: boolean;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  token?: string;
  error?: string;
}

// 🎯 Interface para dados do usuário
interface UserData {
  id: number;
  email: string;
  name: string;
  password: string;
}

// 🔍 Função de login com logging defensivo
export const loginUser = async (email: string, password: string): Promise<LoginResult> => {
  try {
    console.log('🔍 AuthService - Login attempt:', {
      email,
      timestamp: new Date().toISOString()
    });

    // 📊 Buscar usuário no banco
    const user = await prisma.user.findUnique({
      where: { email }
    }) as UserData | null;

    if (!user) {
      console.log('❌ AuthService - User not found:', { email });
      return {
        success: false,
        error: 'Usuário não encontrado'
      };
    }

    console.log('🔍 AuthService - User found:', {
      userId: user.id,
      email: user.email
    });

    // 🔐 Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('❌ AuthService - Invalid password:', { 
        email,
        userId: user.id 
      });
      return {
        success: false,
        error: 'Senha inválida'
      };
    }

    // 🎯 Gerar JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );

    console.log('✅ AuthService - Login successful:', {
      userId: user.id,
      email: user.email,
      tokenGenerated: !!token
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    };

  } catch (error) {
    console.error('❌ AuthService - Login error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      email
    });

    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
};

// 🔐 Função para criar usuário administrador
export const createAdminUser = async (): Promise<boolean> => {
  try {
    console.log('👤 Creating admin user...');

    // Verificar se admin já existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@modelo.com' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return true;
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Criar usuário admin
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@modelo.com',
        name: 'Administrador',
        password: hashedPassword
      }
    });

    console.log('✅ Admin user created successfully:', {
      id: adminUser.id,
      email: adminUser.email
    });

    return true;
  } catch (error) {
    console.error('❌ Error creating admin user:', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
};

// 🔍 Função para verificar JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('❌ Token verification failed:', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return null;
  }
}; 