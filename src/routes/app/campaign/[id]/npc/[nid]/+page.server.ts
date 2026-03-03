import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';
import type { NpcStatus } from '$lib/generated/prisma/enums';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { campaign } = await parent();

	const npc = await prisma.npc.findUnique({
		where: { id: params.nid },
		include: {
			details: { orderBy: { order: 'asc' } },
			relationships: { include: { object: true } },
			relatedTo: { include: { subject: true } },
			appearances: {
				include: {
					session: { include: { mystery: true } }
				}
			}
		}
	});

	if (!npc) throw error(404, 'NPC not found');

	const otherNpcs = campaign.npcs.filter((n) => n.id !== npc.id);

	return { npc, otherNpcs };
};

export const actions: Actions = {
	update: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();

		await prisma.npc.update({
			where: { id: params.nid },
			emit: true,
			data: {
				name: formData.get('name')?.toString()?.trim() || undefined,
				status: formData.get('status')?.toString() as NpcStatus
			}
		});

		return { success: true };
	},

	addDetail: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const kind = formData.get('kind')?.toString();
		const text = formData.get('text')?.toString()?.trim();
		if (!kind || !text) return fail(400, { error: 'Kind and text are required' });
		if (kind !== 'DESCRIPTION' && kind !== 'NOTE') return fail(400, { error: 'Invalid kind' });

		const maxOrder = await prisma.npcDetail.aggregate({
			where: { npcId: params.nid, kind },
			_max: { order: true }
		});

		await prisma.npcDetail.create({
			data: {
				npcId: params.nid,
				kind,
				text,
				order: (maxOrder._max.order ?? -1) + 1
			}
		});

		return { success: true };
	},

	updateDetail: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const detailId = formData.get('detailId')?.toString();
		const text = formData.get('text')?.toString()?.trim();
		if (!detailId || !text) return fail(400, { error: 'Detail ID and text are required' });

		await prisma.npcDetail.update({
			where: { id: detailId },
			data: { text }
		});

		return { success: true };
	},

	removeDetail: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const detailId = formData.get('detailId')?.toString();
		if (!detailId) return fail(400, { error: 'Detail ID required' });

		await prisma.npcDetail.delete({ where: { id: detailId } });

		return { success: true };
	},

	addRelationship: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const label = formData.get('label')?.toString()?.trim();
		const objectId = formData.get('objectId')?.toString();
		if (!label || !objectId) return fail(400, { error: 'Label and target NPC required' });

		await prisma.npcRelationship.create({
			data: {
				label,
				subjectId: params.nid,
				objectId
			}
		});

		return { success: true };
	},

	removeRelationship: async ({ request, params, locals }) => {
		await requireGM(locals.user?.id, params.id);
		const formData = await request.formData();
		const relationshipId = formData.get('relationshipId')?.toString();
		if (!relationshipId) return fail(400, { error: 'Relationship ID required' });

		await prisma.npcRelationship.delete({ where: { id: relationshipId } });

		return { success: true };
	}
};
