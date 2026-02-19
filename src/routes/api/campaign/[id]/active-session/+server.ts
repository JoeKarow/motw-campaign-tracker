import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';

export const GET: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) throw error(401, 'Unauthorized');
	await requireCampaignMember(locals.user.id, params.id);

	const session = await prisma.gameSession.findFirst({
		where: {
			isActive: true,
			mystery: { campaignId: params.id }
		},
		include: {
			mystery: true,
			scenes: {
				orderBy: { order: 'asc' },
				include: { clues: { orderBy: { createdAt: 'asc' } } }
			},
			attendees: { include: { hunter: true } },
			npcAppearances: { include: { npc: true } }
		}
	});

	return json({ session });
};
