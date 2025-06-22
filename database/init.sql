-- Inicialização do banco PostgreSQL para Advocacia
-- Este arquivo é executado automaticamente quando o container é criado

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Configurar timezone
SET timezone = 'America/Sao_Paulo';

-- Criar schema public se não existir (já existe por padrão)
CREATE SCHEMA IF NOT EXISTS public;

-- Comentário sobre o banco
COMMENT ON DATABASE advocacia_db IS 'Banco de dados para sistema de advocacia';

-- Log de inicialização
DO $$
BEGIN
    RAISE NOTICE 'Banco advocacia_db inicializado com sucesso!';
    RAISE NOTICE 'Timezone configurado para America/Sao_Paulo';
    RAISE NOTICE 'Extensões uuid-ossp e pgcrypto carregadas';
END $$; 