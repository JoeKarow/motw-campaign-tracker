import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params, url }) => {
	await requireGM(locals.user?.id, params.id);

	const q = url.searchParams.get('q') || '';
	if (q.length < 2) return json({ users: [] });

	const existingMemberIds = (
		await prisma.campaignMember.findMany({
			where: { campaignId: params.id },
			select: { userId: true }
		})
	).map((m) => m.userId);

	const users = await prisma.user.findMany({
		where: {
			name: { contains: q, mode: 'insensitive' },
			id: { notIn: existingMemberIds }
		},
		take: 10,
		select: { id: true, name: true, image: true }
	});

	return json({ users });
};
