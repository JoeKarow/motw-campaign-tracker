import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
	default: async ({ request, params }) => {
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
