<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
	import { initDiscord } from '$lib/discord';
	import { setDiscordContext } from '$lib/discord-context.svelte';

	let { children } = $props();
	let loading = $state(true);

	// Set context synchronously during init with default value
	const discordState = setDiscordContext({ sdk: null, mode: 'web' });

	onMount(async () => {
		const result = await initDiscord(PUBLIC_DISCORD_CLIENT_ID);
		discordState.current = result;
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
