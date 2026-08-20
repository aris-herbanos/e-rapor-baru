import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Menjalankan database seeder...");

  const hashedPassword = await bcrypt.hash("password", 10);

  const admin = await prisma.teacher.upsert({
    where: {
      identity_number: "987654321",
    },

    update: {
      fullname: "Administrator Utama",
      password: hashedPassword,
      role: "ADMIN",
    },

    create: {
      identity_number: "987654321",
      fullname: "Administrator Utama",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Seeder berhasil!");
  console.log("👤 Admin:", admin.fullname);
  console.log("🆔 Identity Number:", admin.identity_number);
  console.log("🔐 Password: password");
}

main()
  .catch((error) => {
    console.error("❌ Seeder gagal:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });