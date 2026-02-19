import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	const campaign = await prisma.campaign.findUnique({
		where: { id: params.id },
		include: {
			mysteries: { orderBy: { title: 'asc' } },
			npcs: { orderBy: { name: 'asc' } },
			hunters: { orderBy: { name: 'asc' } }
		}
	});

	if (!campaign) throw error(404, 'Campaign not found');

	return { campaign };
};
