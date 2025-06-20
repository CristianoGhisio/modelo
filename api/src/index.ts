import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import authRoutes from './routes/authRoutes';
import { errorHandler, notFoundHandler, jsonErrorHandler } from './middlewares/errorHandler';
import { createAdminUser } from './services/authService';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();

// Middlewares essenciais
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet()); // Adiciona uma camada de segurança nos headers HTTP
app.use(morgan('dev')); // Loga as requisições no console em modo de desenvolvimento
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 🚨 Middleware de erro de JSON
app.use(jsonErrorHandler);

// 📊 Middleware de logging
app.use((req, res, next) => {
  console.log('📡 Incoming Request:', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// Rota principal da API
app.use('/api', apiRoutes);

// 💓 Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 🔐 Routes
app.use('/api/auth', authRoutes);

// 🔍 404 handler
app.use(notFoundHandler);

// 🚨 Global error handler (deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

// 🚀 Inicializar servidor
const startServer = async () => {
  try {
    console.log('🚀 Starting server...');
    
    // 👤 Criar usuário administrador
    const adminCreated = await createAdminUser();
    if (adminCreated) {
      console.log('✅ Admin user ready');
    }

    app.listen(PORT, () => {
      console.log('✅ Server running successfully:');
      console.log(`📡 API: http://localhost:${PORT}`);
      console.log(`💓 Health: http://localhost:${PORT}/health`);
      console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
      console.log('👤 Admin credentials: admin@modelo.com / admin123');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 