import { Request, Response, NextFunction } from 'express';

// 🛡️ Interface para erros customizados
interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// 🚨 Error Handler middleware global
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 📊 Log estruturado do erro
  console.error('🚨 Global Error Handler:', {
    error: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // 🎯 Determinar status code
  const statusCode = error.statusCode || 500;
  
  // 🛡️ Resposta segura (não vazar detalhes em produção)
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const errorResponse = {
    success: false,
    error: isDevelopment ? error.message : 'Erro interno do servidor',
    ...(isDevelopment && { stack: error.stack }),
    timestamp: new Date().toISOString()
  };

  res.status(statusCode).json(errorResponse);
};

// 🔍 Middleware para capturar 404
export const notFoundHandler = (req: Request, res: Response): void => {
  console.log('🔍 404 Not Found:', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado',
    timestamp: new Date().toISOString()
  });
};

// 🛡️ Middleware de validação de JSON
export const jsonErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof SyntaxError && 'body' in error) {
    console.error('🚨 JSON Parse Error:', {
      error: error.message,
      url: req.url,
      method: req.method
    });

    res.status(400).json({
      success: false,
      error: 'JSON inválido no corpo da requisição'
    });
    return;
  }
  
  next(error);
}; 