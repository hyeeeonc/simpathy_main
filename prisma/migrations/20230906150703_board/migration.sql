/*
  Warnings:

  - Added the required column `branch_time` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Branch` ADD COLUMN `branch_time` DATETIME NOT NULL;
