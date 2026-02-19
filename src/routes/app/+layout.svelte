<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let anchorSidebar = 'btn hover:preset-tonal justify-start px-2 w-full';

	async function stopImpersonating() {
		await authClient.admin.stopImpersonating();
		await invalidateAll();
		window.location.href = '/app/admin';
	}
</script>

{#if data.isImpersonating}
	<div class="fixed top-0 left-0 right-0 z-50 bg-warning-500 text-black text-center py-2 px-4 flex items-center justify-center gap-4">
		<span class="font-semibold">Impersonating as {data.user.name}</span>
		<button class="btn btn-sm preset-filled-surface-900-50" onclick={stopImpersonating}>Stop Impersonating</button>
	</div>
{/if}

<div class="flex min-h-screen" class:pt-10={data.isImpersonating}>
	<Navigation layout="sidebar" class="grid grid-rows-[auto_1fr_auto] gap-4">
		<Navigation.Header>
			<a href="/app" class="btn preset-filled-primary-500 w-full justify-start px-2">
				<span class="text-lg font-bold">MotW</span>
			</a>
		</Navigation.Header>
		<Navigation.Content>
			<Navigation.Menu>
				<a href="/app" class={anchorSidebar}>Dashboard</a>
				{#if data.user?.role === 'admin'}
					<a href="/app/admin" class={anchorSidebar}>Admin</a>
				{/if}
			</Navigation.Menu>
		</Navigation.Content>
		<Navigation.Footer>
			{#if data.user}
				<span class="text-xs text-surface-400 px-2">{data.user.name}</span>
				<button class="btn btn-sm preset-outlined-surface-300-700 w-full" onclick={() => authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = '/'; } } })}>Sign out</button>
			{/if}
		</Navigation.Footer>
	</Navigation>
	<main class="flex-1 p-8 overflow-y-auto">
		{@render children()}
	</main>
</div>
