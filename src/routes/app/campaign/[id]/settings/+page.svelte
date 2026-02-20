<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedGuildId = $state(data.campaign.discordGuildId ?? '');
	let showSaved = $state(false);

	let selectedGuild = $derived(data.guilds.find((g) => g.id === selectedGuildId) ?? null);

	function handleSubmit() {
		return async ({ result, update }: { result: any; update: () => Promise<void> }) => {
			await update();
			if (result.type === 'success') {
				showSaved = true;
				setTimeout(() => {
					showSaved = false;
				}, 2000);
			}
		};
	}
</script>

<div class="mx-auto max-w-2xl space-y-8 p-4">
	<h2 class="h3">Campaign Settings</h2>

	<section class="card preset-outlined-surface-300-700 space-y-4 p-6">
		<h3 class="h3">Discord Guild Link</h3>
		<p class="text-surface-300">
			Link this campaign to a Discord server. This allows the Discord Activity to automatically load
			the correct campaign when launched from that server.
		</p>

		{#if data.guilds.length === 0}
			<aside class="card preset-outlined-surface-300-700 p-4 text-warning-500">
				Could not fetch your Discord servers. Your Discord token may have expired — try signing out
				and back in.
			</aside>
		{:else}
			<form method="POST" action="?/linkGuild" use:enhance={handleSubmit}>
				<label class="label space-y-2">
					<span>Discord Server</span>
					<div class="flex items-center gap-3">
						{#if selectedGuild?.icon}
							<img
								src="https://cdn.discordapp.com/icons/{selectedGuild.id}/{selectedGuild.icon}.png"
								alt="{selectedGuild.name} icon"
								class="h-8 w-8 rounded-full"
							/>
						{/if}
						<select class="select" name="guildId" bind:value={selectedGuildId}>
							<option value="">(none)</option>
							{#each data.guilds as guild (guild.id)}
								<option value={guild.id}>
									{guild.name}
								</option>
							{/each}
						</select>
					</div>
				</label>

				<div class="mt-4 flex items-center gap-4">
					<button type="submit" class="btn preset-filled-primary-500">Save</button>
					{#if showSaved}
						<span class="text-success-500 transition-opacity">Saved!</span>
					{/if}
				</div>
			</form>
		{/if}
	</section>
</div>
