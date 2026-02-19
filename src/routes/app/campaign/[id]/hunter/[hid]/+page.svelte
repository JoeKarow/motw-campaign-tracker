<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import StatusRating from '$lib/components/StatusRating.svelte';
	import MoveListEditor from '$lib/components/MoveListEditor.svelte';
	import GearListEditor from '$lib/components/GearListEditor.svelte';
	import BondListEditor from '$lib/components/BondListEditor.svelte';
	import type { HunterMove, HunterGearItem, HunterBond } from '$lib/hunter-types';

	let { data }: { data: PageData } = $props();
	let hunter = $derived(data.hunter);

	const { form, enhance, tainted, isTainted } = superForm(data.form, {
		dataType: 'json',
		resetForm: false
	});

	let otherHunters = $derived(
		data.campaign.hunters
			.filter((h) => h.id !== hunter.id)
			.map((h) => ({ id: h.id, name: h.name }))
	);
</script>

{#if data.canEdit}
	<form method="POST" action="?/update" use:enhance>
		<div class="flex items-start justify-between gap-4 mb-6">
			<div>
				<h1 class="h1">{hunter.name}</h1>
				<p class="text-xs text-surface-400">Playbook: {hunter.playbook} | Player: {hunter.user.name}</p>
			</div>
			{#if isTainted($tainted)}
				<button type="submit" class="btn preset-filled-primary-500 whitespace-nowrap">Save Hunter</button>
			{/if}
		</div>

		<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
			<div class="card p-4">
				<h3 class="h3">Identity</h3>
				<label class="label mb-4">
					<span class="label-text">Name</span>
					<input class="input" name="name" bind:value={$form.name} required />
				</label>
				<label class="label mb-4">
					<span class="label-text">Playbook</span>
					<input class="input" name="playbook" bind:value={$form.playbook} required />
				</label>
				<label class="label mb-4">
					<span class="label-text">Look</span>
					<textarea class="textarea" name="look" rows="2" bind:value={$form.look}></textarea>
				</label>
			</div>

			<div class="card p-4">
				<h3 class="h3">Stats</h3>
				<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
					<label class="label text-center">
						<span class="label-text text-xs">Charm</span>
						<input class="input text-center text-xl font-bold" type="number" min="-3" max="3" bind:value={$form.charmMod} />
					</label>
					<label class="label text-center">
						<span class="label-text text-xs">Cool</span>
						<input class="input text-center text-xl font-bold" type="number" min="-3" max="3" bind:value={$form.coolMod} />
					</label>
					<label class="label text-center">
						<span class="label-text text-xs">Sharp</span>
						<input class="input text-center text-xl font-bold" type="number" min="-3" max="3" bind:value={$form.sharpMod} />
					</label>
					<label class="label text-center">
						<span class="label-text text-xs">Tough</span>
						<input class="input text-center text-xl font-bold" type="number" min="-3" max="3" bind:value={$form.toughMod} />
					</label>
					<label class="label text-center">
						<span class="label-text text-xs">Weird</span>
						<input class="input text-center text-xl font-bold" type="number" min="-3" max="3" bind:value={$form.weirdMod} />
					</label>
				</div>
			</div>

			<div class="card p-4 space-y-3">
				<h3 class="h3">Status</h3>
				<StatusRating value={$form.harm as number} max={hunter.harmMax} onchange={(v: number) => $form.harm = v} label="Harm" variant="harm" name="harm" />
				<StatusRating value={$form.luck as number} max={7} onchange={(v: number) => $form.luck = v} label="Luck" variant="luck" name="luck" />
				<StatusRating value={$form.xp as number} max={5} onchange={(v: number) => $form.xp = v} label="XP" variant="xp" name="xp" />
			</div>

			<div class="card p-4">
				<h3 class="h3">Moves</h3>
				<MoveListEditor bind:items={$form.moves as HunterMove[]} />
			</div>

			<div class="card p-4">
				<h3 class="h3">Gear</h3>
				<GearListEditor bind:items={$form.gear as HunterGearItem[]} />
			</div>

			<div class="card p-4">
				<h3 class="h3">Bonds</h3>
				<BondListEditor bind:items={$form.bonds as HunterBond[]} hunters={otherHunters} />
			</div>
		</div>
	</form>
{:else}
	<h1 class="h1">{hunter.name}</h1>
	<p class="text-xs text-surface-400 mb-6">Playbook: {hunter.playbook} | Player: {hunter.user.name}</p>

	<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
		<div class="card p-4">
			<h3 class="h3">Identity</h3>
			<p><strong>Name:</strong> {hunter.name}</p>
			<p><strong>Playbook:</strong> {hunter.playbook}</p>
			{#if hunter.look}
				<p><strong>Look:</strong> {hunter.look}</p>
			{/if}
		</div>

		<div class="card p-4">
			<h3 class="h3">Stats</h3>
			<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2 text-center">
				{#each [{ key: 'charmMod', label: 'Charm' }, { key: 'coolMod', label: 'Cool' }, { key: 'sharpMod', label: 'Sharp' }, { key: 'toughMod', label: 'Tough' }, { key: 'weirdMod', label: 'Weird' }] as stat (stat.key)}
					<div>
						<span class="text-xs text-surface-400">{stat.label}</span>
						<p class="text-xl font-bold">{hunter[stat.key as keyof typeof hunter]}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="card p-4">
			<h3 class="h3">Status</h3>
			<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2 text-center">
				<div>
					<span class="text-xs text-surface-400">Harm</span>
					<p class="text-xl font-bold">{hunter.harm}/{hunter.harmMax}</p>
				</div>
				<div>
					<span class="text-xs text-surface-400">Luck</span>
					<p class="text-xl font-bold">{hunter.luck}</p>
				</div>
				<div>
					<span class="text-xs text-surface-400">XP</span>
					<p class="text-xl font-bold">{hunter.xp}</p>
				</div>
			</div>
		</div>
	</div>
{/if}
