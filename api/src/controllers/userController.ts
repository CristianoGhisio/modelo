import { Request, Response, RequestHandler } from 'express';
import { createUserService } from '../services/userService';
import { Prisma } from '@prisma/client';

export const createUserController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    // Em um app real, você teria um log mais robusto aqui
    console.error('Erro ao criar usuário:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // P2002 é o código para violação de restrição única (unique constraint)
        res.status(409).json({ message: 'Este e-mail já está em uso.' });
        return; // Encerra a execução aqui
      }
    }

    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Adicione outras funções de controller aqui (ex: getUser, updateUser, etc.) 