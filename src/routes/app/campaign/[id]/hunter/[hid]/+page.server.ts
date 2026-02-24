import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';
import { parseHunter } from '$lib/hunter-types';
import { hunterWithRelations } from '$lib/server/hunter-includes';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { hunterFormSchema, type HunterFormData } from '$lib/schemas/hunter';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { role } = await requireCampaignMember(locals.user?.id, params.id);

	const raw = await prisma.hunter.findUnique({
		where: { id: params.hid },
		include: { user: true, ...hunterWithRelations }
	});

	if (!raw) throw error(404, 'Hunter not found');

	const canEdit = locals.user!.id === raw.userId || role === 'GM';
	const hunter = { ...parseHunter(raw), user: raw.user };

	const form = await superValidate(
		{
			name: hunter.name,
			playbook: hunter.playbook,
			look: hunter.look,
			charmBase: hunter.charmBase,
			coolBase: hunter.coolBase,
			sharpBase: hunter.sharpBase,
			toughBase: hunter.toughBase,
			weirdBase: hunter.weirdBase,
			charmMod: hunter.charmMod,
			coolMod: hunter.coolMod,
			sharpMod: hunter.sharpMod,
			toughMod: hunter.toughMod,
			weirdMod: hunter.weirdMod,
			harm: hunter.harm,
			luck: hunter.luck,
			xp: hunter.xp,
			moves: hunter.moves,
			gear: hunter.gear,
			bonds: hunter.bonds
		},
		zod4(hunterFormSchema)
	);

	return { hunter, canEdit, form };
};

export const actions: Actions = {
	update: async ({ request, params, locals }) => {
		const { role } = await requireCampaignMember(locals.user?.id, params.id);

		const hunter = await prisma.hunter.findUnique({ where: { id: params.hid } });
		if (!hunter) throw error(404, 'Hunter not found');
		if (locals.user!.id !== hunter.userId && role !== 'GM') {
			throw error(403, 'You can only edit your own hunter');
		}

		const form = await superValidate(request, zod4(hunterFormSchema));
		if (!form.valid) {
			return { form };
		}

		const data: HunterFormData = form.data;

		await prisma.$transaction([
			// Delete existing relational rows
			prisma.hunterMove.deleteMany({ where: { hunterId: params.hid } }),
			prisma.hunterGear.deleteMany({ where: { hunterId: params.hid } }),
			prisma.hunterBond.deleteMany({ where: { hunterId: params.hid } }),

			// Update hunter scalar fields + recreate relational rows
			prisma.hunter.update({
				where: { id: params.hid },
				emit: true,
				data: {
					name: data.name,
					playbook: data.playbook,
					look: data.look ?? null,
					charmBase: data.charmBase,
					coolBase: data.coolBase,
					sharpBase: data.sharpBase,
					toughBase: data.toughBase,
					weirdBase: data.weirdBase,
					charmMod: data.charmMod,
					coolMod: data.coolMod,
					sharpMod: data.sharpMod,
					toughMod: data.toughMod,
					weirdMod: data.weirdMod,
					harm: data.harm,
					luck: data.luck,
					xp: data.xp,
					moves: {
						create: data.moves.map((m, i) => ({
							name: m.name,
							description: m.description,
							rollType:
								(m.rollType as 'CHARM' | 'COOL' | 'SHARP' | 'TOUGH' | 'WEIRD' | undefined) ??
								undefined,
							isCustom: m.isCustom ?? false,
							order: i
						}))
					},
					gear: {
						create: data.gear.map((g, i) => ({
							kind: g.kind,
							name: g.name,
							harm: g.kind === 'weapon' ? (g.harm ?? null) : null,
							ranges: g.kind === 'weapon' ? (g.ranges ?? undefined) : undefined,
							tags: g.kind === 'weapon' ? (g.tags ?? undefined) : undefined,
							notes: g.kind === 'gear' ? (g.notes ?? null) : null,
							order: i
						}))
					},
					bonds: {
						create: data.bonds.map((b, i) => ({
							text: b.text,
							targetHunterId: b.targetHunterId ?? null,
							order: i
						}))
					}
				}
			})
		]);

		return { form };
	}
};
