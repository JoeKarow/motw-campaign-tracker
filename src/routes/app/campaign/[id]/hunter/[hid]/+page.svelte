<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import StatusRating from '$lib/components/StatusRating.svelte';
	import MoveListEditor from '$lib/components/MoveListEditor.svelte';
	import GearListEditor from '$lib/components/GearListEditor.svelte';
	import BondListEditor from '$lib/components/BondListEditor.svelte';
	import type { HunterMove, HunterGearItem, HunterBond } from '$lib/hunter-types';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import { getPlaybook } from '$lib/playbooks';
	import type { RatingLine } from '$lib/playbooks/types';

	let { data }: { data: PageData } = $props();
	let hunter = $derived(data.hunter);

	let playbook = $derived(getPlaybook(hunter.playbook));
	let ratingLines = $derived(playbook?.ratingLines ?? []);

	const STAT_KEYS = ['charm', 'cool', 'sharp', 'tough', 'weird'] as const;

	function formatRatingLine(line: RatingLine): string {
		return STAT_KEYS
			.map((k) => `${k.charAt(0).toUpperCase() + k.slice(1)} ${line[k] >= 0 ? '+' : ''}${line[k]}`)
			.join(', ');
	}

	const { form, enhance, tainted, isTainted } = superForm(data.form, {
		dataType: 'json',
		resetForm: false
	});

	let otherHunters = $derived(
		data.campaign.hunters.filter((h) => h.id !== hunter.id).map((h) => ({ id: h.id, name: h.name }))
	);

	const stats = [
		{ label: 'Charm', key: 'charm' as const, base: 'charmBase' as const, mod: 'charmMod' as const },
		{ label: 'Cool', key: 'cool' as const, base: 'coolBase' as const, mod: 'coolMod' as const },
		{ label: 'Sharp', key: 'sharp' as const, base: 'sharpBase' as const, mod: 'sharpMod' as const },
		{ label: 'Tough', key: 'tough' as const, base: 'toughBase' as const, mod: 'toughMod' as const },
		{ label: 'Weird', key: 'weird' as const, base: 'weirdBase' as const, mod: 'weirdMod' as const }
	];

	let selectedLineIndex = $derived(
		ratingLines.findIndex((line) =>
			stats.every((s) => line[s.key] === $form[s.base])
		)
	);

	let canChangeRatings = $derived(data.isDraft || data.userRole === 'GM');

	function onRatingLineChange(e: Event) {
		const idx = parseInt((e.target as HTMLSelectElement).value, 10);
		if (idx < 0 || idx >= ratingLines.length) return;
		const line = ratingLines[idx];
		for (const s of stats) {
			$form[s.base] = line[s.key];
		}
	}
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
				<h3 class="h3 mb-3">Stats</h3>
				<div class="flex flex-wrap gap-2 mb-3">
					{#each stats as stat (stat.label)}
						{@const total = ($form[stat.base] as number) + ($form[stat.mod] as number)}
						<StatBadge label={stat.label} value={total} />
					{/each}
				</div>
				{#if ratingLines.length > 0}
					<label class="label">
						<span class="label-text">Ratings Line</span>
						<select
							class="select"
							value={selectedLineIndex}
							onchange={onRatingLineChange}
							disabled={!canChangeRatings}
						>
							{#if selectedLineIndex === -1}
								<option value={-1}>Custom</option>
							{/if}
							{#each ratingLines as line, i}
								<option value={i}>{formatRatingLine(line)}</option>
							{/each}
						</select>
					</label>
				{/if}
				{#each stats as stat}
					<input type="hidden" bind:value={$form[stat.base]} />
					<input type="hidden" bind:value={$form[stat.mod]} />
				{/each}
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
			<h3 class="h3 mb-3">Stats</h3>
			<div class="flex flex-wrap gap-2">
				{#each stats as stat (stat.label)}
					{@const total = (hunter[stat.base] as number) + (hunter[stat.mod] as number)}
					<StatBadge label={stat.label} value={total} />
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
