<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { badgePreset } from '$lib/badge-preset';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="h1">NPCs</h1>
</div>

<form method="POST" action="?/create" use:enhance class="flex gap-2 items-center mb-6">
	<input class="input flex-1" name="name" placeholder="NPC name..." required />
	<input class="input flex-1" name="description" placeholder="Description (optional)" />
	<button type="submit" class="btn preset-filled-primary-500">Add NPC</button>
</form>

{#if form?.error}
	<p class="text-error-500 text-sm">{form.error}</p>
{/if}

{#if data.npcs.length === 0}
	<p class="text-surface-400 text-center mt-8">No NPCs yet.</p>
{:else}
	<div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
		{#each data.npcs as npc (npc.id)}
			<a href="/app/campaign/{data.campaignId}/npc/{npc.id}" class="card p-4 hover:ring-1 hover:ring-primary-500 transition-all no-underline">
				<div class="flex justify-between items-center">
					<h3 class="h3">{npc.name}</h3>
					<span class="badge {badgePreset(npc.status)}">{npc.status}</span>
				</div>
				{#if npc.description}
					<p class="text-xs text-surface-400 mt-1">{npc.description}</p>
				{/if}
				<div class="flex gap-4 mt-2 text-xs text-surface-400">
					<span>{npc._count.appearances} appearances</span>
					<span>{npc._count.relationships} relationships</span>
				</div>
			</a>
		{/each}
	</div>
{/if}
