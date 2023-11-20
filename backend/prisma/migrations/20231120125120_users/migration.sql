/*
  Warnings:

  - You are about to drop the `Ola` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ola";

-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "userDocument" TEXT NOT NULL,
    "creditCardToken" TEXT NOT NULL,
    "value" BIGINT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
