import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	const { role } = await requireCampaignMember(locals.user?.id, params.id);

	const campaign = await prisma.campaign.findUnique({
		where: { id: params.id },
		include: {
			mysteries: { orderBy: { title: 'asc' } },
			npcs: { orderBy: { name: 'asc' } },
			hunters: { orderBy: { name: 'asc' } }
		}
	});

	if (!campaign) throw error(404, 'Campaign not found');

	// Strip sensitive fields for players
	if (role === 'PLAYER') {
		campaign.mysteries = campaign.mysteries.map((m) => ({
			...m,
			monsterWeakness: null,
			howItWasKilled: null
		}));
		campaign.npcs = campaign.npcs.map((n) => ({
			...n,
			notes: null
		}));
	}

	return { campaign, userRole: role, userId: locals.user!.id };
};
