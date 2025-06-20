import { Request, Response, NextFunction } from 'express';

// 🔧 AsyncHandler para resolver incompatibilidade de tipos com Express 5 + TypeScript
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 🛡️ Tipo para controllers async
export type AsyncController = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => Promise<Response | void>;

// 📊 Wrapper com logging defensivo
export const asyncHandlerWithLogging = (fn: AsyncController) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const traceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('🎯 Request Start:', {
      traceId,
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    });

    try {
      await fn(req, res, next);
      
      console.log('✅ Request Success:', {
        traceId,
        method: req.method,
        url: req.url,
        status: res.statusCode
      });
    } catch (error) {
      console.error('❌ Request Error:', {
        traceId,
        method: req.method,
        url: req.url,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      next(error);
    }
  };
}; 