-- AlterTable
ALTER TABLE "Hunter" ADD COLUMN "isDraft" BOOLEAN NOT NULL DEFAULT false;

-- Data migration: convert existing playbook display names to IDs
UPDATE "Hunter" SET playbook = LOWER(REGEXP_REPLACE(playbook, '^The ', '', 'i'));
UPDATE "Hunter" SET playbook = 'hard-case' WHERE playbook = 'hard case';
UPDATE "Hunter" SET playbook = 'meddling-kid' WHERE playbook = 'meddling kid';
UPDATE "Hunter" SET playbook = 'spell-slinger' WHERE playbook = 'spell slinger';
