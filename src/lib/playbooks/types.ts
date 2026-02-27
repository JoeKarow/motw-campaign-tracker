import type { MoveRollType, WeaponRange } from '$lib/hunter-types';

/** A preset line of ratings the player can pick during character creation. */
export interface RatingLine {
	charm: number;
	cool: number;
	sharp: number;
	tough: number;
	weird: number;
}

export interface LookCategory {
	label: string;
	options: string[];
	allowCustom?: boolean;
}

export interface PlaybookMoveDefinition {
	id: string;
	name: string;
	description: string;
	rollType?: MoveRollType;
}

export interface WeaponTemplate {
	name: string;
	harm: number;
	ranges: WeaponRange[];
	tags: string[];
}

export interface GearPickCategory {
	label: string;
	pickCount: number;
	options: (WeaponTemplate | string)[];
}

// ── Improvement types ──────────────────────────────────────────

export type ImprovementType =
	| 'rating-boost'
	| 'playbook-move'
	| 'cross-playbook-move'
	| 'gain-ally'
	| 'haven-option'
	| 'luck-recovery'
	| 'change-playbook'
	| 'retire'
	| 'second-hunter'
	| 'advanced-moves'
	| 'playbook-specific';

export interface ImprovementDefinition {
	id: string;
	label: string;
	isAdvanced: boolean;
	type: ImprovementType;
	rating?: 'charm' | 'cool' | 'sharp' | 'tough' | 'weird' | 'any';
	maxValue?: number;
}

// ── Section types (discriminated union) ─────────────────────────

export interface PlaybookSectionOption {
	label: string;
	description?: string;
	hasTextInput?: boolean;
	effects?: Record<string, unknown>;
	rollType?: MoveRollType;
}

/** Pick N options from a list. */
export interface PickSectionDefinition {
	type: 'pick';
	key: string;
	title: string;
	description: string;
	pickCount: number;
	options: PlaybookSectionOption[];
}

/** Builder option for multi-step construction (e.g. Chosen weapon, Monstrous breed). */
export interface BuilderStep {
	label: string;
	pickCount: number;
	options: PlaybookSectionOption[];
}

/** Multi-step builder section. */
export interface BuilderSectionDefinition {
	type: 'builder';
	key: string;
	title: string;
	description: string;
	steps: BuilderStep[];
}

/** Free text input section (e.g. Crooked's Heat NPCs, Initiate's Sect name). */
export interface TextInputField {
	label: string;
	placeholder?: string;
}

export interface TextInputSectionDefinition {
	type: 'text-input';
	key: string;
	title: string;
	description: string;
	fields: TextInputField[];
}

export type PlaybookSectionDefinition =
	| PickSectionDefinition
	| BuilderSectionDefinition
	| TextInputSectionDefinition;

// ── Main playbook definition ────────────────────────────────────

export interface PlaybookDefinition {
	id: string;
	displayName: string;
	description: string;
	luckSpecial: string;
	ratingLines: RatingLine[];
	looks: LookCategory[];
	mandatoryMoves: PlaybookMoveDefinition[];
	optionalMoves: PlaybookMoveDefinition[];
	pickMovesCount: number;
	startingGearOptions: GearPickCategory[];
	improvements: ImprovementDefinition[];
	advancedImprovements: ImprovementDefinition[];
	customSections: PlaybookSectionDefinition[];
	historyOptions: string[];
	harmBoxes?: number;
	canBecomeUnstable?: boolean;
}
