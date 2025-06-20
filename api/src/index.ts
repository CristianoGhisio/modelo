import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();

// Middlewares essenciais
app.use(cors()); // Permite requisições de outros domínios (seu frontend)
app.use(helmet()); // Adiciona uma camada de segurança nos headers HTTP
app.use(morgan('dev')); // Loga as requisições no console em modo de desenvolvimento
app.use(express.json()); // Permite que o Express entenda requisições com corpo em JSON

// Rota principal da API
app.use('/api', apiRoutes);

// Rota de health check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 