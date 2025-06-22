# API Advocacia - Backend

API RESTful para sistema de advocacia usando Node.js, Express, Prisma e PostgreSQL.

## 🚀 Setup e Instalação

### Pré-requisitos
- Node.js 18+
- Docker Desktop
- npm ou yarn

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados PostgreSQL

#### Subir PostgreSQL com Docker
```bash
# Subir containers (PostgreSQL + PgAdmin)
npm run docker:up

# Verificar logs do PostgreSQL
npm run docker:logs

# Parar containers
npm run docker:down
```

#### Acessos:
- **PostgreSQL**: `localhost:5432`
- **PgAdmin**: `http://localhost:8080`
  - Email: `admin@advocacia.com`
  - Senha: `admin123`

### 3. Configurar Prisma

#### Executar Migrations
```bash
# Gerar nova migration para PostgreSQL
npm run prisma:migrate

# Gerar Prisma Client
npx prisma generate
```

#### Popular Banco com Dados Iniciais
```bash
npm run seed
```

#### Visualizar Banco (Prisma Studio)
```bash
npm run prisma:studio
```

### 4. Executar API

#### Desenvolvimento
```bash
npm run dev
```

#### Produção
```bash
npm run build
npm start
```

## 📊 Configuração do Banco

### Variáveis de Ambiente (.env)
```env
DATABASE_URL="postgresql://advocacia_user:advocacia_password@localhost:5432/advocacia_db?schema=public"
```

### Credenciais PostgreSQL
- **Usuário**: `advocacia_user`
- **Senha**: `advocacia_password`
- **Database**: `advocacia_db`
- **Host**: `localhost`
- **Porta**: `5432`

## 🔧 Scripts Disponíveis

- `npm run dev` - Executar em modo desenvolvimento
- `npm run build` - Build para produção
- `npm start` - Executar versão de produção
- `npm run docker:up` - Subir containers Docker
- `npm run docker:down` - Parar containers Docker
- `npm run docker:logs` - Ver logs do PostgreSQL
- `npm run prisma:migrate` - Executar migrations
- `npm run prisma:studio` - Abrir Prisma Studio
- `npm run seed` - Popular banco com dados iniciais

## 📁 Estrutura do Projeto

```
api/
├── src/
│   ├── controllers/     # Controladores das rotas
│   ├── middlewares/     # Middlewares customizados
│   ├── routes/          # Definição das rotas
│   ├── services/        # Lógica de negócio
│   └── index.ts         # Arquivo principal
├── prisma/
│   ├── schema.prisma    # Schema do banco
│   ├── migrations/      # Migrations do Prisma
│   └── seed.ts          # Dados iniciais
├── docker-compose.yml   # Configuração Docker
├── .env                 # Variáveis de ambiente
└── package.json         # Dependências e scripts
```

## 🐳 Docker

O projeto usa Docker para o PostgreSQL. O `docker-compose.yml` inclui:
- **PostgreSQL 15**: Banco de dados principal
- **PgAdmin 4**: Interface visual para gerenciar o banco

## 🔄 Migração do SQLite

O projeto foi migrado do SQLite para PostgreSQL:
- ✅ Schema atualizado para PostgreSQL
- ✅ Docker configurado
- ✅ Variáveis de ambiente atualizadas
- ✅ Dependências atualizadas (pg ao invés de sqlite3)

## 🔐 Segurança

- Senhas são hasheadas com bcrypt
- JWT para autenticação
- CORS configurado
- Helmet para segurança HTTP
- Validação com Zod 