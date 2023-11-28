/*
  Warnings:

  - Added the required column `volumeId` to the `ReadingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReadingHistory` ADD COLUMN `volumeId` VARCHAR(191) NOT NULL;
