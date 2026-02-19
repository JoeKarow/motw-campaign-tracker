import { error, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) throw redirect(303, '/');

	const invite = await prisma.campaignInvite.findUnique({
		where: { code: params.code },
		include: { campaign: { select: { id: true, name: true } } }
	});

	if (!invite) throw error(404, 'Invite not found');

	if (invite.expiresAt && invite.expiresAt < new Date()) {
		throw error(410, 'This invite has expired');
	}

	if (invite.maxUses && invite.uses >= invite.maxUses) {
		throw error(410, 'This invite has reached its maximum uses');
	}

	// Check if already a member
	const existing = await prisma.campaignMember.findUnique({
		where: {
			userId_campaignId: { userId: locals.user.id, campaignId: invite.campaignId }
		}
	});

	if (existing) {
		throw redirect(303, `/app/campaign/${invite.campaignId}`);
	}

	return { campaignName: invite.campaign.name, code: params.code };
};

export const actions: Actions = {
	join: async ({ params, locals }) => {
		if (!locals.user) throw error(401, 'Unauthorized');

		const invite = await prisma.campaignInvite.findUnique({
			where: { code: params.code }
		});

		if (!invite) throw error(404, 'Invite not found');

		if (invite.expiresAt && invite.expiresAt < new Date()) {
			return fail(410, { error: 'This invite has expired' });
		}

		if (invite.maxUses && invite.uses >= invite.maxUses) {
			return fail(410, { error: 'This invite has reached its maximum uses' });
		}

		// Check if already a member
		const existing = await prisma.campaignMember.findUnique({
			where: {
				userId_campaignId: { userId: locals.user.id, campaignId: invite.campaignId }
			}
		});

		if (existing) {
			throw redirect(303, `/app/campaign/${invite.campaignId}`);
		}

		await prisma.$transaction([
			prisma.campaignMember.create({
				data: {
					userId: locals.user.id,
					campaignId: invite.campaignId,
					role: 'PLAYER'
				}
			}),
			prisma.campaignInvite.update({
				where: { id: invite.id },
				data: { uses: { increment: 1 } }
			})
		]);

		throw redirect(303, `/app/campaign/${invite.campaignId}`);
	}
};
