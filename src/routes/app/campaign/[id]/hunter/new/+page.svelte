<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	const PLAYBOOKS = [
		'The Chosen',
		'The Constructed',
		'The Crooked',
		'The Divine',
		'The Exile',
		'The Expert',
		'The Flake',
		'The Hard Case',
		'The Initiate',
		'The Meddling Kid',
		'The Monstrous',
		'The Mundane',
		'The Professional',
		'The Sidekick',
		'The Snoop',
		'The Spell-Slinger',
		'The Spooky',
		'The Wronged'
	];

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="h1">Create Your Hunter</h1>

<form method="POST" use:enhance class="max-w-lg mt-4">
	<label class="label mb-4">
		<span class="label-text">Name</span>
		<input class="input" name="name" type="text" required placeholder="e.g. Ash Williams" />
	</label>

	<label class="label mb-4">
		<span class="label-text">Playbook</span>
		<select class="select" name="playbook" required>
			<option value="">Select a playbook...</option>
			{#each PLAYBOOKS as playbook}
				<option value={playbook}>{playbook}</option>
			{/each}
		</select>
	</label>

	<label class="label mb-4">
		<span class="label-text">Look (optional)</span>
		<textarea class="textarea" name="look" rows="2" placeholder="Describe your hunter's appearance..."></textarea>
	</label>

	{#if form?.error}
		<p class="text-error-500 text-sm mt-1">{form.error}</p>
	{/if}

	<button type="submit" class="btn preset-filled-primary-500">Create Hunter</button>
</form>
