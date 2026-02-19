import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const title = formData.get('title')?.toString()?.trim();
		const monsterType = formData.get('monsterType')?.toString()?.trim() || null;
		const location = formData.get('location')?.toString()?.trim() || null;

		if (!title) return fail(400, { error: 'Title is required' });

		const mystery = await prisma.mystery.create({
			data: {
				title,
				monsterType,
				location,
				campaignId: params.id
			}
		});

		throw redirect(303, `/app/campaign/${params.id}/mystery/${mystery.id}`);
	}
};
