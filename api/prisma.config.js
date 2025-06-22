// Configuração do Prisma para referenciar a pasta database
const path = require('path');

module.exports = {
  schemaPath: path.join(__dirname, '../database/prisma/schema.prisma'),
  migrationPath: path.join(__dirname, '../database/prisma/migrations'),
}; 