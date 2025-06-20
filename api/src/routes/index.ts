import { Router } from 'express';

const router = Router();

// Exemplo de rota de sa?de
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
