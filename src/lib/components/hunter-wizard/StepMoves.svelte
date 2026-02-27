<script lang="ts">
	import type { WizardState } from './wizard-state.svelte.ts';

	let { state }: { state: WizardState } = $props();

	let mandatoryMoves = $derived(state.playbook?.mandatoryMoves ?? []);
	let optionalMoves = $derived(state.playbook?.optionalMoves ?? []);
	let pickMovesCount = $derived(state.playbook?.pickMovesCount ?? 0);

	let selectedOptionalCount = $derived(
		state.selectedMoveIds.filter((id) => optionalMoves.some((m) => m.id === id)).length
	);
	let remaining = $derived(pickMovesCount - selectedOptionalCount);

	function toggleMove(moveId: string) {
		if (state.selectedMoveIds.includes(moveId)) {
			state.selectedMoveIds = state.selectedMoveIds.filter((id) => id !== moveId);
		} else if (remaining > 0) {
			state.selectedMoveIds = [...state.selectedMoveIds, moveId];
		}
	}

	let allSelectedMoveNames = $derived([
		...mandatoryMoves.map((m) => m.name),
		...optionalMoves.filter((m) => state.selectedMoveIds.includes(m.id)).map((m) => m.name),
	]);
</script>

<div class="space-y-6">
	<p class="text-lg font-semibold">
		Pick {pickMovesCount} &mdash;
		{#if remaining > 0}
			{remaining} remaining
		{:else}
			<span class="text-success-500">All picked</span>
		{/if}
	</p>

	{#if mandatoryMoves.length > 0}
		<div class="space-y-3">
			<h3 class="h4">Always Available</h3>
			{#each mandatoryMoves as move (move.id)}
				<div class="card preset-outlined-success-500 p-4 opacity-90">
					<div class="flex items-start justify-between gap-2">
						<div class="min-w-0 flex-1">
							<p class="font-bold">{move.name}</p>
							<p class="text-surface-600-400 mt-1 text-sm">{move.description}</p>
						</div>
						<div class="flex shrink-0 items-center gap-2">
							{#if move.rollType}
								<span class="badge preset-filled-surface-200-800 text-xs">+{move.rollType}</span>
							{/if}
							<svg class="text-success-500 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if optionalMoves.length > 0}
		<div class="space-y-3">
			<h3 class="h4">Choose Your Moves</h3>
			{#each optionalMoves as move (move.id)}
				{@const isSelected = state.selectedMoveIds.includes(move.id)}
				{@const isDisabled = !isSelected && remaining === 0}
				<button
					type="button"
					class="card w-full p-4 text-left transition-all {isSelected
						? 'preset-outlined-primary-500 ring-primary-500 ring-2'
						: 'preset-outlined-surface-300-700'} {isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}"
					disabled={isDisabled}
					onclick={() => toggleMove(move.id)}
				>
					<div class="flex items-start justify-between gap-2">
						<div class="min-w-0 flex-1">
							<p class="font-bold">{move.name}</p>
							<p class="text-surface-600-400 mt-1 text-sm">{move.description}</p>
						</div>
						<div class="flex shrink-0 items-center gap-2">
							{#if move.rollType}
								<span class="badge preset-filled-surface-200-800 text-xs">+{move.rollType}</span>
							{/if}
							{#if isSelected}
								<svg class="text-primary-500 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							{/if}
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Hidden form inputs for submission -->
	<input type="hidden" name="moves" value={JSON.stringify(allSelectedMoveNames)} />
	<input type="hidden" name="hunterId" value={state.hunterId ?? ''} />
	<input type="hidden" name="stepId" value="moves" />
</div>
