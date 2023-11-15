-- CreateTable
CREATE TABLE "Ola" (
    "id" BIGSERIAL NOT NULL,
    "userDocument" TEXT NOT NULL,
    "creditCardToken" TEXT NOT NULL,
    "value" BIGINT NOT NULL,

    CONSTRAINT "Ola_pkey" PRIMARY KEY ("id")
);
