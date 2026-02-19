<script lang="ts">
	import ClueList from './ClueList.svelte';

	let {
		scenes,
		currentIndex = 0,
		onnavigate,
		onaddclue
	}: {
		scenes: any[];
		currentIndex: number;
		onnavigate: (index: number) => void;
		onaddclue?: (sceneId: string, description: string) => void;
	} = $props();

	let currentScene = $derived(scenes[currentIndex]);
	let newClue = $state('');
</script>

{#if !currentScene}
	<p class="text-surface-400">No scenes yet.</p>
{:else}
	<div class="p-4">
		<div class="flex items-center justify-between gap-4">
			<button
				class="btn preset-outlined-surface-300-700"
				disabled={currentIndex === 0}
				onclick={() => onnavigate(currentIndex - 1)}
			>
				Prev
			</button>
			<span class="font-semibold text-center">
				Scene {currentScene.order}: {currentScene.title}
				<span class="font-normal text-surface-400 text-sm">({currentIndex + 1}/{scenes.length})</span>
			</span>
			<button
				class="btn preset-outlined-surface-300-700"
				disabled={currentIndex === scenes.length - 1}
				onclick={() => onnavigate(currentIndex + 1)}
			>
				Next
			</button>
		</div>

		{#if currentScene.description}
			<p class="text-surface-400 text-sm mt-2">{currentScene.description}</p>
		{/if}

		<div class="mt-4">
			<h4 class="h4">Clues</h4>
			<ClueList clues={currentScene.clues ?? []} />

			{#if onaddclue}
				<div class="flex gap-2 mt-3">
					<input class="input flex-1" bind:value={newClue} placeholder="New clue..." />
					<button
						class="btn preset-filled-primary-500"
						onclick={() => {
							if (newClue.trim()) {
								onaddclue?.(currentScene.id, newClue.trim());
								newClue = '';
							}
						}}
					>
						Add
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
