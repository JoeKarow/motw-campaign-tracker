<script lang="ts">
	import type { PageData } from './$types';
	import { badgePreset } from '$lib/badge-preset';

	let { data }: { data: PageData } = $props();
	let campaign = $derived(data.campaign);
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="h1">{campaign.name}</h1>
</div>

<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
	<div class="card p-4">
		<h3 class="h3">Mysteries</h3>
		<p class="text-3xl font-bold text-primary-500">{campaign.mysteries.length}</p>
		<div class="text-xs text-surface-400">
			{campaign.mysteries.filter((m: any) => m.status === 'ACTIVE').length} active
		</div>
		<a href="/app/campaign/{campaign.id}/mystery/new" class="btn preset-filled-primary-500 mt-3">New Mystery</a>
	</div>

	<div class="card p-4">
		<h3 class="h3">NPCs</h3>
		<p class="text-3xl font-bold text-primary-500">{campaign.npcs.length}</p>
		<div class="text-xs text-surface-400">
			{campaign.npcs.filter((n: any) => n.status === 'ALIVE').length} alive
		</div>
		<a href="/app/campaign/{campaign.id}/npc" class="btn preset-filled-primary-500 mt-3">View NPCs</a>
	</div>

	<div class="card p-4">
		<h3 class="h3">Hunters</h3>
		<p class="text-3xl font-bold text-primary-500">{campaign.hunters.length}</p>
		<a href="/app/campaign/{campaign.id}/hunter/{campaign.hunters[0]?.id ?? ''}" class="btn preset-filled-primary-500 mt-3">View Hunters</a>
	</div>
</div>

{#if campaign.mysteries.length > 0}
	<h2 class="h2 mt-8">Mysteries</h2>
	<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
		{#each campaign.mysteries as mystery (mystery.id)}
			<a href="/app/campaign/{campaign.id}/mystery/{mystery.id}" class="card p-4 hover:ring-1 hover:ring-primary-500 transition-all no-underline">
				<div class="flex justify-between items-center">
					<h3 class="h3">{mystery.title}</h3>
					<span class="badge {badgePreset(mystery.status)}">{mystery.status}</span>
				</div>
				{#if mystery.monsterType}
					<p class="text-xs text-surface-400 mt-1">Monster: {mystery.monsterType}</p>
				{/if}
				{#if mystery.location}
					<p class="text-xs text-surface-400 mt-1">Location: {mystery.location}</p>
				{/if}
			</a>
		{/each}
	</div>
{/if}
