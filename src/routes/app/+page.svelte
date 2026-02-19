<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="h1">Campaigns</h1>
	<a href="/app/campaign/new" class="btn preset-filled-primary-500">New Campaign</a>
</div>

{#if data.campaigns.length === 0}
	<p class="text-surface-400 text-center mt-12">No campaigns yet. Create your first one!</p>
{:else}
	<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
		{#each data.campaigns as campaign (campaign.id)}
			<a href="/app/campaign/{campaign.id}" class="card p-4 hover:ring-1 hover:ring-primary-500 transition-all no-underline">
				<h3 class="h3">{campaign.name}</h3>
				<div class="flex gap-4 mt-2 text-xs text-surface-400">
					<span>{campaign._count.mysteries} mysteries</span>
					<span>{campaign._count.hunters} hunters</span>
					<span>{campaign._count.npcs} NPCs</span>
				</div>
			</a>
		{/each}
	</div>
{/if}
