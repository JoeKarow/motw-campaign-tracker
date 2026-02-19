<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
	import { initDiscord } from '$lib/discord';
	import { setDiscordContext } from '$lib/discord-context';
	import type { DiscordResult } from '$lib/discord';

	let { children } = $props();
	let loading = $state(true);
	let discordResult = $state<DiscordResult>({ sdk: null, mode: 'web' });

	onMount(async () => {
		discordResult = await initDiscord(PUBLIC_DISCORD_CLIENT_ID);
		setDiscordContext(discordResult);
		loading = false;
	});
</script>

{#if loading}
	<div class="flex items-center justify-center min-h-screen text-surface-400">
		<p>Connecting to Discord...</p>
	</div>
{:else}
	{@render children()}
{/if}
