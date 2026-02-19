import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const npcs = await prisma.npc.findMany({
		where: { campaignId: params.id },
		orderBy: { name: 'asc' },
		include: {
			_count: { select: { appearances: true, relationships: true } }
		}
	});

	return { npcs, campaignId: params.id };
};

export const actions: Actions = {
	create: async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();
		if (!name) return fail(400, { error: 'Name is required' });

		await prisma.npc.create({
			data: {
				name,
				description: formData.get('description')?.toString()?.trim() || null,
				campaignId: params.id
			}
		});

		return { success: true };
	}
};
