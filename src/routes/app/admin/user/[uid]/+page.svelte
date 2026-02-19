<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function impersonate() {
		const result = await authClient.admin.impersonateUser({
			userId: data.targetUser.id
		});
		if (!result.error) {
			goto('/app');
		}
	}
</script>

<a href="/app/admin" class="btn btn-sm preset-outlined-surface-300-700 mb-6">Back to Users</a>

<!-- User Profile Card -->
<div class="card p-6 mb-6">
	<div class="flex items-center gap-4 mb-4">
		{#if data.targetUser.image}
			<img src={data.targetUser.image} alt="" class="w-16 h-16 rounded-full" />
		{/if}
		<div>
			<h1 class="h2">{data.targetUser.name}</h1>
			<p class="text-surface-400">{data.targetUser.email}</p>
		</div>
		<div class="ml-auto flex gap-2">
			<span class="badge {data.targetUser.role === 'admin' ? 'preset-filled-warning-500' : 'preset-filled-surface-500'}">
				{data.targetUser.role || 'user'}
			</span>
			{#if data.targetUser.banned}
				<span class="badge preset-filled-error-500">Banned</span>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4 text-sm">
		<div>
			<span class="text-surface-400">User ID:</span>
			<code class="text-xs">{data.targetUser.id}</code>
		</div>
		<div>
			<span class="text-surface-400">Joined:</span>
			{new Date(data.targetUser.createdAt).toLocaleDateString()}
		</div>
		{#if data.targetUser.banned && data.targetUser.banReason}
			<div class="col-span-2">
				<span class="text-surface-400">Ban Reason:</span>
				{data.targetUser.banReason}
			</div>
		{/if}
	</div>

	<div class="mt-4">
		<button class="btn preset-filled-warning-500" onclick={impersonate}>
			Impersonate User
		</button>
	</div>
</div>

<!-- Sessions -->
<div class="card p-6">
	<div class="flex items-center justify-between mb-4">
		<h2 class="h3">Active Sessions ({data.sessions.length})</h2>
		{#if data.sessions.length > 0}
			<form method="POST" action="?/revokeAll" use:enhance>
				<button type="submit" class="btn btn-sm preset-filled-error-500">Revoke All</button>
			</form>
		{/if}
	</div>

	{#if data.sessions.length === 0}
		<p class="text-surface-400">No active sessions.</p>
	{:else}
		<div class="space-y-3">
			{#each data.sessions as session (session.id)}
				<div class="flex items-center justify-between py-3 border-b border-surface-700">
					<div class="text-sm space-y-1">
						<div>
							<span class="text-surface-400">IP:</span>
							{session.ipAddress || 'Unknown'}
						</div>
						<div class="text-xs text-surface-500 max-w-md truncate">
							{session.userAgent || 'Unknown agent'}
						</div>
						<div class="text-xs text-surface-500">
							Created: {new Date(session.createdAt).toLocaleString()}
							— Expires: {new Date(session.expiresAt).toLocaleString()}
						</div>
					</div>
					<form method="POST" action="?/revokeSession" use:enhance>
						<input type="hidden" name="sessionToken" value={session.token} />
						<button type="submit" class="btn btn-sm preset-outlined-error-500">Revoke</button>
					</form>
				</div>
			{/each}
		</div>
	{/if}
</div>
