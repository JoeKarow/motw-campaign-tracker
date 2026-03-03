<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { Combobox, Portal, Avatar, type ComboboxRootProps, useListCollection } from '@skeletonlabs/skeleton-svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let searchResults: { id: string; name: string; image: string | null }[] = $state([]);
	let selectedUserId: string = $state('');
	let debounceTimer: ReturnType<typeof setTimeout> | undefined = $state(undefined);

	const collection = $derived(
		useListCollection({
			items: searchResults,
			itemToString: (item) => item.name,
			itemToValue: (item) => item.id
		})
	);

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		clearTimeout(debounceTimer);
		const query = event.inputValue;
		if (query.length < 2) {
			searchResults = [];
			return;
		}
		debounceTimer = setTimeout(async () => {
			try {
				const res = await fetch(
					`/api/campaign/${data.campaignId}/members/search?q=${encodeURIComponent(query)}`
				);
				if (res.ok) {
					const data = await res.json();
					searchResults = data.users;
				}
			} catch {
				searchResults = [];
			}
		}, 300);
	};

	const onValueChange: ComboboxRootProps['onValueChange'] = (event) => {
		selectedUserId = event.value[0] ?? '';
	};
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

<!-- Add Player by Search -->
<div class="card p-4 mb-6">
	<h2 class="h3 mb-3">Add Player</h2>
	<form
		method="POST"
		action="?/addById"
		use:enhance={() => {
			return async ({ update }) => {
				await update();
				selectedUserId = '';
				searchResults = [];
			};
		}}
		class="flex gap-2 items-center"
	>
		<input type="hidden" name="userId" value={selectedUserId} />
		<Combobox class="flex-1" placeholder="Search by username..." {collection} {onInputValueChange} {onValueChange} openOnClick={false}>
			<Combobox.Control>
				<Combobox.Input />
			</Combobox.Control>
			<Portal>
				<Combobox.Positioner class="z-[1]!">
					<Combobox.Content>
						{#each collection.items as item (item.id)}
							<Combobox.Item {item}>
								<div class="flex items-center gap-2">
									<Avatar class="size-6">
										{#if item.image}
											<Avatar.Image src={item.image} alt={item.name} />
										{/if}
										<Avatar.Fallback>{item.name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
									</Avatar>
									<Combobox.ItemText>{item.name}</Combobox.ItemText>
								</div>
								<Combobox.ItemIndicator />
							</Combobox.Item>
						{/each}
					</Combobox.Content>
				</Combobox.Positioner>
			</Portal>
		</Combobox>
		<button type="submit" class="btn preset-filled-primary-500" disabled={!selectedUserId}>Add</button>
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
