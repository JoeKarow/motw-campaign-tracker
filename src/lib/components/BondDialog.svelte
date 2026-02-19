<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import type { HunterBond } from '$lib/hunter-types';

	let {
		open = $bindable(false),
		bond = null,
		hunters = [],
		onSave
	}: {
		open: boolean;
		bond: HunterBond | null;
		hunters: Array<{ id: string; name: string }>;
		onSave: (bond: HunterBond) => void;
	} = $props();

	let text = $state('');
	let targetHunterId = $state('');

	function prefill() {
		if (bond) {
			text = bond.text;
			targetHunterId = bond.targetHunterId ?? '';
		} else {
			text = '';
			targetHunterId = '';
		}
	}

	function handleOpenChange(details: { open: boolean }) {
		open = details.open;
		if (details.open) {
			prefill();
		} else {
			text = '';
			targetHunterId = '';
		}
	}

	function handleSave() {
		const selectedHunter = targetHunterId
			? hunters.find((h) => h.id === targetHunterId) ?? null
			: null;

		onSave({
			id: bond?.id ?? crypto.randomUUID(),
			text,
			targetHunterId: selectedHunter?.id ?? null,
			targetHunter: selectedHunter,
			order: bond?.order ?? 0
		});

		open = false;
	}
</script>

<Dialog {open} onOpenChange={handleOpenChange}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="card bg-surface-100-900 w-full max-w-md p-4 space-y-4 shadow-xl">
				<Dialog.Title class="text-lg font-bold">
					{bond ? 'Edit Bond' : 'Add Bond'}
				</Dialog.Title>

				<form
					onsubmit={(e) => {
						e.preventDefault();
						handleSave();
					}}
					class="space-y-4"
				>
					<label class="label">
						<span>Text</span>
						<textarea
							bind:value={text}
							required
							rows={2}
							placeholder="Describe the bond..."
							class="textarea"
						></textarea>
					</label>

					<label class="label">
						<span>Target Hunter</span>
						<select bind:value={targetHunterId} class="select">
							<option value="">None</option>
							{#each hunters as hunter (hunter.id)}
								<option value={hunter.id}>{hunter.name}</option>
							{/each}
						</select>
					</label>

					<div class="flex justify-end gap-2">
						<button type="button" class="btn preset-tonal" onclick={() => (open = false)}>
							Cancel
						</button>
						<button type="submit" class="btn preset-filled-primary-500">Save</button>
					</div>
				</form>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
