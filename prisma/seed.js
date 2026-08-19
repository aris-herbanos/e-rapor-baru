require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
    await pool.end();
  });