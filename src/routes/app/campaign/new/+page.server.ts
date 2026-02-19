import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'Unauthorized' });

		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();

		if (!name) return fail(400, { error: 'Name is required' });

		const campaign = await prisma.campaign.create({
			data: {
				name,
				members: {
					create: { userId: locals.user.id, role: 'GM' }
				}
			}
		});

		throw redirect(303, `/app/campaign/${campaign.id}`);
	}
};
