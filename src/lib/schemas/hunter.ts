import { z } from 'zod';

const moveRollType = z.enum(['CHARM', 'COOL', 'SHARP', 'TOUGH', 'WEIRD']);
const weaponRange = z.enum(['intimate', 'hand', 'close', 'far']);

const moveSchema = z.object({
	id: z.string().default(''),
	name: z.string().min(1),
	description: z.string(),
	rollType: moveRollType.nullable().optional(),
	isCustom: z.boolean().default(false),
	order: z.number().int().default(0)
});

const weaponSchema = z.object({
	id: z.string().default(''),
	kind: z.literal('weapon'),
	name: z.string().min(1),
	harm: z.number().int().default(0),
	ranges: z.array(weaponRange).default([]),
	tags: z.array(z.string()).default([]),
	order: z.number().int().default(0)
});

const genericGearSchema = z.object({
	id: z.string().default(''),
	kind: z.literal('gear'),
	name: z.string().min(1),
	notes: z.string().nullable().optional(),
	order: z.number().int().default(0)
});

const gearSchema = z.discriminatedUnion('kind', [weaponSchema, genericGearSchema]);

const bondSchema = z.object({
	id: z.string().default(''),
	text: z.string().min(1),
	targetHunterId: z.string().nullable().optional(),
	targetHunter: z
		.object({ id: z.string(), name: z.string() })
		.nullable()
		.optional(),
	order: z.number().int().default(0)
});

export const hunterFormSchema = z.object({
	name: z.string().min(1),
	playbook: z.string().min(1),
	look: z.string().nullable().optional(),
	charmBase: z.number().int().min(-3).max(4).default(0),
	coolBase: z.number().int().min(-3).max(4).default(0),
	sharpBase: z.number().int().min(-3).max(4).default(0),
	toughBase: z.number().int().min(-3).max(4).default(0),
	weirdBase: z.number().int().min(-3).max(4).default(0),
	charmMod: z.number().int().min(-3).max(3).default(0),
	coolMod: z.number().int().min(-3).max(3).default(0),
	sharpMod: z.number().int().min(-3).max(3).default(0),
	toughMod: z.number().int().min(-3).max(3).default(0),
	weirdMod: z.number().int().min(-3).max(3).default(0),
	harm: z.number().int().min(0).default(0),
	luck: z.number().int().min(0).default(7),
	xp: z.number().int().min(0).default(0),
	moves: z.array(moveSchema).default([]),
	gear: z.array(gearSchema).default([]),
	bonds: z.array(bondSchema).default([])
});

export type HunterFormData = z.infer<typeof hunterFormSchema>;
