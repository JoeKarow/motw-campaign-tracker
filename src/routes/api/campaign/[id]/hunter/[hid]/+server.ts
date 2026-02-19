import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';

export const PATCH: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) throw error(401, 'Unauthorized');
	const { role } = await requireCampaignMember(locals.user.id, params.id);

	const hunter = await prisma.hunter.findUnique({ where: { id: params.hid } });
	if (!hunter) throw error(404, 'Hunter not found');

	if (locals.user.id !== hunter.userId && role !== 'GM') {
		throw error(403, 'You can only edit your own hunter');
	}

	const updates = await request.json();

	// Only allow specific fields to be updated via Activity
	const allowed = ['harm', 'luck', 'xp'];
	const data: Record<string, number> = {};

	for (const key of allowed) {
		if (key in updates && typeof updates[key] === 'number') {
			data[key] = updates[key];
		}
	}

	const updated = await prisma.hunter.update({
		where: { id: params.hid },
		data
	});

	return json({ hunter: updated });
};
