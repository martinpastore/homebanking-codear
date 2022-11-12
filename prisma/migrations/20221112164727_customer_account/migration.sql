/*
  Warnings:

  - You are about to drop the column `account_number` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `account_status` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "account_number",
DROP COLUMN "account_status";
