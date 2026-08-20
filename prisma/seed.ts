import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
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
  console.log("========================================");
  console.log("Memulai Prisma Seeder...");
  console.log("========================================");

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

  console.log("");
  console.log("✓ Seeder berhasil");
  console.log("");
  console.log("Akun Administrator:");
  console.log("----------------------------------------");
  console.log("Nomor Identitas : 987654321");
  console.log("Password        : password");
  console.log("Nama            : Administrator Utama");
  console.log("Role            : ADMIN");
  console.log("----------------------------------------");
}

main()
  .catch((error) => {
    console.error("");
    console.error("✗ Seeder gagal:");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });