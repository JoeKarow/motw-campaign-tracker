import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const campaign = await prisma.campaign.findUnique({
		where: { id: params.campaignId },
		include: {
			hunters: { orderBy: { name: 'asc' } },
			npcs: { orderBy: { name: 'asc' } }
		}
	});

	return { campaign, campaignId: params.campaignId };
};
