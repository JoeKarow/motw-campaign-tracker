<script lang="ts">
	import { RatingGroup } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		value: number;
		max: number;
		onchange: (v: number) => void;
		name?: string;
		label: string;
		variant: 'harm' | 'luck' | 'xp';
	}

	let { value, max, onchange, name, label, variant }: Props = $props();

	function getFilledColor(variant: 'harm' | 'luck' | 'xp', index: number): string {
		if (variant === 'harm') {
			return index <= 4
				? 'bg-warning-500 border-warning-500'
				: 'bg-error-500 border-error-500';
		}
		if (variant === 'luck') {
			return 'bg-success-500 border-success-500';
		}
		return 'bg-primary-500 border-primary-500';
	}
</script>

<div class="flex flex-row items-center gap-2">
	<RatingGroup count={max} {value} onValueChange={(details) => onchange(details.value)} {name}>
		<RatingGroup.Label class="text-xs text-surface-400 min-w-12">{label}</RatingGroup.Label>
		<RatingGroup.Control>
			<RatingGroup.Context>
				{#snippet children(ratingGroup)}
					{#each ratingGroup().items as index (index)}
						<RatingGroup.Item {index}>
							{#snippet empty()}
								<span class="inline-block size-6 rounded border-2 bg-surface-800 border-surface-600"></span>
							{/snippet}
							{#snippet full()}
								<span class="inline-block size-6 rounded border-2 {getFilledColor(variant, index)}"></span>
							{/snippet}
						</RatingGroup.Item>
					{/each}
				{/snippet}
			</RatingGroup.Context>
		</RatingGroup.Control>
		{#if name}
			<RatingGroup.HiddenInput />
		{/if}
	</RatingGroup>
	<span class="text-xs text-surface-400">{value}/{max}</span>
	{#if value > 0}
		<button type="button" class="text-surface-400 hover:text-surface-200 text-xs leading-none cursor-pointer" onclick={() => onchange(0)} aria-label="Clear {label}">&times;</button>
	{/if}
</div>
