/*
  Warnings:

  - A unique constraint covering the columns `[gmailThreadId]` on the table `ContactMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gmailNotificationId]` on the table `ContactMessage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'REPLIED');

-- CreateEnum
CREATE TYPE "ContactReplyChannel" AS ENUM ('DASHBOARD', 'GMAIL');

-- CreateEnum
CREATE TYPE "ContactNotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "emailNotificationStatus" "ContactNotificationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "gmailNotificationId" TEXT,
ADD COLUMN     "gmailRfcMessageId" TEXT,
ADD COLUMN     "gmailSubject" TEXT,
ADD COLUMN     "gmailThreadId" TEXT,
ADD COLUMN     "status" "ContactMessageStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ContactReply" (
    "id" TEXT NOT NULL,
    "contactMessageId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "channel" "ContactReplyChannel" NOT NULL,
    "gmailMessageId" TEXT,
    "gmailRfcMessageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactReply_gmailMessageId_key" ON "ContactReply"("gmailMessageId");

-- CreateIndex
CREATE INDEX "ContactReply_contactMessageId_createdAt_idx" ON "ContactReply"("contactMessageId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ContactMessage_gmailThreadId_key" ON "ContactMessage"("gmailThreadId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactMessage_gmailNotificationId_key" ON "ContactMessage"("gmailNotificationId");

-- AddForeignKey
ALTER TABLE "ContactReply" ADD CONSTRAINT "ContactReply_contactMessageId_fkey" FOREIGN KEY ("contactMessageId") REFERENCES "ContactMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
