<script lang="ts">
	let { label, value }: { label: string; value: number } = $props();

	function formatValue(v: number): string {
		return v >= 0 ? `+${v}` : `${v}`;
	}

	function valueBg(v: number): string {
		if (v >= 3) return 'bg-success-700';
		if (v === 2) return 'bg-success-600';
		if (v === 1) return 'bg-success-500';
		if (v === 0) return 'bg-surface-500';
		if (v === -1) return 'bg-error-400';
		return 'bg-error-500';
	}
</script>

<span class="inline-flex rounded-full overflow-hidden">
	<span class="bg-surface-700 px-1.5 py-px text-[0.65rem] leading-tight font-semibold uppercase text-white">
		{label}
	</span>
	<span
		class="{valueBg(value)} px-1.5 py-px text-[0.65rem] leading-tight font-bold font-mono tabular-nums text-white"
	>
		{formatValue(value)}
	</span>
</span>
