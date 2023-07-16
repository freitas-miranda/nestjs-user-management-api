/*
  Warnings:

  - You are about to drop the column `senha` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `senhaHash` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senhaSalt` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `senha`,
    ADD COLUMN `senhaHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `senhaSalt` VARCHAR(191) NOT NULL;
