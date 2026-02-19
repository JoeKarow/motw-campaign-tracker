/** Shared Prisma include config for loading hunter with relational sub-models. */
export const hunterWithRelations = {
	moves: { orderBy: { order: 'asc' as const } },
	gear: { orderBy: { order: 'asc' as const } },
	bonds: {
		orderBy: { order: 'asc' as const },
		include: { targetHunter: { select: { id: true, name: true } } },
	},
	playbookFeatures: {
		orderBy: [{ section: 'asc' }, { order: 'asc' }] as [
			{ section: 'asc' },
			{ order: 'asc' },
		],
	},
} as const;
