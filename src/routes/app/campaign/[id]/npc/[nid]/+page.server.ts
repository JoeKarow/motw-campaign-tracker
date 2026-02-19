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
			data: {
				name: formData.get('name')?.toString()?.trim() || undefined,
				description: formData.get('description')?.toString()?.trim() || null,
				notes: formData.get('notes')?.toString()?.trim() || null,
				status: formData.get('status')?.toString() as NpcStatus
			}
		});

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
