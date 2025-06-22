import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@modelo.com';
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Administrador',
        password: hashedPassword,
      },
    });
    console.log(`Usuário Administrador criado: ${admin.email}`);
  } else {
    console.log(`Usuário Administrador já existe: ${admin.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 