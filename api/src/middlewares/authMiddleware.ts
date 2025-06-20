/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

// 🔐 Interface para request autenticado
interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
    name: string;
  };
}

// 🛡️ Middleware de autenticação JWT
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  console.log('🔐 Auth Middleware:', {
    hasAuthHeader: !!authHeader,
    hasToken: !!token,
    url: req.url,
    method: req.method
  });

  if (!token) {
    console.log('❌ Auth Failed - No token provided');
    res.status(401).json({
      success: false,
      error: 'Token de acesso requerido'
    });
    return;
  }

  try {
    const decoded = verifyToken(token);
    
    if (!decoded) {
      console.log('❌ Auth Failed - Invalid token');
      res.status(403).json({
        success: false,
        error: 'Token inválido'
      });
      return;
    }

    // 📊 Adicionar dados do usuário ao request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name
    };

    console.log('✅ Auth Success:', {
      userId: decoded.userId,
      email: decoded.email
    });

    next();
  } catch (error) {
    console.error('❌ Auth Error:', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    res.status(403).json({
      success: false,
      error: 'Token inválido'
    });
  }
};

// 🔍 Middleware opcional de autenticação (não bloqueia se não tiver token)
export const optionalAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Se não tiver token, continua sem user
    next();
    return;
  }

  try {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name
      };
    }
  } catch (error) {
    // Se token for inválido, apenas ignora
    console.log('🔍 Optional auth - invalid token ignored');
  }

  next();
};

// 🎯 Export do tipo para usar em outros arquivos
export type { AuthenticatedRequest };
