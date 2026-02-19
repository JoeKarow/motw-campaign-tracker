<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1 class="h1 mb-6">Campaign Members</h1>

<!-- Current Members -->
<div class="card p-4 mb-6">
	<h2 class="h3 mb-3">Members</h2>
	<div class="space-y-2">
		{#each data.members as member (member.id)}
			<div class="flex justify-between items-center py-2 border-b border-surface-700">
				<div class="flex items-center gap-2">
					{#if member.user.image}
						<img src={member.user.image} alt="" class="w-6 h-6 rounded-full" />
					{/if}
					<span>{member.user.name}</span>
					<span class="badge {member.role === 'GM' ? 'preset-filled-primary-500' : 'preset-filled-surface-500'} text-xs">{member.role}</span>
				</div>
				{#if member.role !== 'GM'}
					<form method="POST" action="?/removeMember" use:enhance class="inline">
						<input type="hidden" name="memberId" value={member.id} />
						<button type="submit" class="btn btn-sm preset-outlined-surface-300-700">Remove</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</div>

<!-- Add by Discord Name -->
<div class="card p-4 mb-6">
	<h2 class="h3 mb-3">Add Player by Name</h2>
	<form method="POST" action="?/addByName" use:enhance class="flex gap-2 items-center">
		<input class="input flex-1" name="name" placeholder="Discord username..." required />
		<button type="submit" class="btn preset-filled-primary-500">Add</button>
	</form>
	{#if form?.error}
		<p class="text-error-500 text-sm mt-2">{form.error}</p>
	{/if}
	{#if form?.addedName}
		<p class="text-success-500 text-sm mt-2">Added {form.addedName}!</p>
	{/if}
</div>

<!-- Invite Links -->
<div class="card p-4">
	<h2 class="h3 mb-3">Invite Links</h2>

	<form method="POST" action="?/createInvite" use:enhance class="mb-4">
		<button type="submit" class="btn preset-filled-primary-500">Generate Invite Link</button>
	</form>

	{#if form?.inviteCode}
		<div class="p-3 bg-surface-800 rounded mb-4">
			<p class="text-sm text-surface-300 mb-1">Share this link:</p>
			<code class="text-primary-400 text-sm break-all">{page.url.origin}/app/join/{form.inviteCode}</code>
		</div>
	{/if}

	{#if data.invites.length > 0}
		<div class="space-y-2">
			{#each data.invites as invite (invite.id)}
				<div class="flex justify-between items-center py-2 border-b border-surface-700 text-sm">
					<code class="text-surface-400">{page.url.origin}/app/join/{invite.code}</code>
					<span class="text-xs text-surface-500">{invite.uses} uses</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
