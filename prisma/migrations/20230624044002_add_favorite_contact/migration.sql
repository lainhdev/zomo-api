/*
  Warnings:

  - A unique constraint covering the columns `[favoriteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteId" TEXT;

-- CreateTable
CREATE TABLE "FavoriteContact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteContact_id_key" ON "FavoriteContact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_favoriteId_key" ON "User"("favoriteId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "FavoriteContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteContact" ADD CONSTRAINT "FavoriteContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
