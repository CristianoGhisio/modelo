import { Router } from 'express';
import { createUserController } from '../controllers/userController';

const router = Router();

// Define a rota para criar um novo usuário
// POST /api/users/
router.post('/', createUserController);

// Adicione outras rotas de usuário aqui (ex: GET /, GET /:id, etc.)

export default router; 