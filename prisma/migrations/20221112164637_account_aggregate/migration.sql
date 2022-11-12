/*
  Warnings:

  - You are about to drop the `Movements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Movements";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
