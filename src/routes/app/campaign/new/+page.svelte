<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="h1">New Campaign</h1>

<form method="POST" use:enhance class="max-w-lg">
	<label class="label mb-4">
		<span class="label-text">Campaign Name</span>
		<input class="input" name="name" type="text" required placeholder="e.g. The Darkwood Files" />
		{#if form?.error}
			<p class="text-error-500 text-sm mt-1">{form.error}</p>
		{/if}
	</label>
	<button type="submit" class="btn preset-filled-primary-500">Create Campaign</button>
</form>
