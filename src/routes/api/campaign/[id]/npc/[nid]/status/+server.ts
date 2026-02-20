import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';
export const PATCH: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) throw error(401, 'Unauthorized');
	await requireGM(locals.user.id, params.id);

	const { status } = await request.json();

	if (!['ALIVE', 'DEAD', 'MISSING', 'UNKNOWN'].includes(status)) {
		throw error(400, 'Invalid status');
	}

	const npc = await prisma.npc.update({
		where: { id: params.nid },
		data: { status },
		emit: true
	});

	return json({ npc });
};
