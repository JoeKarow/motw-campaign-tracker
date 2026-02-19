import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const campaigns = await prisma.campaign.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			_count: {
				select: { mysteries: true, hunters: true, npcs: true }
			}
		}
	});

	return { campaigns };
};
