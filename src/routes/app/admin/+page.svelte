<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let search = $state(page.url.searchParams.get('q') || '');

	function doSearch(e: Event) {
		e.preventDefault();
		const params = new URLSearchParams();
		if (search) params.set('q', search);
		goto(`/app/admin?${params.toString()}`);
	}

	const totalPages = $derived(Math.ceil(data.total / data.limit));
</script>

<h1 class="h1 mb-6">User Management</h1>

<!-- Search -->
<form onsubmit={doSearch} class="flex gap-2 mb-6">
	<input class="input flex-1" bind:value={search} placeholder="Search by email..." />
	<button type="submit" class="btn preset-filled-primary-500">Search</button>
	{#if search}
		<a href="/app/admin" class="btn preset-outlined-surface-300-700">Clear</a>
	{/if}
</form>

<p class="text-sm text-surface-400 mb-4">{data.total} users total</p>

<!-- User Table -->
<div class="card">
	<div class="table-wrap">
		<table class="table">
			<thead>
				<tr>
					<th>User</th>
					<th>Email</th>
					<th>Role</th>
					<th>Status</th>
					<th>Joined</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.users as user (user.id)}
					<tr>
						<td>
							<a href="/app/admin/user/{user.id}" class="flex items-center gap-2 hover:underline">
								{#if user.image}
									<img src={user.image} alt="" class="w-6 h-6 rounded-full" />
								{/if}
								<span>{user.name}</span>
							</a>
						</td>
						<td class="text-sm text-surface-400">{user.email}</td>
						<td>
							<span class="badge text-xs {user.role === 'admin' ? 'preset-filled-warning-500' : 'preset-filled-surface-500'}">
								{user.role || 'user'}
							</span>
						</td>
						<td>
							{#if user.banned}
								<span class="badge preset-filled-error-500 text-xs">Banned</span>
							{:else}
								<span class="badge preset-filled-success-500 text-xs">Active</span>
							{/if}
						</td>
						<td class="text-sm text-surface-400">
							{new Date(user.createdAt).toLocaleDateString()}
						</td>
						<td>
							<div class="flex gap-1 flex-wrap">
								<!-- Set Role -->
								<form method="POST" action="?/setRole" use:enhance class="inline flex gap-1">
									<input type="hidden" name="userId" value={user.id} />
									<select name="role" class="select select-sm w-24 text-xs">
										<option value="user" selected={user.role !== 'admin'}>user</option>
										<option value="admin" selected={user.role === 'admin'}>admin</option>
									</select>
									<button type="submit" class="btn btn-sm preset-outlined-surface-300-700">Set</button>
								</form>

								<!-- Ban / Unban -->
								{#if user.banned}
									<form method="POST" action="?/unban" use:enhance class="inline">
										<input type="hidden" name="userId" value={user.id} />
										<button type="submit" class="btn btn-sm preset-outlined-success-500">Unban</button>
									</form>
								{:else}
									<form method="POST" action="?/ban" use:enhance class="inline">
										<input type="hidden" name="userId" value={user.id} />
										<button type="submit" class="btn btn-sm preset-outlined-error-500">Ban</button>
									</form>
								{/if}

								<!-- Remove -->
								<form method="POST" action="?/removeUser" use:enhance class="inline">
									<input type="hidden" name="userId" value={user.id} />
									<button type="submit" class="btn btn-sm preset-filled-error-500">Remove</button>
								</form>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Pagination -->
{#if totalPages > 1}
	<div class="flex gap-2 mt-4 justify-center">
		{#each Array.from({ length: totalPages }, (_, i) => i + 1) as p (p)}
			<a
				href="/app/admin?page={p}{search ? `&q=${search}` : ''}"
				class="btn btn-sm {p === data.page ? 'preset-filled-primary-500' : 'preset-outlined-surface-300-700'}"
			>
				{p}
			</a>
		{/each}
	</div>
{/if}
