import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      // Verifica se a mensagem de erro é uma das que definimos no serviço
      if (error.message === 'Usuário não encontrado' || error.message === 'Senha inválida') {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
    }
    // Para outros erros, retorna um erro de servidor genérico
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 