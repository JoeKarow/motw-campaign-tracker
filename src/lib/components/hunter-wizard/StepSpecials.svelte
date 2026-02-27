<script lang="ts">
	import type { WizardState } from './wizard-state.svelte.ts';
	import type {
		PickSectionDefinition,
		BuilderSectionDefinition,
		TextInputSectionDefinition,
	} from '$lib/playbooks/types';

	let { state }: { state: WizardState } = $props();

	let customSections = $derived(state.playbook?.customSections ?? []);

	function togglePick(sectionIdx: number, label: string, pickCount: number) {
		const selection = state.sectionSelections[sectionIdx];
		if (!selection.picks) return;

		if (selection.picks.includes(label)) {
			state.sectionSelections[sectionIdx].picks = selection.picks.filter((l) => l !== label);
		} else if (selection.picks.length < pickCount) {
			state.sectionSelections[sectionIdx].picks = [...selection.picks, label];
		}
	}

	function toggleBuilderStep(sectionIdx: number, stepIdx: number, label: string, pickCount: number) {
		const selection = state.sectionSelections[sectionIdx];
		if (!selection.builderSteps) return;

		const stepPicks = selection.builderSteps[stepIdx];
		if (stepPicks.includes(label)) {
			const updated = [...selection.builderSteps];
			updated[stepIdx] = stepPicks.filter((l) => l !== label);
			state.sectionSelections[sectionIdx].builderSteps = updated;
		} else if (stepPicks.length < pickCount) {
			const updated = [...selection.builderSteps];
			updated[stepIdx] = [...stepPicks, label];
			state.sectionSelections[sectionIdx].builderSteps = updated;
		}
	}

	function setTextValue(sectionIdx: number, fieldLabel: string, value: string) {
		const selection = state.sectionSelections[sectionIdx];
		if (!selection.textValues) return;
		state.sectionSelections[sectionIdx].textValues = {
			...selection.textValues,
			[fieldLabel]: value,
		};
	}

	interface FeatureEntry {
		section: string;
		label: string;
		description?: string;
		value?: string;
		effects?: Record<string, unknown>;
		order: number;
	}

	let featuresForSubmit = $derived.by(() => {
		const features: FeatureEntry[] = [];

		for (let i = 0; i < customSections.length; i++) {
			const section = customSections[i];
			const selection = state.sectionSelections[i];
			if (!selection) continue;

			if (section.type === 'pick' && selection.picks) {
				const pickSection = section as PickSectionDefinition;
				for (let pickIdx = 0; pickIdx < selection.picks.length; pickIdx++) {
					const label = selection.picks[pickIdx];
					const option = pickSection.options.find((o) => o.label === label);
					features.push({
						section: section.key,
						label,
						description: option?.description,
						order: pickIdx,
					});
				}
			} else if (section.type === 'builder' && selection.builderSteps) {
				const builderSection = section as BuilderSectionDefinition;
				for (let stepIdx = 0; stepIdx < selection.builderSteps.length; stepIdx++) {
					const stepPicks = selection.builderSteps[stepIdx];
					for (let pickIdx = 0; pickIdx < stepPicks.length; pickIdx++) {
						const label = stepPicks[pickIdx];
						const option = builderSection.steps[stepIdx]?.options.find(
							(o) => o.label === label
						);
						features.push({
							section: section.key,
							label,
							effects: option?.effects,
							order: stepIdx * 100 + pickIdx,
						});
					}
				}
			} else if (section.type === 'text-input' && selection.textValues) {
				const textSection = section as TextInputSectionDefinition;
				for (let fieldIdx = 0; fieldIdx < textSection.fields.length; fieldIdx++) {
					const field = textSection.fields[fieldIdx];
					const textValue = selection.textValues[field.label];
					if (textValue) {
						features.push({
							section: section.key,
							label: field.label,
							value: textValue,
							order: fieldIdx,
						});
					}
				}
			}
		}

		return features;
	});
</script>

<div class="space-y-8">
	{#each customSections as section, sectionIdx (section.key)}
		{@const selection = state.sectionSelections[sectionIdx]}

		{#if selection}
			<div class="space-y-4">
				<div>
					<h3 class="h4">{section.title}</h3>
					<p class="text-surface-600-400 mt-1 text-sm">{section.description}</p>
				</div>

				{#if section.type === 'pick'}
					{@const pickSection = section as PickSectionDefinition}
					{@const picks = selection.picks ?? []}
					{@const remaining = pickSection.pickCount - picks.length}

					<p class="text-lg font-semibold">
						Pick {pickSection.pickCount} &mdash;
						{#if remaining > 0}
							{remaining} remaining
						{:else}
							<span class="text-success-500">All picked</span>
						{/if}
					</p>

					<div class="space-y-3">
						{#each pickSection.options as option (option.label)}
							{@const isSelected = picks.includes(option.label)}
							{@const isDisabled = !isSelected && remaining === 0}
							<button
								type="button"
								class="card w-full p-4 text-left transition-all {isSelected
									? 'preset-outlined-primary-500 ring-primary-500 ring-2'
									: 'preset-outlined-surface-300-700'} {isDisabled
									? 'cursor-not-allowed opacity-50'
									: 'cursor-pointer'}"
								disabled={isDisabled}
								onclick={() => togglePick(sectionIdx, option.label, pickSection.pickCount)}
							>
								<div class="flex items-start justify-between gap-2">
									<div class="min-w-0 flex-1">
										<p class="font-bold">{option.label}</p>
										{#if option.description}
											<p class="text-surface-600-400 mt-1 text-sm">{option.description}</p>
										{/if}
									</div>
									{#if isSelected}
										<svg
											class="text-primary-500 size-5 shrink-0"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									{/if}
								</div>
							</button>
						{/each}
					</div>
				{:else if section.type === 'builder'}
					{@const builderSection = section as BuilderSectionDefinition}
					{@const builderSteps = selection.builderSteps ?? []}

					<div class="space-y-6">
						{#each builderSection.steps as step, stepIdx (step.label)}
							{@const stepPicks = builderSteps[stepIdx] ?? []}
							{@const stepRemaining = step.pickCount - stepPicks.length}

							<div class="space-y-3">
								<p class="font-semibold">
									{step.label} &mdash; Pick {step.pickCount}
									{#if stepRemaining > 0}
										({stepRemaining} remaining)
									{:else}
										<span class="text-success-500">(done)</span>
									{/if}
								</p>

								<div class="flex flex-wrap gap-2">
									{#each step.options as option (option.label)}
										{@const isSelected = stepPicks.includes(option.label)}
										{@const isDisabled = !isSelected && stepRemaining === 0}
										<button
											type="button"
											class="chip px-4 py-2 transition-all {isSelected
												? 'preset-filled-primary-500'
												: 'preset-outlined-surface-300-700'} {isDisabled
												? 'cursor-not-allowed opacity-50'
												: 'cursor-pointer'}"
											disabled={isDisabled}
											onclick={() =>
												toggleBuilderStep(sectionIdx, stepIdx, option.label, step.pickCount)}
										>
											{option.label}
										</button>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{:else if section.type === 'text-input'}
					{@const textSection = section as TextInputSectionDefinition}
					{@const textValues = selection.textValues ?? {}}

					<div class="space-y-4">
						{#each textSection.fields as field (field.label)}
							<label class="label">
								<span>{field.label}</span>
								<input
									type="text"
									class="input"
									placeholder={field.placeholder ?? ''}
									value={textValues[field.label] ?? ''}
									oninput={(e) => setTextValue(sectionIdx, field.label, e.currentTarget.value)}
								/>
							</label>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{/each}

	<!-- Hidden form inputs for submission -->
	<input type="hidden" name="hunterId" value={state.hunterId ?? ''} />
	<input type="hidden" name="stepId" value="specials" />
	<input type="hidden" name="features" value={JSON.stringify(featuresForSubmit)} />
</div>
