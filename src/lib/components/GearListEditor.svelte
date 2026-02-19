<script lang="ts">
	import type { HunterGearItem } from '$lib/hunter-types';
	import GearDialog from '$lib/components/GearDialog.svelte';

	let {
		items = $bindable()
	}: {
		items: HunterGearItem[];
	} = $props();

	let dialogOpen = $state(false);
	let editingItem = $state<HunterGearItem | null>(null);

	function addItem() {
		editingItem = null;
		dialogOpen = true;
	}

	function editItem(item: HunterGearItem) {
		editingItem = item;
		dialogOpen = true;
	}

	function handleSave(item: HunterGearItem) {
		if (editingItem) {
			items = items.map((existing) =>
				existing.id === editingItem!.id ? { ...item, order: existing.order } : existing
			);
		} else {
			items = [...items, { ...item, order: items.length }];
		}
		dialogOpen = false;
		editingItem = null;
	}

	function removeItem(id: string) {
		items = items
			.filter((item) => item.id !== id)
			.map((item, index) => ({ ...item, order: index }));
	}
</script>

<div class="space-y-2">
	{#each items as item (item.id)}
		<div class="flex items-center gap-2 rounded-md bg-surface-100-900 px-3 py-2">
			<div class="flex-1 min-w-0">
				<span class="font-bold">{item.name}</span>
				{#if item.kind === 'weapon'}
					<span class="badge preset-filled-surface-200-800 text-xs">Weapon</span>
					<span class="text-xs text-error-500">{item.harm} harm</span>
				{:else}
					<span class="badge preset-filled-surface-200-800 text-xs">Gear</span>
				{/if}
			</div>
			<button type="button" class="btn btn-sm preset-tonal" onclick={() => editItem(item)}>
				Edit
			</button>
			<button type="button" class="btn btn-sm preset-tonal-error" onclick={() => removeItem(item.id)}>
				Remove
			</button>
		</div>
	{/each}

	<button type="button" class="btn preset-tonal w-full" onclick={addItem}>
		Add Gear
	</button>
</div>

<GearDialog bind:open={dialogOpen} item={editingItem} onSave={handleSave} />
