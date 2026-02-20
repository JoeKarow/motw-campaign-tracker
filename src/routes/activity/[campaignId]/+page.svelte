<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import SceneTracker from '$lib/components/SceneTracker.svelte';
	import NpcCard from '$lib/components/NpcCard.svelte';
	import StatusRating from '$lib/components/StatusRating.svelte';
	import { getActivityFetch, getSessionToken } from '$lib/discord-context.svelte';

	let { data }: { data: PageData } = $props();
	const afetch = getActivityFetch();
	const sessionToken = getSessionToken();

	let activeTab = $state('scene');
	let session = $state<any>(null);
	let sceneIndex = $state(0);
	let npcs = $state<any[]>(data.campaign?.npcs ?? []);
	let hunters = $state<any[]>(data.campaign?.hunters ?? []);
	let loading = $state(true);

	const campaignId = data.campaignId;

	onMount(async () => {
		await loadSession();
		loading = false;
	});

	async function loadSession() {
		const res = await afetch(`/api/campaign/${campaignId}/active-session`);
		const result = await res.json();
		session = result.session;
	}

	async function addClue(sceneId: string, description: string) {
		await afetch(`/api/campaign/${campaignId}/scene/${sceneId}/clue`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ description })
		});
		await loadSession();
	}

	async function updateNpcStatus(npcId: string, status: string) {
		await afetch(`/api/campaign/${campaignId}/npc/${npcId}/status`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status })
		});
		const res = await afetch(`/api/campaign/${campaignId}/npc`);
		const result = await res.json();
		npcs = result.npcs;
	}

	async function updateHunter(hunterId: string, field: string, value: number) {
		await afetch(`/api/campaign/${campaignId}/hunter/${hunterId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ [field]: value })
		});
		const idx = hunters.findIndex((h) => h.id === hunterId);
		if (idx >= 0) hunters[idx] = { ...hunters[idx], [field]: value };
	}
</script>

{#if loading}
	<div class="text-center text-surface-400 p-12">Loading session...</div>
{:else}
	<div class="p-4 max-w-150 mx-auto">
		<Tabs value={activeTab} onValueChange={(details) => (activeTab = details.value)}>
			<Tabs.List>
				<Tabs.Trigger class="flex-1" value="scene">Scene</Tabs.Trigger>
				<Tabs.Trigger class="flex-1" value="hunters">Hunters</Tabs.Trigger>
				<Tabs.Trigger class="flex-1" value="npcs">NPCs</Tabs.Trigger>
				<Tabs.Indicator />
			</Tabs.List>
			<Tabs.Content value="scene">
				{#if session}
					<h3 class="h3 mt-4">{session.mystery.title} — {session.title}</h3>
					<SceneTracker
						scenes={session.scenes}
						currentIndex={sceneIndex}
						onnavigate={(i) => (sceneIndex = i)}
						onaddclue={addClue}
					/>
				{:else}
					<p class="text-surface-400 text-center p-12">
						No active session. Start one from the web app.
					</p>
				{/if}
			</Tabs.Content>
			<Tabs.Content value="hunters">
				<div class="flex flex-col gap-3 mt-4">
					{#each hunters as hunter (hunter.id)}
						<div class="card p-4 flex flex-col gap-2">
							<h3 class="h3">{hunter.name}</h3>
							<p class="text-xs text-surface-400">{hunter.playbook}</p>
							<StatusRating
								value={hunter.harm}
								max={hunter.harmMax}
								onchange={(v) => updateHunter(hunter.id, 'harm', v)}
								label="Harm"
								variant="harm"
							/>
							<StatusRating
								value={hunter.luck}
								max={7}
								onchange={(v) => updateHunter(hunter.id, 'luck', v)}
								label="Luck"
								variant="luck"
							/>
						</div>
					{/each}
				</div>
			</Tabs.Content>
			<Tabs.Content value="npcs">
				<div class="flex flex-col gap-3 mt-4">
					{#each npcs as npc (npc.id)}
						<NpcCard {npc} onstatuschange={(status) => updateNpcStatus(npc.id, status)} />
					{/each}
				</div>
			</Tabs.Content>
		</Tabs>
	</div>
{/if}
