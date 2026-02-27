<script lang="ts">
	import type { WizardState } from './wizard-state.svelte.ts';

	let { state }: { state: WizardState } = $props();

	let lookString = $derived(
		state.playbook
			? state.playbook.looks.map((cat) => state.lookSelections[cat.label] ?? '').filter(Boolean).join(', ')
			: ''
	);
</script>

<div class="space-y-6">
	<label class="label">
		<span>Name *</span>
		<input class="input" type="text" placeholder="Hunter name" bind:value={state.name} required />
	</label>

	<label class="label">
		<span>Pronouns</span>
		<input
			class="input"
			type="text"
			placeholder="e.g. she/her, they/them"
			bind:value={state.pronouns}
		/>
	</label>

	{#if state.playbook}
		<div class="space-y-4">
			<h3 class="h4">Look</h3>
			{#each state.playbook.looks as category (category.label)}
				<div class="space-y-2">
					<p class="font-semibold">{category.label}</p>
					<div class="flex flex-wrap gap-2">
						{#each category.options as option (option)}
							<button
								type="button"
								class="chip {state.lookSelections[category.label] === option
									? 'preset-filled-primary-500'
									: 'preset-outlined-surface-300-700'}"
								onclick={() => {
									state.lookSelections[category.label] = option;
								}}
							>
								{option}
							</button>
						{/each}
					</div>
					{#if category.allowCustom}
						<input
							class="input max-w-xs"
							type="text"
							placeholder="Custom {category.label.toLowerCase()}"
							value={state.lookSelections[category.label] ?? ''}
							oninput={(e) => {
								state.lookSelections[category.label] = e.currentTarget.value;
							}}
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- Hidden form inputs for submission -->
	<input type="hidden" name="name" value={state.name} />
	<input type="hidden" name="pronouns" value={state.pronouns} />
	<input type="hidden" name="playbookId" value={state.playbookId ?? ''} />
	<input type="hidden" name="look" value={lookString} />
</div>
