<script lang="ts">
	import type { PageData } from './$types';
	import { authClient } from '$lib/auth-client';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
	{#if data.user}
		<h1 class="h1">Welcome back, {data.user.name}</h1>
		<a href="/app" class="btn preset-filled-primary-500">Go to Dashboard</a>
	{:else}
		<h1 class="h1">Monster of the Week Tracker</h1>
		<p class="text-surface-400 mb-4">Track your campaigns, mysteries, hunters, and NPCs.</p>
		<button class="btn preset-filled-primary-500" onclick={() => authClient.signIn.social({ provider: 'discord' })}>
			Sign in with Discord
		</button>
	{/if}
</div>
