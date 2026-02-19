import type { Hunter, HunterMove as PrismaHunterMove, HunterGear as PrismaHunterGear, HunterBond as PrismaHunterBond, HunterPlaybookFeature as PrismaHunterPlaybookFeature } from '$lib/generated/prisma/client';

// ── Weapon ranges ────────────────────────────────────────────────

export type WeaponRange = 'intimate' | 'hand' | 'close' | 'far';

// ── Playbook feature effects ────────────────────────────────────

export interface PlaybookFeatureEffects {
	harm?: number;
	ranges?: WeaponRange[];
	tags?: string[];
	armor?: number;
}

// ── Move roll types ─────────────────────────────────────────────

export type MoveRollType = 'CHARM' | 'COOL' | 'SHARP' | 'TOUGH' | 'WEIRD';

// ── Moves ────────────────────────────────────────────────────────

export interface HunterMove {
	id: string;
	name: string;
	description: string;
	rollType?: MoveRollType | null;
	isCustom: boolean;
	order: number;
}

// ── Gear ─────────────────────────────────────────────────────────

export interface HunterWeapon {
	id: string;
	kind: 'weapon';
	name: string;
	harm: number;
	ranges: WeaponRange[];
	tags: string[];
	order: number;
}

export interface HunterGenericGear {
	id: string;
	kind: 'gear';
	name: string;
	notes?: string | null;
	order: number;
}

export type HunterGearItem = HunterWeapon | HunterGenericGear;

// ── Bonds ────────────────────────────────────────────────────────

export interface HunterBond {
	id: string;
	text: string;
	targetHunterId?: string | null;
	targetHunter?: { id: string; name: string } | null;
	order: number;
}

// ── Playbook features ───────────────────────────────────────────

export interface HunterPlaybookFeature {
	id: string;
	section: string;
	label: string;
	description?: string | null;
	value?: string | null;
	rollType?: MoveRollType | null;
	effects?: PlaybookFeatureEffects | null;
	order: number;
}

// ── Improvements ─────────────────────────────────────────────────

export interface HunterImprovement {
	id: string;
	label: string;
	takenAt: number;
	isAdvanced: boolean;
}

// ── Typed Hunter with relations ─────────────────────────────────

export interface TypedHunter extends Omit<Hunter, 'improvements'> {
	moves: HunterMove[];
	gear: HunterGearItem[];
	bonds: HunterBond[];
	improvements: HunterImprovement[];
	playbookFeatures: HunterPlaybookFeature[];
}

// ── Raw hunter with Prisma relation includes ────────────────────

export type HunterWithRelations = Hunter & {
	moves: PrismaHunterMove[];
	gear: PrismaHunterGear[];
	bonds: (PrismaHunterBond & {
		targetHunter?: { id: string; name: string } | null;
	})[];
	playbookFeatures: PrismaHunterPlaybookFeature[];
};

// ── Parser ───────────────────────────────────────────────────────

function safeJsonArray<T>(value: unknown): T[] {
	if (Array.isArray(value)) return value as T[];
	if (typeof value === 'string') {
		try {
			const parsed = JSON.parse(value);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}
	return [];
}

function mapMove(m: PrismaHunterMove): HunterMove {
	return {
		id: m.id,
		name: m.name,
		description: m.description,
		rollType: m.rollType as MoveRollType | null,
		isCustom: m.isCustom,
		order: m.order,
	};
}

function mapGear(g: PrismaHunterGear): HunterGearItem {
	if (g.kind === 'weapon') {
		return {
			id: g.id,
			kind: 'weapon',
			name: g.name,
			harm: g.harm ?? 0,
			ranges: (g.ranges as WeaponRange[]) ?? [],
			tags: (g.tags as string[]) ?? [],
			order: g.order,
		};
	}
	return {
		id: g.id,
		kind: 'gear',
		name: g.name,
		notes: g.notes,
		order: g.order,
	};
}

function mapBond(b: PrismaHunterBond & { targetHunter?: { id: string; name: string } | null }): HunterBond {
	return {
		id: b.id,
		text: b.text,
		targetHunterId: b.targetHunterId,
		targetHunter: b.targetHunter ?? null,
		order: b.order,
	};
}

function mapPlaybookFeature(f: PrismaHunterPlaybookFeature): HunterPlaybookFeature {
	return {
		id: f.id,
		section: f.section,
		label: f.label,
		description: f.description,
		value: f.value,
		rollType: f.rollType as MoveRollType | null,
		effects: f.effects as PlaybookFeatureEffects | null,
		order: f.order,
	};
}

/** Convert a raw Prisma Hunter (with included relations) into a properly typed hunter. */
export function parseHunter(raw: HunterWithRelations): TypedHunter {
	return {
		...raw,
		moves: raw.moves.map(mapMove),
		gear: raw.gear.map(mapGear),
		bonds: raw.bonds.map(mapBond),
		improvements: safeJsonArray<HunterImprovement>(raw.improvements),
		playbookFeatures: raw.playbookFeatures.map(mapPlaybookFeature),
	};
}
