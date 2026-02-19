<script lang="ts">
	import type { HunterMove } from '$lib/hunter-types';
	import MoveDialog from '$lib/components/MoveDialog.svelte';

	let { items = $bindable() }: { items: HunterMove[] } = $props();

	let dialogOpen = $state(false);
	let editingMove = $state<HunterMove | null>(null);

	function formatRollType(rt: string): string {
		return '+' + rt.charAt(0) + rt.slice(1).toLowerCase();
	}

	function reindex(list: HunterMove[]): HunterMove[] {
		return list.map((m, i) => ({ ...m, order: i }));
	}

	function addMove() {
		editingMove = null;
		dialogOpen = true;
	}

	function editMove(move: HunterMove) {
		editingMove = move;
		dialogOpen = true;
	}

	function handleSave(move: HunterMove) {
		if (editingMove) {
			items = reindex(items.map((m) => (m.id === editingMove!.id ? move : m)));
		} else {
			items = reindex([...items, move]);
		}
		editingMove = null;
		dialogOpen = false;
	}

	function removeMove(id: string) {
		items = reindex(items.filter((m) => m.id !== id));
	}
</script>

<div class="flex flex-col gap-2">
	{#if items.length === 0}
		<p class="text-surface-400 text-sm">No moves added yet.</p>
	{:else}
		{#each items as move (move.id)}
			<div class="card preset-outlined-surface-200-800 flex items-center justify-between gap-2 p-3">
				<div class="flex flex-wrap items-center gap-2">
					<span class="font-bold">{move.name}</span>
					{#if move.rollType}
						<span class="badge preset-filled-surface-200-800 text-xs">{formatRollType(move.rollType)}</span>
					{/if}
					{#if move.isCustom}
						<span class="badge preset-filled-warning-500 text-xs">Custom</span>
					{/if}
				</div>
				<div class="flex items-center gap-1">
					<button type="button" class="btn btn-sm preset-tonal" onclick={() => editMove(move)}>
						Edit
					</button>
					<button type="button" class="btn btn-sm preset-tonal-error" onclick={() => removeMove(move.id)}>
						Remove
					</button>
				</div>
			</div>
		{/each}
	{/if}

	<button type="button" class="btn preset-tonal w-full" onclick={addMove}>
		+ Add Move
	</button>
</div>

<MoveDialog bind:open={dialogOpen} move={editingMove} onSave={handleSave} />
