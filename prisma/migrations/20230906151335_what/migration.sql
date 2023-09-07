/*
  Warnings:

  - You are about to alter the column `branch_name` on the `Branch` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Branch` MODIFY `branch_name` VARCHAR(191) NOT NULL,
    MODIFY `branch_time` DATETIME(3) NOT NULL;
