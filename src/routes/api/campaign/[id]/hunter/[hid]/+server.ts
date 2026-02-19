import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const PATCH: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) throw error(401, 'Unauthorized');

	const updates = await request.json();

	// Only allow specific fields to be updated via Activity
	const allowed = ['harm', 'luck', 'xp'];
	const data: Record<string, number> = {};

	for (const key of allowed) {
		if (key in updates && typeof updates[key] === 'number') {
			data[key] = updates[key];
		}
	}

	const hunter = await prisma.hunter.update({
		where: { id: params.hid },
		data
	});

	return json({ hunter });
};
