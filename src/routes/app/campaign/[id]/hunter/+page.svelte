<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let isGM = $derived(data.userRole === 'GM');
	let myHunter = $derived(data.hunters.find((h) => h.userId === data.userId));
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="h1">Hunters</h1>
</div>

{#if data.hunters.length === 0}
	<p class="text-surface-400 text-center mt-8">No hunters yet.</p>
	{#if isGM}
		<div class="text-center mt-4">
			<a href="/app/campaign/{data.campaignId}/invite" class="btn preset-filled-primary-500">Invite Players</a>
		</div>
	{:else if !myHunter}
		<div class="text-center mt-4">
			<a href="/app/campaign/{data.campaignId}/hunter/new" class="btn preset-filled-primary-500">Create Hunter</a>
		</div>
	{/if}
{:else}
	<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
		{#each data.hunters as hunter (hunter.id)}
			<a href="/app/campaign/{data.campaignId}/hunter/{hunter.id}" class="card p-4 hover:ring-1 hover:ring-primary-500 transition-all no-underline">
				<h3 class="h3">{hunter.name}</h3>
				<p class="text-xs text-surface-400">{hunter.playbook}</p>
				{#if hunter.user?.name}
					<p class="text-xs text-surface-400 mt-1">Player: {hunter.user.name}</p>
				{/if}
			</a>
		{/each}
	</div>
{/if}
