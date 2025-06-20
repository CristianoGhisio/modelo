import { Router } from 'express';
import { createUserController, getAllUsers } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// A rota para criar um usuário não deve ser protegida, para permitir o cadastro
router.post('/', createUserController);

// A rota para obter todos os usuários agora está protegida pelo middleware
router.get('/', authenticateToken, getAllUsers);

export default router;