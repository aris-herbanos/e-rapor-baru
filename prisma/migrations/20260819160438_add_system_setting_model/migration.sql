-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" SERIAL NOT NULL,
    "schoolName" TEXT NOT NULL DEFAULT 'Pondok Pesantren Terpadu Ulul Albab',
    "academicYear" TEXT NOT NULL DEFAULT '2026/2027',
    "semester" TEXT NOT NULL DEFAULT 'Ganjil',
    "principalName" TEXT NOT NULL DEFAULT 'Pimpinan Pesantren',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);
