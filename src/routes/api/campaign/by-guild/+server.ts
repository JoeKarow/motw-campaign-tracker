import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url, locals }) => {
	if (!locals.user) throw error(401, 'Unauthorized');

	const guildId = url.searchParams.get('guildId');

	const memberships = await prisma.campaignMember.findMany({
		where: {
			userId: locals.user.id,
			...(guildId ? { campaign: { discordGuildId: guildId } } : {})
		},
		include: {
			campaign: { select: { id: true, name: true, discordGuildId: true } }
		}
	});

	const campaigns = memberships.map((m) => ({
		id: m.campaign.id,
		name: m.campaign.name,
		userRole: m.role
	}));

	return json({ campaigns });
};
