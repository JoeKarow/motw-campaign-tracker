import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) throw error(401, 'Unauthorized');

	const npcs = await prisma.npc.findMany({
		where: { campaignId: params.id },
		orderBy: { name: 'asc' }
	});

	return json({ npcs });
};
