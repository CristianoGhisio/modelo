import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (email: string, pass: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = await bcrypt.compare(pass, user.password);

  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }

  // Criar o token JWT. Adicione uma chave secreta real em um arquivo .env
  const token = jwt.sign({ userId: user.id, name: user.name }, 'YOUR_SECRET_KEY', {
    expiresIn: '1h'
  });

  return { token, user: { id: user.id, name: user.name, email: user.email } };
}; 