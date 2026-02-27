<script lang="ts">
	import { allPlaybooks } from '$lib/playbooks/index';
	import type { PlaybookDefinition } from '$lib/playbooks/types';
	import type { WizardState } from './wizard-state.svelte';

	interface Props {
		state: WizardState;
	}

	let { state }: Props = $props();

	const STAT_NAMES = ['charm', 'cool', 'sharp', 'tough', 'weird'] as const;

	const sortedPlaybooks = $derived(
		allPlaybooks().toSorted((a, b) => a.displayName.localeCompare(b.displayName))
	);

	function getTopStats(playbook: PlaybookDefinition): { name: string; value: number }[] {
		const line = playbook.ratingLines[0];
		if (!line) return [];

		const entries = STAT_NAMES.map((name) => ({ name, value: line[name] }));
		entries.sort((a, b) => b.value - a.value);
		return entries.slice(0, 2);
	}

	function capitalize(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	function selectPlaybook(id: string) {
		if (state.playbookId !== id) {
			state.playbookId = id;
			state.resetForPlaybookChange();
		}
	}
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
	{#each sortedPlaybooks as playbook (playbook.id)}
		<button
			type="button"
			class="card card-hover p-4 text-left transition-all {state.playbookId === playbook.id
				? 'ring-2 ring-primary-500'
				: ''}"
			onclick={() => selectPlaybook(playbook.id)}
		>
			<h3 class="h4 mb-1 font-bold">{playbook.displayName}</h3>
			<p class="line-clamp-2 text-sm opacity-75">{playbook.description}</p>
			<div class="mt-2 flex gap-2">
				{#each getTopStats(playbook) as stat (stat.name)}
					<span class="badge variant-soft-primary text-xs">
						{capitalize(stat.name)} +{stat.value}
					</span>
				{/each}
			</div>
		</button>
	{/each}
</div>
