/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `FavoriteContact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_favoriteId_fkey";

-- DropIndex
DROP INDEX "User_favoriteId_key";

-- AlterTable
ALTER TABLE "FavoriteContact" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoriteId";

-- AddForeignKey
ALTER TABLE "FavoriteContact" ADD CONSTRAINT "FavoriteContact_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
