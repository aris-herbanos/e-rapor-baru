/*
  Warnings:

  - You are about to drop the column `subjectId` on the `TP` table. All the data in the column will be lost.
  - Added the required column `code` to the `TP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpId` to the `TP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TP" DROP CONSTRAINT "TP_subjectId_fkey";

-- AlterTable
ALTER TABLE "TP" DROP COLUMN "subjectId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "cpId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CP" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "CP_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CP" ADD CONSTRAINT "CP_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TP" ADD CONSTRAINT "TP_cpId_fkey" FOREIGN KEY ("cpId") REFERENCES "CP"("id") ON DELETE CASCADE ON UPDATE CASCADE;
