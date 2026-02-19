<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { devOverrides } from '$lib/dev/dev-overrides.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let effectiveRole = $derived(devOverrides.roleOverride ?? data.userRole);

	let myHunter = $derived(
		data.campaign.hunters.find((h: any) => h.userId === data.userId)
	);
</script>

<div>
	<div class="mb-6 pb-4 border-b border-surface-700">
		<div class="flex items-center gap-2">
			<h2 class="h2">{data.campaign.name}</h2>
			<span class="badge {effectiveRole === 'GM' ? 'preset-filled-primary-500' : 'preset-filled-surface-500'}">{effectiveRole}</span>
		</div>
		<nav class="flex gap-2 mt-2 flex-wrap">
			<a href="/app/campaign/{data.campaign.id}" class="btn btn-sm preset-outlined-surface-300-700">Overview</a>

			{#if effectiveRole === 'GM'}
				<a href="/app/campaign/{data.campaign.id}/mystery/new" class="btn btn-sm preset-outlined-surface-300-700">Mysteries</a>
				<a href="/app/campaign/{data.campaign.id}/npc" class="btn btn-sm preset-outlined-surface-300-700">NPCs</a>
				<a href="/app/campaign/{data.campaign.id}/hunter" class="btn btn-sm preset-outlined-surface-300-700">Hunters</a>
				<a href="/app/campaign/{data.campaign.id}/invite" class="btn btn-sm preset-outlined-surface-300-700">Members</a>
			{:else}
				<a href="/app/campaign/{data.campaign.id}/mystery/new" class="btn btn-sm preset-outlined-surface-300-700">Mysteries</a>
				{#if myHunter}
					<a href="/app/campaign/{data.campaign.id}/hunter/{myHunter.id}" class="btn btn-sm preset-outlined-surface-300-700">My Hunter</a>
				{:else}
					<a href="/app/campaign/{data.campaign.id}/hunter/new" class="btn btn-sm preset-filled-primary-500">Create Hunter</a>
				{/if}
				<a href="/app/campaign/{data.campaign.id}/hunter" class="btn btn-sm preset-outlined-surface-300-700">Hunters</a>
			{/if}
		</nav>
	</div>
	{@render children()}
</div>
