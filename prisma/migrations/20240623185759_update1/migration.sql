-- AlterTable
ALTER TABLE `Commande` MODIFY `total` DECIMAL(9, 2) NULL,
    MODIFY `status` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Produit` MODIFY `photo` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(191) NULL,
    MODIFY `role` VARCHAR(191) NULL;
