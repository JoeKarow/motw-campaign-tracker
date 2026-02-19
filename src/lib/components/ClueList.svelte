<script lang="ts">
	import type { ClueModel } from '$lib/generated/prisma/models/Clue';

	let { clues }: { clues: ClueModel[] } = $props();
</script>

<div class="flex flex-col gap-2">
	{#if clues.length === 0}
		<p class="text-surface-400 text-sm">No clues discovered yet.</p>
	{:else}
		{#each clues as clue (clue.id)}
			<div class="border-l-[3px] border-primary-500 pl-3 py-1">
				<p class="text-sm">{clue.description}</p>
				{#if clue.significance}
					<p class="text-surface-400 text-xs"><em>{clue.significance}</em></p>
				{/if}
			</div>
		{/each}
	{/if}
</div>
