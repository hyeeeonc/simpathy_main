/*
  Warnings:

  - You are about to drop the `branch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `branch`;

-- CreateTable
CREATE TABLE `Branch` (
    `branch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_name` VARCHAR(255) NOT NULL,
    `branch_week` INTEGER NOT NULL,

    PRIMARY KEY (`branch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
