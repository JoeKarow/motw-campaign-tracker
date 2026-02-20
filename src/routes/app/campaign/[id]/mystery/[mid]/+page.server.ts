import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { campaign } = await parent();

	const mystery = await prisma.mystery.findUnique({
		where: { id: params.mid },
		include: {
			sessions: {
				orderBy: { date: 'desc' },
				include: {
					scenes: {
						orderBy: { order: 'asc' },
						include: { clues: { orderBy: { createdAt: 'asc' } } }
					},
					attendees: { include: { hunter: true } },
					npcAppearances: { include: { npc: true } }
				}
			}
		}
	});

	if (!mystery) throw error(404, 'Mystery not found');

	return { mystery, hunters: campaign.hunters, npcs: campaign.npcs };
};

export const actions: Actions = {
	updateStatus: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const status = formData.get('status')?.toString() as 'ACTIVE' | 'RESOLVED' | 'ABANDONED';
		const monsterWeakness = formData.get('monsterWeakness')?.toString()?.trim() || null;
		const howItWasKilled = formData.get('howItWasKilled')?.toString()?.trim() || null;

		await prisma.mystery.update({
			where: { id: params.mid },
			data: { status, monsterWeakness, howItWasKilled }
		});

		return { success: true };
	},

	createSession: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const title = formData.get('title')?.toString()?.trim();
		if (!title) return fail(400, { error: 'Session title is required' });

		await prisma.gameSession.create({
			data: {
				title,
				mysteryId: params.mid
			}
		});

		return { success: true };
	},

	updateSession: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const sessionId = formData.get('sessionId')?.toString();
		const summary = formData.get('summary')?.toString()?.trim() || null;
		const isActive = formData.get('isActive') === 'true';

		if (!sessionId) return fail(400, { error: 'Session ID required' });

		// If marking active, deactivate all other sessions first
		if (isActive) {
			await prisma.gameSession.updateMany({
				where: { mystery: { campaignId: formData.get('campaignId')?.toString() ?? '' } },
				data: { isActive: false }
			});
		}

		await prisma.gameSession.update({
			where: { id: sessionId },
			data: { summary, isActive }
		});

		return { success: true };
	},

	addScene: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const sessionId = formData.get('sessionId')?.toString();
		const title = formData.get('title')?.toString()?.trim();
		if (!sessionId || !title) return fail(400, { error: 'Session ID and title required' });

		const lastScene = await prisma.scene.findFirst({
			where: { sessionId },
			orderBy: { order: 'desc' }
		});

		await prisma.scene.create({
			emit: true,
			data: {
				title,
				description: formData.get('description')?.toString()?.trim() || null,
				order: (lastScene?.order ?? 0) + 1,
				sessionId
			}
		});

		return { success: true };
	},

	addClue: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const sceneId = formData.get('sceneId')?.toString();
		const description = formData.get('description')?.toString()?.trim();
		if (!sceneId || !description) return fail(400, { error: 'Scene ID and description required' });

		await prisma.clue.create({
			emit: true,
			data: {
				description,
				significance: formData.get('significance')?.toString()?.trim() || null,
				sceneId
			}
		});

		return { success: true };
	},

	toggleAttendance: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const sessionId = formData.get('sessionId')?.toString()!;
		const hunterId = formData.get('hunterId')?.toString()!;

		const existing = await prisma.sessionAttendance.findUnique({
			where: { sessionId_hunterId: { sessionId, hunterId } }
		});

		if (existing) {
			await prisma.sessionAttendance.delete({ where: { id: existing.id } });
		} else {
			await prisma.sessionAttendance.create({ data: { sessionId, hunterId } });
		}

		return { success: true };
	},

	toggleNpcAppearance: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const sessionId = formData.get('sessionId')?.toString()!;
		const npcId = formData.get('npcId')?.toString()!;

		const existing = await prisma.npcAppearance.findUnique({
			where: { npcId_sessionId: { npcId, sessionId } }
		});

		if (existing) {
			await prisma.npcAppearance.delete({ where: { id: existing.id } });
		} else {
			await prisma.npcAppearance.create({ data: { npcId, sessionId } });
		}

		return { success: true };
	}
};
