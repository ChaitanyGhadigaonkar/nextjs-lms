/*
  Warnings:

  - You are about to drop the column `attachementId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attachmentId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attachmentId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Course_attachementId_key";

-- DropIndex
DROP INDEX "Course_creatorId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "attachementId",
ADD COLUMN     "attachmentId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_attachmentId_key" ON "Chapter"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_attachmentId_key" ON "Course"("attachmentId");
