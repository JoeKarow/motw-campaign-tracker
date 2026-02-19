<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div>
	<div class="mb-6 pb-4 border-b border-surface-700">
		<h2 class="h2">{data.campaign.name}</h2>
		<nav class="flex gap-2 mt-2">
			<a href="/app/campaign/{data.campaign.id}" class="btn btn-sm preset-outlined-surface-300-700">Overview</a>
			<a href="/app/campaign/{data.campaign.id}/mystery/new" class="btn btn-sm preset-outlined-surface-300-700">Mysteries</a>
			<a href="/app/campaign/{data.campaign.id}/npc" class="btn btn-sm preset-outlined-surface-300-700">NPCs</a>
			<a href="/app/campaign/{data.campaign.id}/hunter/{data.campaign.hunters[0]?.id ?? ''}" class="btn btn-sm preset-outlined-surface-300-700">Hunters</a>
		</nav>
	</div>
	{@render children()}
</div>
