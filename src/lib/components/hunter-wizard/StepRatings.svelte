<script lang="ts">
	import type { WizardState } from './wizard-state.svelte';

	interface Props {
		state: WizardState;
	}

	let { state }: Props = $props();

	const STAT_NAMES = ['charm', 'cool', 'sharp', 'tough', 'weird'] as const;

	function capitalize(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	function formatStat(value: number): string {
		return value >= 0 ? `+${value}` : `${value}`;
	}

	function statColor(value: number): string {
		if (value >= 2) return 'text-success-500';
		if (value <= -2) return 'text-error-500';
		if (value === -1) return 'text-warning-500';
		return '';
	}
</script>

<input type="hidden" name="hunterId" value={state.hunterId} />
<input type="hidden" name="stepId" value="ratings" />
<input type="hidden" name="ratingsLineIndex" value={state.ratingsLineIndex ?? ''} />

{#if state.playbook}
	<div class="flex flex-col gap-3">
		{#each state.playbook.ratingLines as line, index (index)}
			<button
				type="button"
				class="card card-hover p-4 text-left transition-all {state.ratingsLineIndex === index
					? 'ring-2 ring-primary-500'
					: ''}"
				onclick={() => (state.ratingsLineIndex = index)}
			>
				<div class="flex flex-row items-center justify-evenly gap-4">
					{#each STAT_NAMES as stat (stat)}
						<span class="text-sm font-semibold {statColor(line[stat])}">
							{capitalize(stat)} {formatStat(line[stat])}
						</span>
					{/each}
				</div>
			</button>
		{/each}
	</div>
{/if}
