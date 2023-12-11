/*
  Warnings:

  - You are about to drop the column `favouriteId` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `seriesTagId` on the `TagResponse` table. All the data in the column will be lost.
  - You are about to alter the column `tagName` on the `TagResponse` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the `SeriesComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeriesTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coverImageUrl` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesId` to the `TagResponse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Series` DROP FOREIGN KEY `Series_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SeriesComments` DROP FOREIGN KEY `SeriesComments_seriesId_fkey`;

-- DropForeignKey
ALTER TABLE `SeriesComments` DROP FOREIGN KEY `SeriesComments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SeriesTags` DROP FOREIGN KEY `SeriesTags_seriesId_fkey`;

-- DropForeignKey
ALTER TABLE `TagResponse` DROP FOREIGN KEY `Tag_seriesTagId_fkey`;

-- AlterTable
ALTER TABLE `Chapter` ADD COLUMN `coverImageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Series` DROP COLUMN `favouriteId`,
    DROP COLUMN `userId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumbnailUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TagResponse` DROP COLUMN `seriesTagId`,
    ADD COLUMN `seriesId` VARCHAR(191) NOT NULL,
    MODIFY `tagName` ENUM('ACTION', 'ADVENTURE', 'CRIME') NOT NULL;

-- DropTable
DROP TABLE `SeriesComments`;

-- DropTable
DROP TABLE `SeriesTags`;

-- CreateTable
CREATE TABLE `Comment` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `commentText` VARCHAR(191) NOT NULL,
    `seriesId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Series` ADD CONSTRAINT `Series_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagResponse` ADD CONSTRAINT `Tag_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
