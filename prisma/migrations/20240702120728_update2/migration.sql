/*
  Warnings:

  - You are about to drop the column `lasttname` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[num]` on the table `Commande` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Commande` ADD COLUMN `num` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `lasttname`,
    ADD COLUMN `lastname` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Commande_num_key` ON `Commande`(`num`);
