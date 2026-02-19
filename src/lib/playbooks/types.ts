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

export interface ImprovementDefinition {
	id: string;
	label: string;
	isAdvanced: boolean;
}

export interface PlaybookSectionOption {
	label: string;
	description?: string;
	hasTextInput?: boolean;
	effects?: Record<string, unknown>;
	rollType?: MoveRollType;
}

export interface PlaybookSectionDefinition {
	key: string;
	title: string;
	description: string;
	pickCount: number;
	options: PlaybookSectionOption[];
}

export interface PlaybookDefinition {
	id: string;
	displayName: string;
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
}
