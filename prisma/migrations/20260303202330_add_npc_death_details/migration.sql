-- CreateEnum
CREATE TYPE "NpcKilledByType" AS ENUM ('HUNTER', 'NPC', 'MONSTER', 'ENVIRONMENT', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Npc" ADD COLUMN     "causeOfDeath" TEXT,
ADD COLUMN     "killedByHunterId" TEXT,
ADD COLUMN     "killedByName" TEXT,
ADD COLUMN     "killedByNpcId" TEXT,
ADD COLUMN     "killedByType" "NpcKilledByType";

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_killedByHunterId_fkey" FOREIGN KEY ("killedByHunterId") REFERENCES "Hunter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_killedByNpcId_fkey" FOREIGN KEY ("killedByNpcId") REFERENCES "Npc"("id") ON DELETE SET NULL ON UPDATE CASCADE;
