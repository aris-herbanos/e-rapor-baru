import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  // =========================================================
  // PRISMA SCHEMA
  // =========================================================
  schema: "prisma/schema.prisma",

  // =========================================================
  // MIGRATIONS
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