import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Defina a sua chave secreta em um arquivo .env
const SECRET_KEY = 'YOUR_SECRET_KEY';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded as { userId: number; name: string };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};
