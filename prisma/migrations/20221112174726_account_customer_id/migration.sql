/*
  Warnings:

  - You are about to drop the column `customerId` on the `Account` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "customerId",
ADD COLUMN     "customer_id" TEXT NOT NULL;
