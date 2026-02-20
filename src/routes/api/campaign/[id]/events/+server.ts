import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { subscribe } from '$lib/server/events';

export const GET: RequestHandler = async ({ params, url }) => {
	const token = url.searchParams.get('token');
	if (!token) throw error(401, 'Missing token');

	// Validate session token (same pattern as hooks.server.ts Bearer auth)
	const dbSession = await prisma.session.findFirst({
		where: { token, expiresAt: { gt: new Date() } },
		include: { user: true }
	});
	if (!dbSession) throw error(401, 'Invalid token');

	// Verify user is a member of this campaign
	const member = await prisma.campaignMember.findFirst({
		where: { userId: dbSession.user.id, campaignId: params.id }
	});
	if (!member) throw error(403, 'Not a campaign member');

	const stream = subscribe(params.id);

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
			'X-Accel-Buffering': 'no'
		}
	});
};
