/*
  Warnings:

  - Added the required column `current_amount` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_customerId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "current_amount" INTEGER NOT NULL;
