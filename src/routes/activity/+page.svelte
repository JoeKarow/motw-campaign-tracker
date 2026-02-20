<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getDiscordContext, getActivityFetch } from '$lib/discord-context.svelte';

	const discord = getDiscordContext();
	const afetch = getActivityFetch();

	let campaigns = $state<{ id: string; name: string; userRole: string }[]>([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			const guildId = discord.mode === 'activity' ? discord.sdk.guildId : null;
			const params = guildId ? `?guildId=${guildId}` : '';
			const res = await afetch(`/api/campaign/by-guild${params}`);

			if (!res.ok) {
				error = 'Failed to load campaigns';
				return;
			}

			const data = await res.json();
			campaigns = data.campaigns;

			// Auto-redirect if guild matched exactly one campaign
			if (guildId && campaigns.length === 1) {
				goto(`/activity/${campaigns[0].id}/`, { replaceState: true });
				return;
			}
		} catch {
			error = 'Failed to load campaigns';
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="flex items-center justify-center min-h-screen text-surface-400">
		<p>Loading campaigns...</p>
	</div>
{:else if error}
	<div class="flex flex-col items-center justify-center min-h-screen gap-4 text-surface-400">
		<p>{error}</p>
	</div>
{:else if campaigns.length === 0}
	<div class="flex flex-col items-center justify-center min-h-screen gap-4 text-surface-400">
		<p>No campaigns found.</p>
		{#if discord.mode === 'web'}
			<a href="/app" class="btn preset-filled-primary-500">Go to Dashboard</a>
		{/if}
	</div>
{:else}
	<div class="p-6 max-w-md mx-auto">
		<h2 class="h3 mb-4">Select a Campaign</h2>
		<div class="space-y-2">
			{#each campaigns as campaign (campaign.id)}
				<a
					href="/activity/{campaign.id}/"
					class="card preset-outlined-surface-300-700 p-4 block hover:preset-filled-surface-500 transition-colors"
				>
					<span class="font-semibold">{campaign.name}</span>
					<span class="badge preset-filled-surface-500 ml-2">{campaign.userRole}</span>
				</a>
			{/each}
		</div>
	</div>
{/if}
