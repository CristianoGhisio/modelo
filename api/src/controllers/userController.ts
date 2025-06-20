import { Request, Response } from 'express';
import { createUserService } from '../services/userService';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    // Em um app real, você teria um log mais robusto aqui
    console.error('Erro ao criar usuário:', error);

    // Verifica se o erro é por email duplicado (código de erro único do Prisma)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }

    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Adicione outras funções de controller aqui (ex: getUser, updateUser, etc.) 