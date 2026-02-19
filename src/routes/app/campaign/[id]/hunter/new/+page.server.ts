import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';

export const load: PageServerLoad = async ({ params, locals }) => {
	await requireCampaignMember(locals.user?.id, params.id);

	const existingHunter = await prisma.hunter.findFirst({
		where: { userId: locals.user!.id, campaignId: params.id }
	});

	if (existingHunter) {
		throw redirect(303, `/app/campaign/${params.id}/hunter/${existingHunter.id}`);
	}

	return { campaignId: params.id };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		await requireCampaignMember(locals.user?.id, params.id);

		const existingHunter = await prisma.hunter.findFirst({
			where: { userId: locals.user!.id, campaignId: params.id }
		});

		if (existingHunter) {
			throw redirect(303, `/app/campaign/${params.id}/hunter/${existingHunter.id}`);
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();
		const playbook = formData.get('playbook')?.toString()?.trim();
		const look = formData.get('look')?.toString()?.trim() || null;

		if (!name) return fail(400, { error: 'Name is required' });
		if (!playbook) return fail(400, { error: 'Playbook is required' });

		const hunter = await prisma.hunter.create({
			data: {
				name,
				playbook,
				look,
				userId: locals.user!.id,
				campaignId: params.id
			}
		});

		throw redirect(303, `/app/campaign/${params.id}/hunter/${hunter.id}`);
	}
};
