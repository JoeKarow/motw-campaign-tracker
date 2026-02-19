<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-md mx-auto mt-12 text-center">
	<h1 class="h1 mb-4">Join Campaign</h1>
	<p class="text-surface-300 mb-6">You've been invited to join <strong>{data.campaignName}</strong></p>

	{#if form?.error}
		<p class="text-error-500 text-sm mb-4">{form.error}</p>
	{/if}

	<form method="POST" action="?/join" use:enhance>
		<button type="submit" class="btn preset-filled-primary-500 btn-lg">Join Campaign</button>
	</form>
</div>
