/*
  Warnings:

  - Added the required column `customer_id` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "account_number" INTEGER NOT NULL,
    "account_status" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "risk" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movements" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "customer_id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "Movements_pkey" PRIMARY KEY ("id")
);
