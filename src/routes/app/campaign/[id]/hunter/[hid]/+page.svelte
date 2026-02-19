<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let hunter = $derived(data.hunter);

	let movesText = $state(JSON.stringify(data.hunter.moves, null, 2));
	let gearText = $state(JSON.stringify(data.hunter.gear, null, 2));
	let bondsText = $state(JSON.stringify(data.hunter.bonds, null, 2));
</script>

<h1 class="h1">{hunter.name}</h1>
<p class="text-xs text-surface-400 mb-6">Playbook: {hunter.playbook} | Player: {hunter.user.name}</p>

{#if form?.success}
	<p class="text-success-500 mb-4">Saved!</p>
{/if}

{#if data.canEdit}
	<form method="POST" action="?/update" use:enhance>
		<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
			<div class="card p-4">
				<h3 class="h3">Identity</h3>
				<label class="label mb-4">
					<span class="label-text">Name</span>
					<input class="input" name="name" value={hunter.name} required />
				</label>
				<label class="label mb-4">
					<span class="label-text">Playbook</span>
					<input class="input" name="playbook" value={hunter.playbook} required />
				</label>
				<label class="label mb-4">
					<span class="label-text">Look</span>
					<textarea class="textarea" name="look" rows="2">{hunter.look ?? ''}</textarea>
				</label>
			</div>

			<div class="card p-4">
				<h3 class="h3">Stats</h3>
				<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
					{#each [{ name: 'charmMod', label: 'Charm' }, { name: 'coolMod', label: 'Cool' }, { name: 'sharpMod', label: 'Sharp' }, { name: 'toughMod', label: 'Tough' }, { name: 'weirdMod', label: 'Weird' }] as stat}
						<label class="label text-center">
							<span class="label-text text-xs">{stat.label}</span>
							<input class="input text-center text-xl font-bold" name={stat.name} type="number" min="-3" max="3" value={hunter[stat.name as keyof typeof hunter]} />
						</label>
					{/each}
				</div>
			</div>

			<div class="card p-4">
				<h3 class="h3">Status</h3>
				<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
					<label class="label text-center">
						<span class="label-text text-xs">Harm ({hunter.harm}/{hunter.harmMax})</span>
						<input class="input text-center text-xl font-bold" name="harm" type="number" min="0" max={hunter.harmMax} value={hunter.harm} />
					</label>
					<label class="label text-center">
						<span class="label-text text-xs">Luck</span>
						<input class="input text-center text-xl font-bold" name="luck" type="number" min="0" max="7" value={hunter.luck} />
					</label>
					<label class="label text-center">
						<span class="label-text text-xs">XP</span>
						<input class="input text-center text-xl font-bold" name="xp" type="number" min="0" value={hunter.xp} />
					</label>
				</div>
			</div>

			<div class="card p-4">
				<h3 class="h3">Moves</h3>
				<label class="label">
					<span class="label-text">Moves (JSON array)</span>
					<textarea class="textarea" name="moves" rows="6" bind:value={movesText}></textarea>
				</label>
			</div>

			<div class="card p-4">
				<h3 class="h3">Gear</h3>
				<label class="label">
					<span class="label-text">Gear (JSON array)</span>
					<textarea class="textarea" name="gear" rows="4" bind:value={gearText}></textarea>
				</label>
			</div>

			<div class="card p-4">
				<h3 class="h3">Bonds</h3>
				<label class="label">
					<span class="label-text">Bonds (JSON array)</span>
					<textarea class="textarea" name="bonds" rows="4" bind:value={bondsText}></textarea>
				</label>
			</div>
		</div>

		<button type="submit" class="btn preset-filled-primary-500 mt-4">Save Hunter</button>
	</form>
{:else}
	<!-- Read-only view for other players' hunters -->
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
				{#each [{ key: 'charmMod', label: 'Charm' }, { key: 'coolMod', label: 'Cool' }, { key: 'sharpMod', label: 'Sharp' }, { key: 'toughMod', label: 'Tough' }, { key: 'weirdMod', label: 'Weird' }] as stat}
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
