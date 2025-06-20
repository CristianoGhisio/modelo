import { Router } from 'express';
import userRoutes from './userRoutes'; // Importa as rotas de usuário
import authRoutes from './authRoutes'; // Importa as rotas de autenticação

const router = Router();

// Rota de saúde para verificar se a API está no ar
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Agrupa as rotas de usuários sob o prefixo /users
router.use('/users', userRoutes);
router.use('/auth', authRoutes); // Usa as rotas de autenticação no caminho /auth

export default router; 