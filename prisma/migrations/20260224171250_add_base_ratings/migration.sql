-- AlterTable: add base rating columns
ALTER TABLE "Hunter" ADD COLUMN "charmBase" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Hunter" ADD COLUMN "coolBase" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Hunter" ADD COLUMN "sharpBase" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Hunter" ADD COLUMN "toughBase" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Hunter" ADD COLUMN "weirdBase" INTEGER NOT NULL DEFAULT 0;

-- Copy current mod values into base columns (they represent total stats, not modifiers)
UPDATE "Hunter" SET
  "charmBase" = "charmMod",
  "coolBase" = "coolMod",
  "sharpBase" = "sharpMod",
  "toughBase" = "toughMod",
  "weirdBase" = "weirdMod";

-- Reset mod columns to 0 (no modifications yet)
UPDATE "Hunter" SET
  "charmMod" = 0,
  "coolMod" = 0,
  "sharpMod" = 0,
  "toughMod" = 0,
  "weirdMod" = 0;

-- Drop unused ratingsLine column
ALTER TABLE "Hunter" DROP COLUMN "ratingsLine";
