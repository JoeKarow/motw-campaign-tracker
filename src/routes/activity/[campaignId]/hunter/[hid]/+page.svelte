<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import StatusRating from '$lib/components/StatusRating.svelte';
	import { getActivityFetch, getSessionToken } from '$lib/discord-context.svelte';
	import { createCampaignEventSource } from '$lib/activity-events.svelte';
	import type { CampaignEvent } from '$lib/events';

	let { data }: { data: PageData } = $props();
	const afetch = getActivityFetch();
	const sessionToken = getSessionToken();
	const campaignId = data.campaignId;
	let hunter = $state({ ...data.hunter });

	function handleEvent(event: CampaignEvent) {
		if (event.type === 'hunter:updated' && event.hunterId === hunter.id) {
			hunter = { ...hunter, ...event.data };
		}
	}

	const sse = sessionToken
		? createCampaignEventSource(campaignId, sessionToken, handleEvent)
		: null;

	onDestroy(() => {
		sse?.destroy();
	});

	async function update(field: string, value: number) {
		hunter = { ...hunter, [field]: value };
		await afetch(`/api/campaign/${campaignId}/hunter/${hunter.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ [field]: value })
		});
	}

	function formatStat(base: number, mod: number): string {
		const total = base + mod;
		return total >= 0 ? `+${total}` : `${total}`;
	}
</script>

<div class="p-6 max-w-lg mx-auto">
	<h1 class="h1 text-center">{hunter.name}</h1>
	<p class="text-center text-surface-400 mb-6">{hunter.playbook}</p>

	<div class="flex flex-col gap-4 mb-6">
		<StatusRating
			value={hunter.harm}
			max={hunter.harmMax}
			onchange={(v) => update('harm', v)}
			label="Harm"
			variant="harm"
		/>
		<StatusRating
			value={hunter.luck}
			max={7}
			onchange={(v) => update('luck', v)}
			label="Luck"
			variant="luck"
		/>
		<StatusRating
			value={hunter.xp}
			max={5}
			onchange={(v) => update('xp', v)}
			label="XP"
			variant="xp"
		/>
	</div>

	<div class="card p-4">
		<h3 class="h3">Stats</h3>
		<div class="grid grid-cols-5 gap-2 text-center">
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Charm</span>
				<span class="text-2xl font-bold">{formatStat(hunter.charmBase, hunter.charmMod)}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Cool</span>
				<span class="text-2xl font-bold">{formatStat(hunter.coolBase, hunter.coolMod)}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Sharp</span>
				<span class="text-2xl font-bold">{formatStat(hunter.sharpBase, hunter.sharpMod)}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Tough</span>
				<span class="text-2xl font-bold">{formatStat(hunter.toughBase, hunter.toughMod)}</span>
			</div>
			<div>
				<span class="text-[0.7rem] text-surface-400 block">Weird</span>
				<span class="text-2xl font-bold">{formatStat(hunter.weirdBase, hunter.weirdMod)}</span>
			</div>
		</div>
	</div>
</div>
