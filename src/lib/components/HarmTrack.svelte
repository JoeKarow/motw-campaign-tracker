<script lang="ts">
	let {
		value = 0,
		max = 7,
		onchange
	}: { value: number; max: number; onchange: (v: number) => void } = $props();
</script>

<div class="flex items-center gap-2">
	<span class="text-xs text-surface-400 min-w-12">Harm</span>
	<div class="flex gap-1">
		{#each Array(max) as _, i (i)}
			<button
				class="w-8 h-8 rounded border-2 p-0 cursor-pointer {i < value ? (i >= 4 ? 'bg-error-500 border-error-500' : 'bg-warning-500 border-warning-500') : 'bg-surface-800 border-surface-600'}"
				onclick={() => onchange(i < value ? i : i + 1)}
				aria-label="Harm {i + 1}"
			></button>
		{/each}
	</div>
	<span class="text-xs text-surface-400">{value}/{max}</span>
</div>
