/*
  Warnings:

  - You are about to drop the column `update_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Movements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Movements" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);
