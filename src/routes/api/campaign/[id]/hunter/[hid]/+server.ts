import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';
import { parseHunter } from '$lib/hunter-types';
import { hunterWithRelations } from '$lib/server/hunter-includes';
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
	const allowedNumeric = ['harm', 'luck', 'xp'];
	const allowedBoolean = ['isUnstable', 'isDying'];
	const data: Record<string, number | boolean> = {};

	for (const key of allowedNumeric) {
		if (key in updates && typeof updates[key] === 'number') {
			data[key] = updates[key];
		}
	}

	for (const key of allowedBoolean) {
		if (key in updates && typeof updates[key] === 'boolean') {
			data[key] = updates[key];
		}
	}

	const updated = await prisma.hunter.update({
		where: { id: params.hid },
		data,
		include: hunterWithRelations,
		emit: true
	});

	return json({ hunter: parseHunter(updated) });
};
