-- CreateEnum
CREATE TYPE "NpcDetailKind" AS ENUM ('DESCRIPTION', 'NOTE');

-- CreateTable
CREATE TABLE "NpcDetail" (
    "id" TEXT NOT NULL,
    "npcId" TEXT NOT NULL,
    "kind" "NpcDetailKind" NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "NpcDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NpcDetail" ADD CONSTRAINT "NpcDetail_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- MigrateData: Move existing description/notes into NpcDetail rows
INSERT INTO "NpcDetail" (id, "npcId", kind, text, "order")
SELECT 'c' || substr(md5(random()::text || clock_timestamp()::text), 1, 24),
       id, 'DESCRIPTION', description, 0
FROM "Npc" WHERE description IS NOT NULL AND TRIM(description) != '';

INSERT INTO "NpcDetail" (id, "npcId", kind, text, "order")
SELECT 'c' || substr(md5(random()::text || clock_timestamp()::text), 1, 24),
       id, 'NOTE', notes, 0
FROM "Npc" WHERE notes IS NOT NULL AND TRIM(notes) != '';

-- AlterTable: Drop old columns
ALTER TABLE "Npc" DROP COLUMN "description",
DROP COLUMN "notes";
