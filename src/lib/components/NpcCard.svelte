<script lang="ts">
	import { badgePreset } from '$lib/badge-preset';

	let { npc, onstatuschange }: { npc: any; onstatuschange?: (status: string) => void } = $props();

	const statuses = ['ALIVE', 'DEAD', 'MISSING', 'UNKNOWN'];
</script>

<div class="card p-4">
	<div class="flex justify-between items-center">
		<strong>{npc.name}</strong>
		<span class="badge {badgePreset(npc.status)}">{npc.status}</span>
	</div>
	{#if onstatuschange}
		<div class="flex gap-1 mt-2">
			{#each statuses as status (status)}
				<button
					class="btn btn-sm {npc.status === status ? 'preset-filled-primary-500' : 'preset-outlined-surface-300-700'}"
					onclick={() => onstatuschange?.(status)}
				>
					{status}
				</button>
			{/each}
		</div>
	{/if}
</div>
