# 🏛️ Sistema de Advocacia

Sistema completo de gerenciamento para escritórios de advocacia, desenvolvido com tecnologias modernas e arquitetura robusta.

## 📋 Descrição

Este projeto é um sistema web completo para gerenciamento de escritórios de advocacia, oferecendo funcionalidades para controle de processos, clientes, documentos e rotinas administrativas. Desenvolvido com foco na eficiência, segurança e experiência do usuário.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com Server-Side Rendering
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP para requisições

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **TypeScript** - Tipagem estática
- **Prisma ORM** - Object-Relational Mapping
- **JWT** - Autenticação por tokens
- **bcrypt** - Criptografia de senhas

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização do banco
- **PgAdmin** - Interface de administração

### DevOps
- **Docker Compose** - Orquestração de containers
- **Git** - Controle de versão
- **GitHub** - Repositório remoto

## 📁 Estrutura do Projeto

```
advocacia01/
├── app/                    # Frontend (Next.js)
│   ├── public/            # Arquivos estáticos
│   └── src/               # Código fonte do frontend
│       ├── app/           # Pages e layouts (App Router)
│       ├── components/    # Componentes reutilizáveis
│       ├── contexts/      # Contextos React
│       └── hooks/         # Custom hooks
├── api/                   # Backend (Node.js + Express)
│   ├── src/              # Código fonte do backend
│   │   ├── controllers/  # Controladores das rotas
│   │   ├── middlewares/  # Middlewares personalizados
│   │   ├── routes/       # Definição das rotas
│   │   ├── services/     # Lógica de negócio
│   │   ├── types/        # Tipos TypeScript
│   │   └── utils/        # Utilitários
│   └── prisma.config.js  # Configuração do Prisma
├── database/             # Configurações do banco
│   ├── prisma/          # Schema e migrations
│   ├── docker-compose.yml # Docker Compose
│   └── init.sql         # Script de inicialização
└── userinput.py         # Script de input interativo
```

## 🔧 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Git**

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/CristianoGhisio/modelo.git
cd advocacia01
```

### 2. Instale as dependências do frontend
```bash
cd app
npm install
```

### 3. Instale as dependências do backend
```bash
cd ../api
npm install
```

### 4. Instale as dependências do database
```bash
cd ../database
npm install
```

## 🗄️ Configuração do Banco de Dados

### 1. Inicie os containers Docker
```bash
cd database
docker-compose up -d
```

### 2. Execute as migrações
```bash
npx prisma migrate dev
```

### 3. Execute o seed (dados iniciais)
```bash
npx prisma db seed
```

## 🔐 Credenciais de Acesso

### Usuário Admin do Sistema
- **Email**: admin@modelo.com
- **Senha**: admin123

### PostgreSQL
- **Host**: localhost
- **Porta**: 5432
- **Usuário**: advocacia_user
- **Senha**: advocacia_password
- **Database**: advocacia_db

### PgAdmin
- **URL**: http://localhost:8080
- **Email**: admin@advocacia.com
- **Senha**: admin123

## 🚀 Execução

### 1. Inicie o banco de dados
```bash
cd database
docker-compose up -d
```

### 2. Inicie o backend
```bash
cd api
npm run dev
```

### 3. Inicie o frontend
```bash
cd app
npm run dev
```

### 4. Acesse o sistema
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **PgAdmin**: http://localhost:8080

## ⚡ Scripts Disponíveis

### Frontend (app/)
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

### Backend (api/)
- `npm run dev` - Inicia o servidor com hot reload
- `npm run build` - Compila o TypeScript
- `npm run start` - Inicia servidor de produção
- `npm run test` - Executa testes

### Database (database/)
- `npm run db:migrate` - Executa migrações
- `npm run db:seed` - Popula banco com dados iniciais
- `npm run db:studio` - Abre Prisma Studio
- `npm run db:reset` - Reseta o banco de dados

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] Autenticação JWT
- [x] Gerenciamento de usuários
- [x] Dashboard administrativo
- [x] Banco PostgreSQL com Docker
- [x] Migrations e seeds
- [x] Estrutura de pastas organizada

### 🔄 Em Desenvolvimento
- [ ] Gerenciamento de clientes
- [ ] Controle de processos
- [ ] Upload de documentos
- [ ] Relatórios e dashboards
- [ ] Notificações
- [ ] Integração com APIs externas

## 🛠️ Desenvolvimento

### Padrões de Código
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **TypeScript** - Tipagem estática
- **Conventional Commits** - Padrão de commits

### Arquitetura
- **MVC** - Model-View-Controller no backend
- **Component-Based** - Arquitetura de componentes no frontend
- **RESTful API** - Padrão REST para APIs
- **Database First** - Schema-first com Prisma

### Testes
```bash
# Backend
cd api
npm run test

# Frontend
cd app
npm run test
```

## 🔒 Segurança

- **JWT** - Autenticação segura
- **bcrypt** - Hash de senhas
- **CORS** - Controle de acesso
- **Helmet** - Headers de segurança
- **Rate Limiting** - Limite de requisições

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 
\Add
some
AmazingFeature\')
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas:
- **Email**: suporte@advocacia.com
- **GitHub Issues**: [Criar issue](https://github.com/CristianoGhisio/modelo/issues)

## 🏆 Agradecimentos

- Equipe de desenvolvimento
- Comunidade open source
- Contribuidores do projeto

---

**Desenvolvido com ❤️ para modernizar a advocacia brasileira**
