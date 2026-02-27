import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireCampaignMember } from '$lib/server/campaign-auth';
import { hunterWithRelations } from '$lib/server/hunter-includes';
import { parseHunter } from '$lib/hunter-types';
import { getPlaybook } from '$lib/playbooks/index';
import type { WeaponRange } from '$lib/hunter-types';

export const load: PageServerLoad = async ({ params, locals }) => {
	await requireCampaignMember(locals.user?.id, params.id);

	const existingHunter = await prisma.hunter.findFirst({
		where: { userId: locals.user!.id, campaignId: params.id },
		include: hunterWithRelations,
	});

	// If finalized hunter exists, redirect to their page
	if (existingHunter && !existingHunter.isDraft) {
		throw redirect(303, `/app/campaign/${params.id}/hunter/${existingHunter.id}`);
	}

	// Get all campaign hunters for bond target dropdown
	const campaignHunters = await prisma.hunter.findMany({
		where: { campaignId: params.id, userId: { not: locals.user!.id } },
		select: { id: true, name: true, isDraft: true },
		orderBy: { name: 'asc' },
	});

	return {
		campaignId: params.id,
		draft: existingHunter ? parseHunter(existingHunter) : null,
		campaignHunters,
	};
};

export const actions: Actions = {
	createDraft: async ({ request, params, locals }) => {
		await requireCampaignMember(locals.user?.id, params.id);

		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();
		const playbookId = formData.get('playbookId')?.toString()?.trim();

		if (!name) return fail(400, { error: 'Name is required' });
		if (!playbookId) return fail(400, { error: 'Playbook is required' });

		const playbook = getPlaybook(playbookId);
		if (!playbook) return fail(400, { error: 'Invalid playbook' });

		// Check for existing hunter
		const existing = await prisma.hunter.findFirst({
			where: { userId: locals.user!.id, campaignId: params.id },
		});
		if (existing) return fail(400, { error: 'You already have a hunter in this campaign' });

		const pronouns = formData.get('pronouns')?.toString()?.trim() || null;
		const look = formData.get('look')?.toString()?.trim() || null;

		const hunter = await prisma.hunter.create({
			data: {
				name,
				playbook: playbookId,
				pronouns,
				look,
				isDraft: true,
				harmMax: playbook.harmBoxes ?? 7,
				luckSpecial: playbook.luckSpecial,
				userId: locals.user!.id,
				campaignId: params.id,
			},
		});

		return { hunterId: hunter.id };
	},

	saveStep: async ({ request, params, locals }) => {
		await requireCampaignMember(locals.user?.id, params.id);

		const formData = await request.formData();
		const hunterId = formData.get('hunterId')?.toString();
		const stepId = formData.get('stepId')?.toString();

		if (!hunterId || !stepId) return fail(400, { error: 'Missing required fields' });

		const hunter = await prisma.hunter.findUnique({ where: { id: hunterId } });
		if (!hunter || hunter.userId !== locals.user!.id) {
			return fail(403, { error: 'Not your hunter' });
		}

		switch (stepId) {
			case 'identity': {
				const name = formData.get('name')?.toString()?.trim();
				const pronouns = formData.get('pronouns')?.toString()?.trim() || null;
				const look = formData.get('look')?.toString()?.trim() || null;
				if (!name) return fail(400, { error: 'Name is required' });

				await prisma.hunter.update({
					where: { id: hunterId },
					data: { name, pronouns, look },
				});
				break;
			}

			case 'moves': {
				const movesJson = formData.get('moves')?.toString();
				if (!movesJson) return fail(400, { error: 'Moves data required' });

				const playbook = getPlaybook(hunter.playbook);
				if (!playbook) return fail(400, { error: 'Invalid playbook' });

				const moveNames: string[] = JSON.parse(movesJson);
				const allMoves = [...playbook.mandatoryMoves, ...playbook.optionalMoves];
				const movesToCreate = moveNames
					.map((name) => allMoves.find((m) => m.name === name))
					.filter(Boolean);

				await prisma.$transaction([
					prisma.hunterMove.deleteMany({ where: { hunterId } }),
					...movesToCreate.map((m, i) =>
						prisma.hunterMove.create({
							data: {
								hunterId,
								name: m!.name,
								description: m!.description,
								rollType: m!.rollType ?? undefined,
								order: i,
							},
						})
					),
				]);
				break;
			}

			case 'ratings': {
				const lineIndex = parseInt(formData.get('ratingsLineIndex')?.toString() ?? '');
				if (isNaN(lineIndex)) return fail(400, { error: 'Ratings line required' });

				const playbook = getPlaybook(hunter.playbook);
				if (!playbook) return fail(400, { error: 'Invalid playbook' });

				const line = playbook.ratingLines[lineIndex];
				if (!line) return fail(400, { error: 'Invalid ratings line' });

				await prisma.hunter.update({
					where: { id: hunterId },
					data: {
						charmBase: line.charm,
						coolBase: line.cool,
						sharpBase: line.sharp,
						toughBase: line.tough,
						weirdBase: line.weird,
					},
				});
				break;
			}

			case 'gear': {
				const gearJson = formData.get('gear')?.toString();
				if (!gearJson) return fail(400, { error: 'Gear data required' });

				const gearItems: Array<{
					name: string;
					kind: 'weapon' | 'gear';
					harm?: number;
					ranges?: string[];
					tags?: string[];
				}> = JSON.parse(gearJson);

				await prisma.$transaction([
					prisma.hunterGear.deleteMany({ where: { hunterId } }),
					...gearItems.map((g, i) =>
						prisma.hunterGear.create({
							data: {
								hunterId,
								kind: g.kind,
								name: g.name,
								harm: g.kind === 'weapon' ? (g.harm ?? null) : null,
								ranges: g.kind === 'weapon' ? ((g.ranges ?? []) as WeaponRange[]) : undefined,
								tags: g.kind === 'weapon' ? (g.tags ?? []) : undefined,
								order: i,
							},
						})
					),
				]);
				break;
			}

			case 'specials': {
				const featuresJson = formData.get('features')?.toString();
				if (!featuresJson) return fail(400, { error: 'Features data required' });

				const features: Array<{
					section: string;
					label: string;
					description?: string;
					value?: string;
					rollType?: string;
					effects?: Record<string, unknown>;
					order: number;
				}> = JSON.parse(featuresJson);

				await prisma.$transaction([
					prisma.hunterPlaybookFeature.deleteMany({ where: { hunterId } }),
					...features.map((f) =>
						prisma.hunterPlaybookFeature.create({
							data: {
								hunterId,
								section: f.section,
								label: f.label,
								description: f.description ?? null,
								value: f.value ?? null,
								rollType: (f.rollType as 'CHARM' | 'COOL' | 'SHARP' | 'TOUGH' | 'WEIRD') ?? undefined,
								effects: f.effects ?? undefined,
								order: f.order,
							},
						})
					),
				]);
				break;
			}

			case 'history': {
				const bondsJson = formData.get('bonds')?.toString();
				if (!bondsJson) return fail(400, { error: 'Bonds data required' });

				const bonds: Array<{ text: string; targetHunterId?: string | null }> =
					JSON.parse(bondsJson);

				await prisma.$transaction([
					prisma.hunterBond.deleteMany({ where: { hunterId } }),
					...bonds.map((b, i) =>
						prisma.hunterBond.create({
							data: {
								hunterId,
								text: b.text,
								targetHunterId: b.targetHunterId ?? null,
								order: i,
							},
						})
					),
				]);
				break;
			}

			default:
				return fail(400, { error: `Unknown step: ${stepId}` });
		}

		return { success: true };
	},

	changePlaybook: async ({ request, params, locals }) => {
		await requireCampaignMember(locals.user?.id, params.id);

		const formData = await request.formData();
		const hunterId = formData.get('hunterId')?.toString();
		const playbookId = formData.get('playbookId')?.toString();

		if (!hunterId || !playbookId) return fail(400, { error: 'Missing required fields' });

		const playbook = getPlaybook(playbookId);
		if (!playbook) return fail(400, { error: 'Invalid playbook' });

		const hunter = await prisma.hunter.findUnique({ where: { id: hunterId } });
		if (!hunter || hunter.userId !== locals.user!.id) {
			return fail(403, { error: 'Not your hunter' });
		}

		await prisma.$transaction([
			prisma.hunterMove.deleteMany({ where: { hunterId } }),
			prisma.hunterGear.deleteMany({ where: { hunterId } }),
			prisma.hunterBond.deleteMany({ where: { hunterId } }),
			prisma.hunterPlaybookFeature.deleteMany({ where: { hunterId } }),
			prisma.hunter.update({
				where: { id: hunterId },
				data: {
					playbook: playbookId,
					harmMax: playbook.harmBoxes ?? 7,
					luckSpecial: playbook.luckSpecial,
					charmBase: 0,
					coolBase: 0,
					sharpBase: 0,
					toughBase: 0,
					weirdBase: 0,
				},
			}),
		]);

		return { success: true };
	},

	finalize: async ({ request, params, locals }) => {
		await requireCampaignMember(locals.user?.id, params.id);

		const formData = await request.formData();
		const hunterId = formData.get('hunterId')?.toString();

		if (!hunterId) return fail(400, { error: 'Missing hunter ID' });

		const hunter = await prisma.hunter.findUnique({ where: { id: hunterId } });
		if (!hunter || hunter.userId !== locals.user!.id) {
			return fail(403, { error: 'Not your hunter' });
		}

		await prisma.hunter.update({
			where: { id: hunterId },
			emit: true,
			data: { isDraft: false },
		});

		throw redirect(303, `/app/campaign/${params.id}/hunter/${hunterId}`);
	},
};
