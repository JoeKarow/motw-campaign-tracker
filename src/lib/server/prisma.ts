import { PrismaClient } from '$lib/generated/prisma/client';
import type { Hunter, Npc, Clue, Scene } from '$lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '$env/dynamic/private';
import { listenerExtensionConfig, prismaEventListener } from 'prisma-extension-emitter';
import { emit } from './events';

function createPrismaClient() {
	const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
	return new PrismaClient({ adapter }).$extends(listenerExtensionConfig({ emit: true }));
}

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as { prisma: ExtendedPrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// --- Listeners: emit SSE events when Prisma operations fire with `emit: true` ---

// Hunter update → SSE
prismaEventListener<Hunter>("hunter", {
	listener: async ({ result }) => {
		emit(result.campaignId, {
			type: 'hunter:updated',
			hunterId: result.id,
			data: {
				harm: result.harm,
				luck: result.luck,
				xp: result.xp,
				isUnstable: result.isUnstable,
				isDying: result.isDying
			}
		});
	}
});

// NPC status change → SSE (only when status field is in the update)
prismaEventListener<Npc>("npc", {
	data: { status: true },
	listener: async ({ result }) => {
		emit(result.campaignId, {
			type: 'npc:statusChanged',
			npcId: result.id,
			status: result.status
		});
	}
});

// Clue created → SSE (needs campaignId lookup via scene→session→mystery)
prismaEventListener<Clue>("clue", {
	listener: async ({ result }) => {
		const scene = await prisma.scene.findUnique({
			where: { id: result.sceneId },
			select: { session: { select: { mystery: { select: { campaignId: true } } } } }
		});
		if (scene) {
			emit(scene.session.mystery.campaignId, {
				type: 'clue:added',
				sceneId: result.sceneId,
				clue: { id: result.id, description: result.description, significance: result.significance }
			});
		}
	}
});

// Scene created → SSE (needs campaignId lookup via session→mystery)
prismaEventListener<Scene>("scene", {
	listener: async ({ result }) => {
		const session = await prisma.gameSession.findUnique({
			where: { id: result.sessionId },
			select: { mystery: { select: { campaignId: true } } }
		});
		if (session) {
			emit(session.mystery.campaignId, {
				type: 'scene:advanced',
				sessionId: result.sessionId,
				direction: 'new'
			});
		}
	}
});

declare global {
	namespace PrismaJson {
		type WeaponRanges = import('$lib/hunter-types').WeaponRange[];
		type GearTags = string[];
		type HunterImprovements = import('$lib/hunter-types').HunterImprovement[];
		type PlaybookFeatureEffects = import('$lib/hunter-types').PlaybookFeatureEffects;
	}
}
