<script lang="ts">
	import type { PageData } from './$types';
	import StatusRating from '$lib/components/StatusRating.svelte';

	let { data }: { data: PageData } = $props();
	const campaignId = data.campaignId;
	let hunter = $state({ ...data.hunter });

	async function update(field: string, value: number) {
		hunter = { ...hunter, [field]: value };
		await fetch(`/api/campaign/${campaignId}/hunter/${hunter.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ [field]: value })
		});
	}
</script>

<div class="p-6 max-w-lg mx-auto">
	<h1 class="h1 text-center">{hunter.name}</h1>
	<p class="text-center text-surface-400 mb-6">{hunter.playbook}</p>

	<div class="flex flex-col gap-4 mb-6">
		<StatusRating value={hunter.harm} max={hunter.harmMax} onchange={(v) => update('harm', v)} label="Harm" variant="harm" />
		<StatusRating value={hunter.luck} max={7} onchange={(v) => update('luck', v)} label="Luck" variant="luck" />
		<StatusRating value={hunter.xp} max={5} onchange={(v) => update('xp', v)} label="XP" variant="xp" />
	</div>

	<div class="card p-4">
		<h3 class="h3">Stats</h3>
		<div class="grid grid-cols-5 gap-2 text-center">
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Charm</span>
				<span class="text-2xl font-bold">{hunter.charmMod >= 0 ? '+' : ''}{hunter.charmMod}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Cool</span>
				<span class="text-2xl font-bold">{hunter.coolMod >= 0 ? '+' : ''}{hunter.coolMod}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Sharp</span>
				<span class="text-2xl font-bold">{hunter.sharpMod >= 0 ? '+' : ''}{hunter.sharpMod}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Tough</span>
				<span class="text-2xl font-bold">{hunter.toughMod >= 0 ? '+' : ''}{hunter.toughMod}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Weird</span>
				<span class="text-2xl font-bold">{hunter.weirdMod >= 0 ? '+' : ''}{hunter.weirdMod}</span>
			</div>
		</div>
	</div>
</div>
