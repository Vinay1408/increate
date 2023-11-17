/*
  Warnings:

  - You are about to drop the `_FavouriteSeries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_FavouriteSeries` DROP FOREIGN KEY `_FavouriteSeries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FavouriteSeries` DROP FOREIGN KEY `_FavouriteSeries_B_fkey`;

-- AlterTable
ALTER TABLE `Series` ADD COLUMN `favouriteId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_FavouriteSeries`;

-- CreateTable
CREATE TABLE `Favourite` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `seriesId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
