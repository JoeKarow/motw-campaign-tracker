import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';

export const load: PageServerLoad = async ({ params, locals }) => {
	await requireGM(locals.user?.id, params.id);

	const [invites, members] = await Promise.all([
		prisma.campaignInvite.findMany({
			where: { campaignId: params.id },
			orderBy: { createdAt: 'desc' }
		}),
		prisma.campaignMember.findMany({
			where: { campaignId: params.id },
			include: { user: { select: { id: true, name: true, image: true } } },
			orderBy: { joinedAt: 'asc' }
		})
	]);

	return { invites, members, campaignId: params.id };
};

export const actions: Actions = {
	createInvite: async ({ params, locals }) => {
		await requireGM(locals.user?.id, params.id);

		const invite = await prisma.campaignInvite.create({
			data: {
				campaignId: params.id,
				createdBy: locals.user!.id
			}
		});

		return { success: true, inviteCode: invite.code };
	},

	addByName: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);

		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();
		if (!name) return fail(400, { error: 'Name is required' });

		const user = await prisma.user.findFirst({
			where: { name: { equals: name, mode: 'insensitive' } }
		});

		if (!user) return fail(404, { error: 'User not found. They must log in at least once first.' });

		const existing = await prisma.campaignMember.findUnique({
			where: { userId_campaignId: { userId: user.id, campaignId: params.id } }
		});

		if (existing) return fail(400, { error: 'User is already a member' });

		await prisma.campaignMember.create({
			data: {
				userId: user.id,
				campaignId: params.id,
				role: 'PLAYER'
			}
		});

		return { success: true, addedName: user.name };
	},

	removeMember: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);

		const formData = await request.formData();
		const memberId = formData.get('memberId')?.toString();
		if (!memberId) return fail(400, { error: 'Member ID required' });

		const member = await prisma.campaignMember.findUnique({ where: { id: memberId } });
		if (!member) return fail(404, { error: 'Member not found' });
		if (member.role === 'GM') return fail(400, { error: 'Cannot remove the GM' });

		await prisma.campaignMember.delete({ where: { id: memberId } });

		return { success: true };
	}
};
