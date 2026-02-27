<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { WizardState } from './wizard-state.svelte.ts';

	interface Props {
		state: WizardState;
		submitting: boolean;
		children: Snippet;
	}

	let { state, submitting, children }: Props = $props();

	let isFirstStep = $derived(state.step === 0);
	let isPlaybookStep = $derived(state.currentStepDef?.id === 'playbook');
</script>

<div class="flex flex-col gap-6">
	<!-- Step indicator bar -->
	<nav class="flex items-center gap-1 overflow-x-auto px-2" aria-label="Wizard steps">
		{#each state.effectiveSteps as stepDef, i (stepDef.id)}
			{@const isCurrent = i === state.step}
			{@const isPast = i < state.step}
			{@const isFuture = i > state.step}

			{#if i > 0}
				<div
					class="h-0.5 w-4 flex-shrink-0 {isPast ? 'bg-primary-500' : 'bg-surface-400'}"
				></div>
			{/if}

			<button
				type="button"
				class="flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors
					{isCurrent ? 'ring-2 ring-primary-500 bg-primary-500/10 text-primary-500' : ''}
					{isPast ? 'bg-surface-200-800 text-surface-700-200 hover:bg-primary-500/10 cursor-pointer' : ''}
					{isFuture ? 'text-surface-400 cursor-default opacity-50' : ''}"
				disabled={isFuture || isCurrent}
				onclick={() => state.goToStep(i)}
				aria-current={isCurrent ? 'step' : undefined}
			>
				<span
					class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold
						{isCurrent ? 'bg-primary-500 text-white' : ''}
						{isPast ? 'bg-primary-500/20 text-primary-500' : ''}
						{isFuture ? 'bg-surface-300-700 text-surface-500' : ''}"
				>
					{i + 1}
				</span>
				<span class="hidden sm:inline">{stepDef.label}</span>
			</button>
		{/each}
	</nav>

	<!-- Content area -->
	<div class="min-h-[300px]">
		{@render children()}
	</div>

	<!-- Bottom navigation buttons -->
	<footer class="flex items-center justify-between border-t border-surface-300-700 pt-4">
		<button
			type="button"
			class="btn preset-outlined-surface-500"
			disabled={isFirstStep || submitting}
			onclick={() => state.goBack()}
		>
			Back
		</button>

		<div>
			{#if state.isLastStep}
				<button
					type="submit"
					class="btn preset-filled-primary-500"
					disabled={submitting}
				>
					{submitting ? 'Saving…' : 'Finalize Hunter'}
				</button>
			{:else if isPlaybookStep}
				<button
					type="button"
					class="btn preset-filled-primary-500"
					disabled={!state.canGoNext || submitting}
					onclick={() => state.goNext()}
				>
					Next
				</button>
			{:else}
				<button
					type="submit"
					class="btn preset-filled-primary-500"
					disabled={!state.canGoNext || submitting}
				>
					Next
				</button>
			{/if}
		</div>
	</footer>
</div>
