<script lang="ts">
	import type { PageData } from './$types';
	import { badgePreset } from '$lib/badge-preset';

	let { data }: { data: PageData } = $props();
	let campaign = $derived(data.campaign);
	let isGM = $derived(data.userRole === 'GM');
	let myHunter = $derived(campaign.hunters.find((h) => h.userId === data.userId));
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="h1">{campaign.name}</h1>
</div>

{#if !isGM && myHunter}
	<div class="card p-4 mb-6 ring-1 ring-primary-500">
		<h3 class="h3">My Hunter</h3>
		<p class="text-lg font-bold text-primary-500">{myHunter.name}</p>
		<p class="text-xs text-surface-400">{myHunter.playbook}</p>
		<a href="/app/campaign/{campaign.id}/hunter/{myHunter.id}" class="btn preset-filled-primary-500 mt-3">Edit Hunter</a>
	</div>
{:else if !isGM && !myHunter}
	<div class="card p-4 mb-6 ring-1 ring-primary-500">
		<h3 class="h3">Create Your Hunter</h3>
		<p class="text-surface-400 text-sm">You haven't created a hunter for this campaign yet.</p>
		<a href="/app/campaign/{campaign.id}/hunter/new" class="btn preset-filled-primary-500 mt-3">Create Hunter</a>
	</div>
{/if}

<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
	<div class="card p-4">
		<h3 class="h3">Mysteries</h3>
		<p class="text-3xl font-bold text-primary-500">{campaign.mysteries.length}</p>
		<div class="text-xs text-surface-400">
			{campaign.mysteries.filter((m) => m.status === 'ACTIVE').length} active
		</div>
		{#if isGM}
			<a href="/app/campaign/{campaign.id}/mystery/new" class="btn preset-filled-primary-500 mt-3">New Mystery</a>
		{/if}
	</div>

	<div class="card p-4">
		<h3 class="h3">NPCs</h3>
		<p class="text-3xl font-bold text-primary-500">{campaign.npcs.length}</p>
		<div class="text-xs text-surface-400">
			{campaign.npcs.filter((n) => n.status === 'ALIVE').length} alive
		</div>
		{#if isGM}
			<a href="/app/campaign/{campaign.id}/npc" class="btn preset-filled-primary-500 mt-3">View NPCs</a>
		{/if}
	</div>

	<div class="card p-4">
		<h3 class="h3">Hunters</h3>
		<p class="text-3xl font-bold text-primary-500">{campaign.hunters.length}</p>
		<a href="/app/campaign/{campaign.id}/hunter" class="btn preset-filled-primary-500 mt-3">View Hunters</a>
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

{#if !isGM && campaign.hunters.length > 0}
	<h2 class="h2 mt-8">Party</h2>
	<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
		{#each campaign.hunters as hunter (hunter.id)}
			<a href="/app/campaign/{campaign.id}/hunter/{hunter.id}" class="card p-4 hover:ring-1 hover:ring-primary-500 transition-all no-underline">
				<h3 class="h3">{hunter.name}</h3>
				<p class="text-xs text-surface-400">{hunter.playbook}</p>
			</a>
		{/each}
	</div>
{/if}
