/*
  Warnings:

  - Added the required column `branch_time` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_week` to the `branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `branch` ADD COLUMN `branch_time` DATETIME(3) NOT NULL,
    ADD COLUMN `branch_week` INTEGER NOT NULL;
