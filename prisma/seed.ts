import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);

  const admin = await prisma.teacher.upsert({
    where: { identity_number: '987654321' },
    update: {},
    create: {
      identity_number: '987654321',
      fullname: 'Administrator Utama',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Seeder berhasil! Akun admin dibuat:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });