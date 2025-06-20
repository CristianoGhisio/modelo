import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/authService';
import { AsyncController } from '../utils/asyncHandler';

// 🔐 Interface para request de login com validação
interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

// 🎯 Login Controller com tipos corretos
export const loginController: AsyncController = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login Attempt:', {
      email,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    // 📊 Validação básica
    if (!email || !password) {
      console.log('❌ Login Failed - Missing credentials:', { email: !!email, password: !!password });
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      });
    }

    // 🔍 Processar login
    const result = await loginUser(email, password);

    if (!result.success) {
      console.log('❌ Login Failed - Invalid credentials:', { email });
      return res.status(401).json({
        success: false,
        error: 'Credenciais inválidas'
      });
    }

    console.log('✅ Login Success:', {
      email,
      userId: result.user?.id,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      data: {
        user: result.user,
        token: result.token
      }
    });

  } catch (error) {
    console.error('❌ Login Controller Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Não fazer throw aqui, deixar o asyncHandler capturar
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
}; 