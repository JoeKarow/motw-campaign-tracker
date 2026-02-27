<script lang="ts">
	import type { WizardState, SelectedGear } from './wizard-state.svelte';
	import type { WeaponTemplate } from '$lib/playbooks/types';

	interface Props {
		state: WizardState;
	}

	let { state }: Props = $props();

	const categories = $derived(state.playbook?.startingGearOptions ?? []);

	function isWeapon(option: WeaponTemplate | string): option is WeaponTemplate {
		return typeof option !== 'string' && 'harm' in option;
	}

	function optionName(option: WeaponTemplate | string): string {
		return isWeapon(option) ? option.name : option;
	}

	function isSelected(categoryIndex: number, name: string): boolean {
		return state.gearSelections.some(
			(g) => g.categoryIndex === categoryIndex && g.name === name
		);
	}

	function categoryPickCount(categoryIndex: number): number {
		return state.gearSelections.filter((g) => g.categoryIndex === categoryIndex).length;
	}

	function isCategoryFull(categoryIndex: number): boolean {
		const cat = categories[categoryIndex];
		if (!cat) return false;
		return categoryPickCount(categoryIndex) >= cat.pickCount;
	}

	function toggleGear(categoryIndex: number, option: WeaponTemplate | string) {
		const name = optionName(option);
		const existingIndex = state.gearSelections.findIndex(
			(g) => g.categoryIndex === categoryIndex && g.name === name
		);

		if (existingIndex >= 0) {
			state.gearSelections = state.gearSelections.filter((_, i) => i !== existingIndex);
		} else {
			if (isCategoryFull(categoryIndex)) return;

			const selected: SelectedGear = isWeapon(option)
				? {
						name: option.name,
						kind: 'weapon',
						harm: option.harm,
						ranges: option.ranges,
						tags: option.tags,
						categoryIndex,
					}
				: {
						name: option,
						kind: 'gear',
						categoryIndex,
					};

			state.gearSelections = [...state.gearSelections, selected];
		}
	}

	const gearForSubmit = $derived(
		state.gearSelections.map((g) => {
			const base: Record<string, unknown> = { name: g.name, kind: g.kind };
			if (g.kind === 'weapon') {
				base.harm = g.harm;
				base.ranges = g.ranges;
				base.tags = g.tags;
			}
			return base;
		})
	);
</script>

<input type="hidden" name="hunterId" value={state.hunterId} />
<input type="hidden" name="stepId" value="gear" />
<input type="hidden" name="gear" value={JSON.stringify(gearForSubmit)} />

<div class="space-y-6">
	{#each categories as category, catIndex (catIndex)}
		{@const remaining = category.pickCount - categoryPickCount(catIndex)}
		{@const full = remaining <= 0}

		<section>
			<header class="mb-3 flex items-center justify-between">
				<h3 class="h4 font-bold">{category.label}</h3>
				<span class="badge {full ? 'preset-filled-success-500' : 'preset-filled-surface-500'}">
					Pick {category.pickCount} — {remaining} remaining
				</span>
			</header>

			<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
				{#each category.options as option (optionName(option))}
					{@const name = optionName(option)}
					{@const selected = isSelected(catIndex, name)}
					{@const disabled = !selected && full}

					<button
						type="button"
						class="card p-3 text-left transition-all
							{selected ? 'ring-2 ring-primary-500' : ''}
							{disabled ? 'opacity-50 grayscale' : 'card-hover'}"
						{disabled}
						onclick={() => toggleGear(catIndex, option)}
					>
						<span class="font-semibold">{name}</span>

						{#if isWeapon(option)}
							<div class="mt-2 flex flex-wrap gap-1">
								<span class="badge preset-filled-warning-500 text-xs">
									{option.harm}-harm
								</span>
								{#each option.ranges as range (range)}
									<span class="badge preset-filled-primary-500 text-xs">{range}</span>
								{/each}
								{#each option.tags as tag (tag)}
									<span class="badge preset-filled-surface-500 text-xs">{tag}</span>
								{/each}
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</section>
	{/each}
</div>
