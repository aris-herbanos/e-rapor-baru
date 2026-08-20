import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Menjalankan database seed...");

  const hashedPassword = await bcrypt.hash("password", 10);

  const admin = await prisma.teacher.upsert({
    where: {
      identity_number: "987654321",
    },

    update: {
      fullname: "Administrator Utama",
      role: "ADMIN",
      password: hashedPassword,
    },

    create: {
      identity_number: "987654321",
      fullname: "Administrator Utama",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("========================================");
  console.log("✅ Seeder berhasil!");
  console.log("========================================");
  console.log("ID       :", admin.id);
  console.log("Nama     :", admin.fullname);
  console.log("NIP/NIK  :", admin.identity_number);
  console.log("Role     :", admin.role);
  console.log("Password : password");
  console.log("========================================");
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