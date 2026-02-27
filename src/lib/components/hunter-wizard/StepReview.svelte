<script lang="ts">
	import type { WizardState } from './wizard-state.svelte';

	interface Props {
		state: WizardState;
	}

	let { state }: Props = $props();

	const STAT_NAMES = ['charm', 'cool', 'sharp', 'tough', 'weird'] as const;

	const lookSummary = $derived(
		Object.values(state.lookSelections).filter(Boolean).join(', ') || ''
	);

	const selectedMoves = $derived.by(() => {
		if (!state.playbook) return [];
		const allMoves = [...state.playbook.mandatoryMoves, ...state.playbook.optionalMoves];
		return state.selectedMoveIds
			.map((id) => allMoves.find((m) => m.name === id || m.id === id))
			.filter(Boolean)
			.map((m) => m!.name);
	});

	const selectedRatingLine = $derived(
		state.playbook && state.ratingsLineIndex !== null
			? state.playbook.ratingLines[state.ratingsLineIndex]
			: null
	);

	const selectedHistory = $derived(state.historyEntries.filter((e) => e.selected));

	function formatStat(value: number): string {
		return value >= 0 ? `+${value}` : `${value}`;
	}

	function capitalize(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
</script>

<input type="hidden" name="hunterId" value={state.hunterId} />

<div class="flex flex-col gap-4">
	<!-- Playbook -->
	<div class="card p-4">
		<header class="mb-2 flex items-center justify-between">
			<h3 class="h4 font-bold">Playbook</h3>
			<button type="button" class="btn btn-sm preset-tonal" onclick={() => state.goToStepById('playbook')}>
				Edit
			</button>
		</header>
		{#if state.playbook}
			<p>{state.playbook.displayName}</p>
		{:else}
			<p class="opacity-50">Not set — fill in later</p>
		{/if}
	</div>

	<!-- Identity -->
	<div class="card p-4">
		<header class="mb-2 flex items-center justify-between">
			<h3 class="h4 font-bold">Identity</h3>
			<button type="button" class="btn btn-sm preset-tonal" onclick={() => state.goToStepById('identity')}>
				Edit
			</button>
		</header>
		{#if state.name.trim()}
			<dl class="space-y-1 text-sm">
				<div class="flex gap-2">
					<dt class="font-semibold">Name:</dt>
					<dd>{state.name}</dd>
				</div>
				{#if state.pronouns}
					<div class="flex gap-2">
						<dt class="font-semibold">Pronouns:</dt>
						<dd>{state.pronouns}</dd>
					</div>
				{/if}
				{#if lookSummary}
					<div class="flex gap-2">
						<dt class="font-semibold">Look:</dt>
						<dd>{lookSummary}</dd>
					</div>
				{/if}
			</dl>
		{:else}
			<p class="opacity-50">Not set — fill in later</p>
		{/if}
	</div>

	<!-- Moves -->
	<div class="card p-4">
		<header class="mb-2 flex items-center justify-between">
			<h3 class="h4 font-bold">Moves</h3>
			<button type="button" class="btn btn-sm preset-tonal" onclick={() => state.goToStepById('moves')}>
				Edit
			</button>
		</header>
		{#if selectedMoves.length > 0}
			<ul class="list-disc space-y-1 pl-5 text-sm">
				{#each selectedMoves as move (move)}
					<li>{move}</li>
				{/each}
			</ul>
		{:else}
			<p class="opacity-50">Not set — fill in later</p>
		{/if}
	</div>

	<!-- Ratings -->
	<div class="card p-4">
		<header class="mb-2 flex items-center justify-between">
			<h3 class="h4 font-bold">Ratings</h3>
			<button type="button" class="btn btn-sm preset-tonal" onclick={() => state.goToStepById('ratings')}>
				Edit
			</button>
		</header>
		{#if selectedRatingLine}
			<div class="flex flex-wrap gap-4 text-sm">
				{#each STAT_NAMES as stat (stat)}
					<span class="font-semibold">
						{capitalize(stat)} {formatStat(selectedRatingLine[stat])}
					</span>
				{/each}
			</div>
		{:else}
			<p class="opacity-50">Not set — fill in later</p>
		{/if}
	</div>

	<!-- Gear -->
	<div class="card p-4">
		<header class="mb-2 flex items-center justify-between">
			<h3 class="h4 font-bold">Gear</h3>
			<button type="button" class="btn btn-sm preset-tonal" onclick={() => state.goToStepById('gear')}>
				Edit
			</button>
		</header>
		{#if state.gearSelections.length > 0}
			<ul class="list-disc space-y-1 pl-5 text-sm">
				{#each state.gearSelections as gear (gear.name)}
					<li>
						{gear.name}
						{#if gear.kind === 'weapon' && gear.harm}
							<span class="opacity-70">({gear.harm}-harm{gear.ranges?.length ? `, ${gear.ranges.join(', ')}` : ''})</span>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<p class="opacity-50">Not set — fill in later</p>
		{/if}
	</div>

	<!-- Specials (only if playbook has custom sections) -->
	{#if state.playbook && state.playbook.customSections.length > 0}
		<div class="card p-4">
			<header class="mb-2 flex items-center justify-between">
				<h3 class="h4 font-bold">Specials</h3>
				<button type="button" class="btn btn-sm preset-tonal" onclick={() => state.goToStepById('specials')}>
					Edit
				</button>
			</header>
			{#if state.sectionSelections.length > 0}
				{#each state.sectionSelections as section (section.key)}
					{@const def = state.playbook.customSections.find((s) => s.key === section.key)}
					{#if def}
						<div class="mb-2 text-sm">
							<span class="font-semibold">{def.title}:</span>
							{#if section.type === 'pick' && section.picks && section.picks.length > 0}
								<span>{section.picks.join(', ')}</span>
							{:else if section.type === 'builder' && section.builderSteps}
								{@const allPicks = section.builderSteps.flat()}
								{#if allPicks.length > 0}
									<span>{allPicks.join(', ')}</span>
								{:else}
									<span class="opacity-50">Not set</span>
								{/if}
							{:else if section.type === 'text-input' && section.textValues}
								{@const filled = Object.entries(section.textValues).filter(([, v]) => v)}
								{#if filled.length > 0}
									{#each filled as [label, value] (label)}
										<span class="block">{label}: {value}</span>
									{/each}
								{:else}
									<span class="opacity-50">Not set</span>
								{/if}
							{:else}
								<span class="opacity-50">Not set</span>
							{/if}
						</div>
					{/if}
				{/each}
			{:else}
				<p class="opacity-50">Not set — fill in later</p>
			{/if}
		</div>
	{/if}

	<!-- History -->
	<div class="card p-4">
		<header class="mb-2 flex items-center justify-between">
			<h3 class="h4 font-bold">History</h3>
			<button type="button" class="btn btn-sm preset-tonal" onclick={() => state.goToStepById('history')}>
				Edit
			</button>
		</header>
		{#if selectedHistory.length > 0}
			<ul class="list-disc space-y-1 pl-5 text-sm">
				{#each selectedHistory as entry (entry.text)}
					<li>{entry.text}</li>
				{/each}
			</ul>
		{:else}
			<p class="opacity-50">Not set — fill in later</p>
		{/if}
	</div>
</div>
