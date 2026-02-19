import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { parseHunter } from '$lib/hunter-types';
import { hunterWithRelations } from '$lib/server/hunter-includes';

export const load: PageServerLoad = async ({ params }) => {
	const raw = await prisma.hunter.findUnique({
		where: { id: params.hid },
		include: hunterWithRelations
	});

	if (!raw) throw error(404, 'Hunter not found');

	return { hunter: parseHunter(raw), campaignId: params.campaignId };
};
