<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import {
		WizardState,
		WizardShell,
		StepPlaybook,
		StepIdentity,
		StepMoves,
		StepRatings,
		StepGear,
		StepSpecials,
		StepHistory,
		StepReview,
		hydrateFromDraft,
		determineResumeStep,
	} from '$lib/components/hunter-wizard';

	let { data }: { data: PageData } = $props();

	const wizard = new WizardState();

	// Hydrate from draft if resuming
	if (data.draft) {
		hydrateFromDraft(wizard, data.draft);
		wizard.step = determineResumeStep(wizard);
	}

	let submitting = $state(false);

	const currentStepId = $derived(wizard.currentStepDef?.id);

	const formAction = $derived.by(() => {
		if (currentStepId === 'playbook') return '';
		if (currentStepId === 'identity' && !wizard.hunterId) return '?/createDraft';
		if (currentStepId === 'review') return '?/finalize';
		return '?/saveStep';
	});

	function handleSubmit() {
		return async ({ result, update }: { result: any; update: () => Promise<void> }) => {
			submitting = false;

			if (result.type === 'success') {
				const resultData = result.data;
				if (resultData?.hunterId) {
					wizard.hunterId = resultData.hunterId;
				}
				if (currentStepId === 'identity') {
					wizard.initSectionsFromPlaybook();
					wizard.initHistoryFromPlaybook();
				}
				wizard.goNext();
			} else if (result.type === 'redirect') {
				await update();
			} else if (result.type === 'failure') {
				await update();
			}
		};
	}

	function handlePlaybookChange() {
		if (!wizard.hunterId) return;
		const form = document.getElementById('wizard-playbook-change') as HTMLFormElement;
		if (form) {
			submitting = true;
			form.requestSubmit();
		}
	}

	function handlePlaybookChangeSubmit() {
		return async ({ result }: { result: any }) => {
			submitting = false;
			if (result.type === 'success') {
				wizard.resetForPlaybookChange();
				wizard.initSectionsFromPlaybook();
				wizard.initHistoryFromPlaybook();
				wizard.step = 1;
			}
		};
	}

	// Track playbook changes for draft hunters
	let previousPlaybookId = $state(wizard.playbookId);
	$effect(() => {
		if (wizard.playbookId && wizard.playbookId !== previousPlaybookId && wizard.hunterId) {
			previousPlaybookId = wizard.playbookId;
			handlePlaybookChange();
		} else {
			previousPlaybookId = wizard.playbookId;
		}
	});
</script>

<h1 class="h1 mb-6">Create Your Hunter</h1>

<!-- Hidden form for playbook change action (when draft exists) -->
{#if wizard.hunterId}
	<form
		id="wizard-playbook-change"
		method="POST"
		action="?/changePlaybook"
		use:enhance={handlePlaybookChangeSubmit}
		class="hidden"
	>
		<input type="hidden" name="hunterId" value={wizard.hunterId} />
		<input type="hidden" name="playbookId" value={wizard.playbookId} />
	</form>
{/if}

{#if currentStepId === 'playbook'}
	<WizardShell state={wizard} {submitting}>
		<StepPlaybook state={wizard} />
	</WizardShell>
{:else}
	<form
		method="POST"
		action={formAction}
		use:enhance={() => {
			submitting = true;
			return handleSubmit();
		}}
	>
		<WizardShell state={wizard} {submitting}>
			{#if currentStepId === 'identity'}
				<StepIdentity state={wizard} />
			{:else if currentStepId === 'moves'}
				<StepMoves state={wizard} />
			{:else if currentStepId === 'ratings'}
				<StepRatings state={wizard} />
			{:else if currentStepId === 'gear'}
				<StepGear state={wizard} />
			{:else if currentStepId === 'specials'}
				<StepSpecials state={wizard} />
			{:else if currentStepId === 'history'}
				<StepHistory state={wizard} campaignHunters={data.campaignHunters} />
			{:else if currentStepId === 'review'}
				<StepReview state={wizard} />
			{/if}
		</WizardShell>
	</form>
{/if}
