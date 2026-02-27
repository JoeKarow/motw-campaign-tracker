<script lang="ts">
	import type { WizardState } from './wizard-state.svelte.ts';

	let {
		state,
		campaignHunters,
	}: {
		state: WizardState;
		campaignHunters: Array<{ id: string; name: string; isDraft: boolean }>;
	} = $props();

	let selectedCount = $derived(state.historyEntries.filter((e) => e.selected).length);

	let bondsForSubmit = $derived(
		state.historyEntries
			.filter((e) => e.selected)
			.map((e) => ({ text: e.text, targetHunterId: e.targetHunterId ?? null }))
	);

	function toggleEntry(index: number) {
		const entry = state.historyEntries[index];
		entry.selected = !entry.selected;
		if (!entry.selected) {
			entry.targetHunterId = null;
		}
	}
</script>

<div class="space-y-6">
	<p class="text-lg font-semibold">
		{selectedCount} bond{selectedCount === 1 ? '' : 's'} selected
	</p>

	<div class="space-y-3">
		{#each state.historyEntries as entry, i (entry.text)}
			<button
				type="button"
				class="card w-full p-4 text-left transition-all {entry.selected
					? 'preset-outlined-primary-500 ring-primary-500 ring-2'
					: 'preset-outlined-surface-300-700'}"
				onclick={() => toggleEntry(i)}
			>
				<p class="font-medium">{entry.text}</p>
			</button>

			{#if entry.selected}
				<div class="ml-4">
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div onclick={(e) => e.stopPropagation()}>
						<select
							class="select"
							value={entry.targetHunterId ?? ''}
							onchange={(e) => {
								entry.targetHunterId = e.currentTarget.value || null;
							}}
						>
							<option value="">&mdash; Select hunter &mdash;</option>
							{#each campaignHunters as hunter (hunter.id)}
								<option value={hunter.id}>
									{hunter.name}{hunter.isDraft ? ' (creating...)' : ''}
								</option>
							{/each}
						</select>
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Hidden form inputs for submission -->
	<input type="hidden" name="hunterId" value={state.hunterId ?? ''} />
	<input type="hidden" name="stepId" value="history" />
	<input type="hidden" name="bonds" value={JSON.stringify(bondsForSubmit)} />
</div>
