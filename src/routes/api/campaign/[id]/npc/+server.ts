import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';

export const GET: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) throw error(401, 'Unauthorized');
	await requireCampaignMember(locals.user.id, params.id);

	const npcs = await prisma.npc.findMany({
		where: { campaignId: params.id },
		orderBy: { name: 'asc' }
	});

	return json({ npcs });
};
