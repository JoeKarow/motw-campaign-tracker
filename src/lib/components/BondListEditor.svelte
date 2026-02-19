<script lang="ts">
	import type { HunterBond } from '$lib/hunter-types';
	import BondDialog from '$lib/components/BondDialog.svelte';

	let {
		items = $bindable(),
		hunters = []
	}: {
		items: HunterBond[];
		hunters: Array<{ id: string; name: string }>;
	} = $props();

	let dialogOpen = $state(false);
	let editingBond = $state<HunterBond | null>(null);

	function reindex(list: HunterBond[]): HunterBond[] {
		return list.map((b, i) => ({ ...b, order: i }));
	}

	function addBond() {
		editingBond = null;
		dialogOpen = true;
	}

	function editBond(bond: HunterBond) {
		editingBond = bond;
		dialogOpen = true;
	}

	function handleSave(bond: HunterBond) {
		if (editingBond) {
			items = reindex(items.map((b) => (b.id === editingBond!.id ? bond : b)));
		} else {
			items = reindex([...items, bond]);
		}
		editingBond = null;
		dialogOpen = false;
	}

	function removeBond(id: string) {
		items = reindex(items.filter((b) => b.id !== id));
	}

	function truncate(text: string, max: number = 60): string {
		return text.length > max ? text.slice(0, max) + '...' : text;
	}
</script>

<div class="flex flex-col gap-2">
	{#if items.length === 0}
		<p class="text-surface-400 text-sm">No bonds added yet.</p>
	{:else}
		{#each items as bond (bond.id)}
			<div class="card preset-outlined-surface-200-800 flex items-center justify-between gap-2 p-3">
				<div class="flex flex-wrap items-center gap-2">
					<span>{truncate(bond.text)}</span>
					{#if bond.targetHunter}
						<span class="text-xs text-surface-400">&rarr; {bond.targetHunter.name}</span>
					{/if}
				</div>
				<div class="flex items-center gap-1">
					<button type="button" class="btn btn-sm preset-tonal" onclick={() => editBond(bond)}>
						Edit
					</button>
					<button type="button" class="btn btn-sm preset-tonal-error" onclick={() => removeBond(bond.id)}>
						Remove
					</button>
				</div>
			</div>
		{/each}
	{/if}

	<button type="button" class="btn preset-tonal w-full" onclick={addBond}>
		+ Add Bond
	</button>
</div>

<BondDialog bind:open={dialogOpen} bond={editingBond} {hunters} onSave={handleSave} />
