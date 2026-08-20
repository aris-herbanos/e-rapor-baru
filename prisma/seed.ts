import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcrypt";

// =========================================================
// DATABASE CONNECTION
// =========================================================

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL tidak ditemukan. Pastikan file .env sudah berisi DATABASE_URL."
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// =========================================================
// SEED DATABASE
// =========================================================

async function main() {
  console.log("==============================================");
  console.log("🚀 Memulai proses seeding database...");
  console.log("==============================================");

  // =======================================================
  // PASSWORD ADMIN
  // =======================================================

  const hashedPassword = await bcrypt.hash("password", 10);

  // =======================================================
  // ADMIN / USTADZ
  // =======================================================

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
  console.log("✅ Admin berhasil dibuat / diperbarui");
  console.log("----------------------------------------------");
  console.log(`ID       : ${admin.id}`);
  console.log(`Nama     : ${admin.fullname}`);
  console.log(`NIP/NIK  : ${admin.identity_number}`);
  console.log(`Role     : ${admin.role}`);
  console.log("----------------------------------------------");

  console.log("");
  console.log("🎉 Seeder berhasil dijalankan!");
  console.log("");
  console.log("Login Admin:");
  console.log("Username/NIK : 987654321");
  console.log("Password     : password");
  console.log("");
}

// =========================================================
// EXECUTE SEED
// =========================================================

main()
  .catch((error) => {
    console.error("");
    console.error("❌ Seeder gagal dijalankan:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });