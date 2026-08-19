import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  // =========================================================
  // SCHEMA PRISMA
  // =========================================================
  schema: "prisma/schema.prisma",

  // =========================================================
  // MIGRATION & SEED
  // =========================================================
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  // =========================================================
  // DATABASE
  // =========================================================
  datasource: {
    url: env("DATABASE_URL"),
  },
});