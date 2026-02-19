<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { authClient } from '$lib/auth-client';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let anchorSidebar = 'btn hover:preset-tonal justify-start px-2 w-full';
</script>

<div class="flex min-h-screen">
	<Navigation layout="sidebar" class="grid grid-rows-[auto_1fr_auto] gap-4">
		<Navigation.Header>
			<a href="/app" class="btn preset-filled-primary-500 w-full justify-start px-2">
				<span class="text-lg font-bold">MotW</span>
			</a>
		</Navigation.Header>
		<Navigation.Content>
			<Navigation.Menu>
				<a href="/app" class={anchorSidebar}>Dashboard</a>
			</Navigation.Menu>
		</Navigation.Content>
		<Navigation.Footer>
			{#if data.user}
				<span class="text-xs text-surface-400 px-2">{data.user.name}</span>
				<button class="btn btn-sm preset-outlined-surface-300-700 w-full" onclick={() => authClient.signOut()}>Sign out</button>
			{/if}
		</Navigation.Footer>
	</Navigation>
	<main class="flex-1 p-8 overflow-y-auto">
		{@render children()}
	</main>
</div>
