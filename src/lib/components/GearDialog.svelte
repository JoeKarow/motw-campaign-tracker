<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import type { HunterGearItem, HunterWeapon, HunterGenericGear, WeaponRange } from '$lib/hunter-types';

	const allRanges: WeaponRange[] = ['intimate', 'hand', 'close', 'far'];

	let {
		open = $bindable(false),
		item = null,
		onSave
	}: {
		open: boolean;
		item: HunterGearItem | null;
		onSave: (item: HunterGearItem) => void;
	} = $props();

	let kind = $state<'weapon' | 'gear'>('gear');
	let name = $state('');
	let harm = $state(0);
	let ranges = $state<WeaponRange[]>([]);
	let tags = $state('');
	let notes = $state('');

	function resetForm() {
		kind = 'gear';
		name = '';
		harm = 0;
		ranges = [];
		tags = '';
		notes = '';
	}

	function prefillForm(i: HunterGearItem) {
		kind = i.kind;
		name = i.name;
		if (i.kind === 'weapon') {
			harm = i.harm;
			ranges = [...i.ranges];
			tags = i.tags.join(', ');
			notes = '';
		} else {
			harm = 0;
			ranges = [];
			tags = '';
			notes = i.notes ?? '';
		}
	}

	function handleOpenChange(details: { open: boolean }) {
		open = details.open;
		if (details.open) {
			if (item) {
				prefillForm(item);
			} else {
				resetForm();
			}
		} else {
			resetForm();
		}
	}

	function toggleRange(r: WeaponRange) {
		if (ranges.includes(r)) {
			ranges = ranges.filter((v) => v !== r);
		} else {
			ranges = [...ranges, r];
		}
	}

	function handleSave() {
		if (!name.trim()) return;

		if (kind === 'weapon') {
			const saved: HunterWeapon = {
				id: item?.id ?? crypto.randomUUID(),
				kind: 'weapon',
				name: name.trim(),
				harm,
				ranges: [...ranges],
				tags: tags
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean),
				order: item?.order ?? 0
			};
			onSave(saved);
		} else {
			const saved: HunterGenericGear = {
				id: item?.id ?? crypto.randomUUID(),
				kind: 'gear',
				name: name.trim(),
				notes: notes.trim() || null,
				order: item?.order ?? 0
			};
			onSave(saved);
		}

		open = false;
	}
</script>

<Dialog {open} onOpenChange={handleOpenChange}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="card bg-surface-100-900 w-full max-w-md p-4 space-y-4 shadow-xl">
				<Dialog.Title class="text-lg font-bold">
					{item ? 'Edit Gear' : 'Add Gear'}
				</Dialog.Title>

				<label class="label">
					<span class="label-text">Kind</span>
					<select class="select" bind:value={kind}>
						<option value="gear">Gear</option>
						<option value="weapon">Weapon</option>
					</select>
				</label>

				<label class="label">
					<span class="label-text">Name</span>
					<input
						type="text"
						class="input"
						bind:value={name}
						placeholder="Item name"
						required
					/>
				</label>

				{#if kind === 'weapon'}
					<label class="label">
						<span class="label-text">Harm</span>
						<input type="number" class="input" bind:value={harm} min={0} />
					</label>

					<fieldset class="space-y-1">
						<legend class="label-text">Ranges</legend>
						<div class="flex gap-3 flex-wrap">
							{#each allRanges as r (r)}
								<label class="flex items-center gap-1.5">
									<input
										type="checkbox"
										class="checkbox"
										checked={ranges.includes(r)}
										onchange={() => toggleRange(r)}
									/>
									<span class="capitalize">{r}</span>
								</label>
							{/each}
						</div>
					</fieldset>

					<label class="label">
						<span class="label-text">Tags</span>
						<input
							type="text"
							class="input"
							bind:value={tags}
							placeholder="loud, reload, area"
						/>
					</label>
				{:else}
					<label class="label">
						<span class="label-text">Notes</span>
						<textarea
							class="textarea"
							rows={3}
							bind:value={notes}
							placeholder="Additional details"
						></textarea>
					</label>
				{/if}

				<div class="flex justify-end gap-2 pt-2">
					<button type="button" class="btn preset-tonal" onclick={() => (open = false)}>
						Cancel
					</button>
					<button
						type="button"
						class="btn preset-filled"
						disabled={!name.trim()}
						onclick={handleSave}
					>
						{item ? 'Save' : 'Add'}
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
