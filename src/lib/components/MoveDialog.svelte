<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import type { HunterMove, MoveRollType } from '$lib/hunter-types';

	let {
		open = $bindable(false),
		move = null,
		onSave
	}: {
		open: boolean;
		move: HunterMove | null;
		onSave: (move: HunterMove) => void;
	} = $props();

	const rollTypes: MoveRollType[] = ['CHARM', 'COOL', 'SHARP', 'TOUGH', 'WEIRD'];

	let name = $state('');
	let description = $state('');
	let rollType = $state<MoveRollType | ''>('');
	let isCustom = $state(false);

	function resetForm() {
		name = '';
		description = '';
		rollType = '';
		isCustom = false;
	}

	function prefillForm(m: HunterMove) {
		name = m.name;
		description = m.description;
		rollType = m.rollType ?? '';
		isCustom = m.isCustom;
	}

	function handleOpenChange(details: { open: boolean }) {
		open = details.open;
		if (details.open) {
			if (move) {
				prefillForm(move);
			} else {
				resetForm();
			}
		} else {
			resetForm();
		}
	}

	function handleSave() {
		if (!name.trim()) return;

		const saved: HunterMove = {
			id: move?.id ?? crypto.randomUUID(),
			name: name.trim(),
			description: description.trim(),
			rollType: rollType || null,
			isCustom,
			order: move?.order ?? 0
		};

		onSave(saved);
		open = false;
	}

	function formatRollType(rt: MoveRollType): string {
		return '+' + rt.charAt(0) + rt.slice(1).toLowerCase();
	}
</script>

<Dialog {open} onOpenChange={handleOpenChange}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="card bg-surface-100-900 w-full max-w-md p-4 space-y-4 shadow-xl">
				<Dialog.Title class="text-lg font-bold">
					{move ? 'Edit Move' : 'Add Move'}
				</Dialog.Title>

				<label class="label">
					<span class="label-text">Name</span>
					<input
						type="text"
						class="input"
						bind:value={name}
						placeholder="Move name"
						required
					/>
				</label>

				<label class="label">
					<span class="label-text">Description</span>
					<textarea
						class="textarea"
						rows={3}
						bind:value={description}
						placeholder="What does this move do?"
					></textarea>
				</label>

				<label class="label">
					<span class="label-text">Roll Type</span>
					<select class="select" bind:value={rollType}>
						<option value="">None</option>
						{#each rollTypes as rt (rt)}
							<option value={rt}>{formatRollType(rt)}</option>
						{/each}
					</select>
				</label>

				<label class="flex items-center gap-2">
					<input type="checkbox" class="checkbox" bind:checked={isCustom} />
					<span>Custom Move</span>
				</label>

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
						{move ? 'Save' : 'Add'}
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
