import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { userRole, userId } = await parent();

	const hunters = await prisma.hunter.findMany({
		where: { campaignId: params.id },
		orderBy: { name: 'asc' },
		include: {
			user: { select: { name: true } }
		}
	});

	return { hunters, campaignId: params.id, userRole, userId };
};
