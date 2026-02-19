import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const hunter = await prisma.hunter.findUnique({
		where: { id: params.hid }
	});

	if (!hunter) throw error(404, 'Hunter not found');

	return { hunter, campaignId: params.campaignId };
};
