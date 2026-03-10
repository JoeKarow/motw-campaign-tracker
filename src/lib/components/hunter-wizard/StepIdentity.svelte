<script lang="ts">
	import type { WizardState } from './wizard-state.svelte.ts';

	let { state }: { state: WizardState } = $props();

	let customMode: Record<string, boolean> = {};

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
				{@const currentValue = state.lookSelections[category.label] ?? ''}
				{@const isCustom = customMode[category.label] ?? (currentValue !== '' && !category.options.includes(currentValue))}
				<div class="space-y-2">
					<p class="font-semibold">{category.label}</p>
					<div class="flex flex-wrap gap-2">
						{#each category.options as option (option)}
							<button
								type="button"
								class="chip {!isCustom && currentValue === option
									? 'preset-filled-primary-500'
									: 'preset-outlined-surface-300-700'}"
								onclick={() => {
									customMode[category.label] = false;
									state.lookSelections[category.label] = option;
								}}
							>
								{option}
							</button>
						{/each}
						{#if category.allowCustom}
							<button
								type="button"
								class="chip {isCustom
									? 'preset-filled-primary-500'
									: 'preset-outlined-surface-300-700'}"
								onclick={() => {
									customMode[category.label] = true;
									state.lookSelections[category.label] = '';
								}}
							>
								Custom
							</button>
						{/if}
					</div>
					{#if isCustom}
						<input
							class="input max-w-xs"
							type="text"
							placeholder="Custom {category.label.toLowerCase()}"
							value={currentValue}
							oninput={(e) => {
								state.lookSelections[category.label] = e.currentTarget.value;
							}}
							autofocus
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
