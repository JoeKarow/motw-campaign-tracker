<script lang="ts">
	import { Avatar, Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	interface User {
		id: string;
		name: string;
		email: string;
		image: string | null;
	}

	let { open = $bindable(false), onSelect }: { open: boolean; onSelect: (userId: string) => void } = $props();

	let query = $state('');
	let users = $state<User[]>([]);
	let loading = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	function handleOpenChange(details: { open: boolean }) {
		open = details.open;
		if (!details.open) {
			query = '';
			users = [];
		}
	}

	function debouncedSearch(q: string) {
		clearTimeout(debounceTimer);
		if (!q.trim()) {
			users = [];
			return;
		}
		loading = true;
		debounceTimer = setTimeout(async () => {
			try {
				const res = await fetch(`/api/admin/users/search?q=${encodeURIComponent(q)}`);
				if (res.ok) {
					const data = await res.json();
					users = data.users;
				}
			} finally {
				loading = false;
			}
		}, 300);
	}

	function selectUser(userId: string) {
		open = false;
		query = '';
		users = [];
		onSelect(userId);
	}
</script>

<Dialog {open} onOpenChange={handleOpenChange}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="card bg-surface-100-900 w-full max-w-md p-4 space-y-4 shadow-xl">
				<Dialog.Title class="text-lg font-bold">Choose User to Impersonate</Dialog.Title>
				<input
					class="input"
					type="text"
					placeholder="Search by name..."
					bind:value={query}
					oninput={() => debouncedSearch(query)}
				/>
				<div class="max-h-64 overflow-y-auto space-y-1">
					{#if loading}
						<p class="text-sm text-surface-400 px-2 py-1">Searching...</p>
					{:else if users.length === 0 && query.trim()}
						<p class="text-sm text-surface-400 px-2 py-1">No users found</p>
					{/if}
					{#each users as user (user.id)}
						<button
							type="button"
							class="w-full text-left rounded px-3 py-2 hover:preset-tonal transition-colors flex items-center gap-3"
							onclick={() => selectUser(user.id)}
						>
							<Avatar class="w-8 h-8 shrink-0">
								<Avatar.Image src={user.image} alt={user.name} />
								<Avatar.Fallback>{user.name?.charAt(0) ?? '?'}</Avatar.Fallback>
							</Avatar>
							<div>
								<span class="block text-sm font-medium">{user.name}</span>
								<span class="block text-xs text-surface-400">{user.email}</span>
							</div>
						</button>
					{/each}
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
