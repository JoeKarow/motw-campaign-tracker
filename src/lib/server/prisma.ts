import { PrismaClient } from '$lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '$env/dynamic/private';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
	const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
	return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

declare global {
	namespace PrismaJson {
		type WeaponRanges = import('$lib/hunter-types').WeaponRange[];
		type GearTags = string[];
		type HunterImprovements = import('$lib/hunter-types').HunterImprovement[];
		type PlaybookFeatureEffects = import('$lib/hunter-types').PlaybookFeatureEffects;
	}
}
