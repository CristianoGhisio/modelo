import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Função para criar um usuário
export const createUserController: RequestHandler = async (req, res) => {
  try {
    // A lógica de hash de senha deve ser adicionada aqui em um cenário real
    const newUser = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // "Unique constraint failed on the {constraint}"
      if (error.code === 'P2002') {
        res.status(409).json({ message: 'Email já cadastrado.' });
        return;
      }
    }
    // Para outros erros, retorna um erro de servidor genérico
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função para buscar todos os usuários
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuários.' });
  }
};

// Adicione outras funções de controller aqui (ex: getUser, updateUser, etc.) 
// Adicione outras funções de controller aqui (ex: getUser, updateUser, etc.) 