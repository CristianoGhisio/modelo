import { Router } from 'express';
import { loginController } from '../controllers/authController';
import { asyncHandlerWithLogging } from '../utils/asyncHandler';

const router = Router();

// 🔐 Rota de login com asyncHandler para resolver erro TS2769
router.post('/login', asyncHandlerWithLogging(loginController));

export default router; 