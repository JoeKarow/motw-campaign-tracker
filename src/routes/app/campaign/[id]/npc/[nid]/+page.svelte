<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { badgePreset } from '$lib/badge-preset';

	let { data }: { data: PageData } = $props();
	let npc = $derived(data.npc);
	let isGM = $derived(data.userRole === 'GM');
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="h1">{npc.name}</h1>
	<span class="badge {badgePreset(npc.status)}">{npc.status}</span>
</div>

{#if npc.description}
	<p class="text-surface-300 mb-4">{npc.description}</p>
{/if}

{#if isGM}
	<form method="POST" action="?/update" use:enhance class="card p-4 max-w-lg">
		<label class="label mb-4">
			<span class="label-text">Name</span>
			<input class="input" name="name" value={npc.name} required />
		</label>
		<label class="label mb-4">
			<span class="label-text">Status</span>
			<select class="select" name="status">
				<option value="ALIVE" selected={npc.status === 'ALIVE'}>Alive</option>
				<option value="DEAD" selected={npc.status === 'DEAD'}>Dead</option>
				<option value="MISSING" selected={npc.status === 'MISSING'}>Missing</option>
				<option value="UNKNOWN" selected={npc.status === 'UNKNOWN'}>Unknown</option>
			</select>
		</label>
		<label class="label mb-4">
			<span class="label-text">Description</span>
			<textarea class="textarea" name="description" rows="3">{npc.description ?? ''}</textarea>
		</label>
		<label class="label mb-4">
			<span class="label-text">GM Notes</span>
			<textarea class="textarea" name="notes" rows="3">{npc.notes ?? ''}</textarea>
		</label>
		<button type="submit" class="btn preset-filled-primary-500">Save</button>
	</form>
{/if}

<div class="mt-8">
	<h2 class="h2">Relationships</h2>

	{#each npc.relationships as rel}
		<div class="flex justify-between items-center py-2 border-b border-surface-700 text-sm">
			<span>{npc.name} <strong>{rel.label}</strong> {rel.object.name}</span>
			{#if isGM}
				<form method="POST" action="?/removeRelationship" use:enhance class="inline">
					<input type="hidden" name="relationshipId" value={rel.id} />
					<button type="submit" class="btn btn-sm preset-outlined-surface-300-700">Remove</button>
				</form>
			{/if}
		</div>
	{/each}

	{#each npc.relatedTo as rel}
		<div class="flex justify-between items-center py-2 border-b border-surface-700 text-sm">
			<span>{rel.subject.name} <strong>{rel.label}</strong> {npc.name}</span>
		</div>
	{/each}

	{#if isGM && data.otherNpcs.length > 0}
		<form method="POST" action="?/addRelationship" use:enhance class="flex gap-2 items-center mt-3">
			<input class="input flex-1" name="label" placeholder="e.g. is friends with" required />
			<select class="select flex-1" name="objectId" required>
				<option value="">Select NPC...</option>
				{#each data.otherNpcs as other}
					<option value={other.id}>{other.name}</option>
				{/each}
			</select>
			<button type="submit" class="btn preset-filled-primary-500">Add</button>
		</form>
	{/if}
</div>

<div class="mt-8">
	<h2 class="h2">Appearances</h2>
	{#if npc.appearances.length === 0}
		<p class="text-xs text-surface-400">No appearances recorded.</p>
	{:else}
		<ul class="list-none">
			{#each npc.appearances as app}
				<li class="py-2 border-b border-surface-700 text-sm">
					<strong>{app.session.title}</strong> — {app.session.mystery.title}
					<span class="text-xs text-surface-400">({new Date(app.session.date).toLocaleDateString()})</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
