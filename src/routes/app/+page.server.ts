import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const campaigns = await prisma.campaign.findMany({
		where: { members: { some: { userId: locals.user!.id } } },
		orderBy: { createdAt: 'desc' },
		include: {
			_count: {
				select: { mysteries: true, hunters: true, npcs: true }
			},
			members: {
				where: { userId: locals.user!.id },
				select: { role: true }
			}
		}
	});

	return {
		campaigns: campaigns.map((c) => ({
			...c,
			userRole: c.members[0]?.role ?? null,
			members: undefined
		}))
	};
};
