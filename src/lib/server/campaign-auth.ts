import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { CampaignRole } from '$lib/generated/prisma/client';

export async function requireCampaignMember(
	userId: string | undefined,
	campaignId: string
): Promise<{ role: CampaignRole; userId: string; campaignId: string }> {
	if (!userId) throw error(401, 'Unauthorized');

	const member = await prisma.campaignMember.findUnique({
		where: { userId_campaignId: { userId, campaignId } }
	});

	if (!member) throw error(403, 'You are not a member of this campaign');

	return { role: member.role, userId, campaignId };
}

export async function requireGM(
	userId: string | undefined,
	campaignId: string
): Promise<{ role: CampaignRole; userId: string; campaignId: string }> {
	const membership = await requireCampaignMember(userId, campaignId);

	if (membership.role !== 'GM') throw error(403, 'Only the GM can do this');

	return membership;
}
