import { getPlaybook, allPlaybooks } from '$lib/playbooks/index';
import type { PlaybookDefinition, PlaybookSectionDefinition } from '$lib/playbooks/types';
import type { TypedHunter } from '$lib/hunter-types';

// ── Step definitions ────────────────────────────────────────────

export interface StepDef {
	id: string;
	label: string;
}

const ALL_STEPS: StepDef[] = [
	{ id: 'playbook', label: 'Playbook' },
	{ id: 'identity', label: 'Identity' },
	{ id: 'moves', label: 'Moves' },
	{ id: 'ratings', label: 'Ratings' },
	{ id: 'gear', label: 'Gear' },
	{ id: 'specials', label: 'Specials' },
	{ id: 'history', label: 'History' },
	{ id: 'review', label: 'Review' },
];

// ── Gear selection types ────────────────────────────────────────

export interface SelectedGear {
	name: string;
	kind: 'weapon' | 'gear';
	harm?: number;
	ranges?: string[];
	tags?: string[];
	categoryIndex: number;
}

// ── Section selection types ─────────────────────────────────────

export interface SectionSelection {
	key: string;
	type: PlaybookSectionDefinition['type'];
	/** For pick sections: selected option labels */
	picks?: string[];
	/** For builder sections: array of selected labels per step */
	builderSteps?: string[][];
	/** For text-input sections: field label → value */
	textValues?: Record<string, string>;
}

// ── History entry type ──────────────────────────────────────────

export interface HistoryEntry {
	text: string;
	targetHunterId?: string | null;
	selected: boolean;
}

// ── Wizard state class ──────────────────────────────────────────

export class WizardState {
	step = $state(0);
	hunterId = $state<string | null>(null);
	playbookId = $state<string | null>(null);
	name = $state('');
	pronouns = $state('');
	lookSelections = $state<Record<string, string>>({});
	ratingsLineIndex = $state<number | null>(null);
	selectedMoveIds = $state<string[]>([]);
	gearSelections = $state<SelectedGear[]>([]);
	sectionSelections = $state<SectionSelection[]>([]);
	historyEntries = $state<HistoryEntry[]>([]);

	playbook = $derived(this.playbookId ? getPlaybook(this.playbookId) : undefined);

	effectiveSteps = $derived.by(() => {
		if (!this.playbook || this.playbook.customSections.length === 0) {
			return ALL_STEPS.filter((s) => s.id !== 'specials');
		}
		return ALL_STEPS;
	});

	currentStepDef = $derived(this.effectiveSteps[this.step]);

	canGoNext = $derived.by(() => {
		const stepId = this.currentStepDef?.id;
		if (stepId === 'playbook') return !!this.playbookId;
		if (stepId === 'identity') return !!this.name.trim();
		return true;
	});

	isLastStep = $derived(this.step === this.effectiveSteps.length - 1);

	goNext() {
		if (this.step < this.effectiveSteps.length - 1) {
			this.step++;
		}
	}

	goBack() {
		if (this.step > 0) {
			this.step--;
		}
	}

	goToStep(index: number) {
		if (index >= 0 && index < this.effectiveSteps.length) {
			this.step = index;
		}
	}

	goToStepById(id: string) {
		const index = this.effectiveSteps.findIndex((s) => s.id === id);
		if (index >= 0) this.step = index;
	}

	resetForPlaybookChange() {
		this.lookSelections = {};
		this.ratingsLineIndex = null;
		this.selectedMoveIds = [];
		this.gearSelections = [];
		this.sectionSelections = [];
		this.historyEntries = [];
	}

	initSectionsFromPlaybook() {
		if (!this.playbook) return;
		this.sectionSelections = this.playbook.customSections.map((section) => {
			const base: SectionSelection = { key: section.key, type: section.type };
			if (section.type === 'pick') base.picks = [];
			if (section.type === 'builder') base.builderSteps = section.steps.map(() => []);
			if (section.type === 'text-input') base.textValues = {};
			return base;
		});
	}

	initHistoryFromPlaybook() {
		if (!this.playbook) return;
		this.historyEntries = this.playbook.historyOptions.map((text) => ({
			text,
			targetHunterId: null,
			selected: false,
		}));
	}
}

// ── Hydration helpers ──────────────────────────────────────────

export function hydrateFromDraft(state: WizardState, draft: TypedHunter) {
	state.hunterId = draft.id;
	state.playbookId = draft.playbook;
	state.name = draft.name;
	state.pronouns = draft.pronouns ?? '';

	// Parse look string back into selections
	if (draft.look) {
		const parts = draft.look.split(', ');
		const playbook = getPlaybook(draft.playbook);
		if (playbook) {
			playbook.looks.forEach((cat, i) => {
				if (parts[i]) {
					state.lookSelections[cat.label] = parts[i];
				}
			});
		}
	}

	// Ratings - find matching line index
	const playbook = state.playbook;
	if (playbook) {
		const idx = playbook.ratingLines.findIndex(
			(line) =>
				line.charm === draft.charmBase &&
				line.cool === draft.coolBase &&
				line.sharp === draft.sharpBase &&
				line.tough === draft.toughBase &&
				line.weird === draft.weirdBase
		);
		if (idx >= 0) state.ratingsLineIndex = idx;
	}

	// Moves
	if (draft.moves.length > 0) {
		state.selectedMoveIds = draft.moves.map((m) => m.name);
	}

	// Gear
	if (draft.gear.length > 0) {
		state.gearSelections = draft.gear.map((g, i) => ({
			name: g.name,
			kind: g.kind as 'weapon' | 'gear',
			harm: g.kind === 'weapon' ? (g as { harm: number }).harm : undefined,
			ranges: g.kind === 'weapon' ? ((g as { ranges: string[] }).ranges ?? []) : undefined,
			tags: g.kind === 'weapon' ? ((g as { tags: string[] }).tags ?? []) : undefined,
			categoryIndex: 0, // Will be approximated
		}));
	}

	// Playbook features → section selections
	if (playbook && draft.playbookFeatures.length > 0) {
		state.sectionSelections = playbook.customSections.map((section) => {
			const features = draft.playbookFeatures.filter((f) => f.section === section.key);
			const sel: SectionSelection = { key: section.key, type: section.type };

			if (section.type === 'pick') {
				sel.picks = features.map((f) => f.label);
			} else if (section.type === 'builder') {
				sel.builderSteps = section.steps.map((step, stepIdx) => {
					// Features for this step have order values in range [stepIdx * 100, (stepIdx+1)*100)
					return features
						.filter((f) => Math.floor(f.order / 100) === stepIdx)
						.map((f) => f.label);
				});
			} else if (section.type === 'text-input') {
				sel.textValues = {};
				for (const f of features) {
					sel.textValues[f.label] = f.value ?? '';
				}
			}
			return sel;
		});
	} else if (playbook) {
		state.initSectionsFromPlaybook();
	}

	// Bonds → history entries
	if (playbook && draft.bonds.length > 0) {
		state.historyEntries = playbook.historyOptions.map((text) => {
			const bond = draft.bonds.find((b) => b.text === text);
			return {
				text,
				targetHunterId: bond?.targetHunterId ?? null,
				selected: !!bond,
			};
		});
	} else if (playbook) {
		state.initHistoryFromPlaybook();
	}
}

export function determineResumeStep(state: WizardState): number {
	// Find first incomplete step
	if (!state.playbookId) return 0;
	if (!state.name.trim()) return 1;

	const steps = state.effectiveSteps;

	// Check moves
	const movesIdx = steps.findIndex((s) => s.id === 'moves');
	if (movesIdx >= 0 && state.selectedMoveIds.length === 0) return movesIdx;

	// Check ratings
	const ratingsIdx = steps.findIndex((s) => s.id === 'ratings');
	if (ratingsIdx >= 0 && state.ratingsLineIndex === null) return ratingsIdx;

	// Check gear
	const gearIdx = steps.findIndex((s) => s.id === 'gear');
	if (gearIdx >= 0 && state.gearSelections.length === 0) return gearIdx;

	// Check specials
	const specialsIdx = steps.findIndex((s) => s.id === 'specials');
	if (specialsIdx >= 0) {
		const hasIncomplete = state.sectionSelections.some((s) => {
			if (s.type === 'pick') return !s.picks || s.picks.length === 0;
			if (s.type === 'builder')
				return !s.builderSteps || s.builderSteps.some((step) => step.length === 0);
			if (s.type === 'text-input')
				return !s.textValues || Object.values(s.textValues).every((v) => !v);
			return false;
		});
		if (hasIncomplete) return specialsIdx;
	}

	// Check history
	const historyIdx = steps.findIndex((s) => s.id === 'history');
	if (historyIdx >= 0 && !state.historyEntries.some((e) => e.selected)) return historyIdx;

	// All filled, go to review
	const reviewIdx = steps.findIndex((s) => s.id === 'review');
	return reviewIdx >= 0 ? reviewIdx : steps.length - 1;
}
