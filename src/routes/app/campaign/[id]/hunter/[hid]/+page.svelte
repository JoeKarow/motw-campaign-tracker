<!-- svelte-ignore state_referenced_locally -->
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
		data.campaign.hunters.filter((h) => h.id !== hunter.id).map((h) => ({ id: h.id, name: h.name }))
	);

	const stats = [
		{ label: 'Charm', base: 'charmBase' as const, mod: 'charmMod' as const },
		{ label: 'Cool', base: 'coolBase' as const, mod: 'coolMod' as const },
		{ label: 'Sharp', base: 'sharpBase' as const, mod: 'sharpMod' as const },
		{ label: 'Tough', base: 'toughBase' as const, mod: 'toughMod' as const },
		{ label: 'Weird', base: 'weirdBase' as const, mod: 'weirdMod' as const }
	];
</script>

{#if data.canEdit}
	<form method="POST" action="?/update" use:enhance>
		<div class="flex items-start justify-between gap-4 mb-6">
			<div>
				<h1 class="h1">{hunter.name}</h1>
				<p class="text-xs text-surface-400">
					Playbook: {hunter.playbook} | Player: {hunter.user.name}
				</p>
			</div>
			{#if isTainted($tainted)}
				<button type="submit" class="btn preset-filled-primary-500 whitespace-nowrap"
					>Save Hunter</button
				>
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
				<div class="grid grid-cols-5 gap-2">
					{#each stats as stat (stat.label)}
						{@const total = ($form[stat.base] as number) + ($form[stat.mod] as number)}
						<div class="text-center">
							<span class="text-xs text-surface-400 block">{stat.label}</span>
							<span class="text-2xl font-bold block">{total >= 0 ? '+' : ''}{total}</span>
							<label class="label mt-1">
								<span class="label-text text-[0.6rem] text-surface-500">Base</span>
								<input
									class="input text-center text-sm"
									type="number"
									min="-3"
									max="4"
									bind:value={$form[stat.base]}
								/>
							</label>
							<label class="label mt-1">
								<span class="label-text text-[0.6rem] text-surface-500">Mod</span>
								<input
									class="input text-center text-sm"
									type="number"
									min="-3"
									max="3"
									bind:value={$form[stat.mod]}
								/>
							</label>
						</div>
					{/each}
				</div>
			</div>

			<div class="card p-4 space-y-3">
				<h3 class="h3">Status</h3>
				<StatusRating
					value={$form.harm as number}
					max={hunter.harmMax}
					onchange={(v: number) => ($form.harm = v)}
					label="Harm"
					variant="harm"
					name="harm"
				/>
				<StatusRating
					value={$form.luck as number}
					max={7}
					onchange={(v: number) => ($form.luck = v)}
					label="Luck"
					variant="luck"
					name="luck"
				/>
				<StatusRating
					value={$form.xp as number}
					max={5}
					onchange={(v: number) => ($form.xp = v)}
					label="XP"
					variant="xp"
					name="xp"
				/>
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
	<p class="text-xs text-surface-400 mb-6">
		Playbook: {hunter.playbook} | Player: {hunter.user.name}
	</p>

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
			<div class="grid grid-cols-5 gap-2 text-center">
				{#each stats as stat (stat.label)}
					{@const total = (hunter[stat.base] as number) + (hunter[stat.mod] as number)}
					<div>
						<span class="text-xs text-surface-400">{stat.label}</span>
						<p class="text-xl font-bold">{total >= 0 ? '+' : ''}{total}</p>
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
