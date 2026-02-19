<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1 class="h1">New Mystery</h1>

<form method="POST" use:enhance class="max-w-lg">
	<label class="label mb-4">
		<span class="label-text">Title</span>
		<input class="input" name="title" type="text" required placeholder="e.g. The Beast of Blackwood" />
	</label>
	<label class="label mb-4">
		<span class="label-text">Monster Type</span>
		<input class="input" name="monsterType" type="text" placeholder="e.g. Werewolf, Vampire, Spirit" />
	</label>
	<label class="label mb-4">
		<span class="label-text">Location</span>
		<input class="input" name="location" type="text" placeholder="e.g. Blackwood Forest" />
	</label>
	{#if form?.error}
		<p class="text-error-500 text-sm mt-1">{form.error}</p>
	{/if}
	<button type="submit" class="btn preset-filled-primary-500">Create Mystery</button>
</form>
