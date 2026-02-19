import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const PATCH: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) throw error(401, 'Unauthorized');

	const { status } = await request.json();

	if (!['ALIVE', 'DEAD', 'MISSING', 'UNKNOWN'].includes(status)) {
		throw error(400, 'Invalid status');
	}

	const npc = await prisma.npc.update({
		where: { id: params.nid },
		data: { status }
	});

	return json({ npc });
};
