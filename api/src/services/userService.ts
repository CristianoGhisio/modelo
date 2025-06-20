import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUserService = async (userData: any) => {
  const { email, name, password } = userData;

  // Criptografa a senha antes de salvar
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // Remove a senha do objeto de usuário antes de retornar
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Adicione outras funções de serviço aqui (ex: findUser, updateUser, etc.) 