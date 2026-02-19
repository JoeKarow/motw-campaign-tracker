<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { badgePreset } from '$lib/badge-preset';

	let { data }: { data: PageData } = $props();
	let mystery = $derived(data.mystery);
	let isGM = $derived(data.userRole === 'GM');
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="h1">{mystery.title}</h1>
	<span class="badge {badgePreset(mystery.status)}">{mystery.status}</span>
</div>

<div class="text-sm text-surface-400 space-y-1 mb-4">
	{#if mystery.monsterType}<p><strong>Monster:</strong> {mystery.monsterType}</p>{/if}
	{#if mystery.location}<p><strong>Location:</strong> {mystery.location}</p>{/if}
	{#if isGM && mystery.monsterWeakness}<p><strong>Weakness:</strong> {mystery.monsterWeakness}</p>{/if}
	{#if isGM && mystery.howItWasKilled}<p><strong>Resolution:</strong> {mystery.howItWasKilled}</p>{/if}
</div>

{#if isGM}
	<!-- Status Update -->
	<details class="card p-4 mt-4">
		<summary class="cursor-pointer text-surface-400 text-sm">Update Status</summary>
		<form method="POST" action="?/updateStatus" use:enhance class="mt-3">
			<label class="label mb-4">
				<span class="label-text">Status</span>
				<select class="select" name="status">
					<option value="ACTIVE" selected={mystery.status === 'ACTIVE'}>Active</option>
					<option value="RESOLVED" selected={mystery.status === 'RESOLVED'}>Resolved</option>
					<option value="ABANDONED" selected={mystery.status === 'ABANDONED'}>Abandoned</option>
				</select>
			</label>
			<label class="label mb-4">
				<span class="label-text">Monster Weakness</span>
				<input class="input" name="monsterWeakness" value={mystery.monsterWeakness ?? ''} />
			</label>
			<label class="label mb-4">
				<span class="label-text">How It Was Killed</span>
				<input class="input" name="howItWasKilled" value={mystery.howItWasKilled ?? ''} />
			</label>
			<button type="submit" class="btn preset-filled-primary-500">Update</button>
		</form>
	</details>

	<!-- New Session -->
	<div class="mt-8">
		<div class="flex justify-between items-center mb-4">
			<h2 class="h2">Sessions</h2>
		</div>

		<form method="POST" action="?/createSession" use:enhance class="flex gap-2 items-center">
			<input class="input flex-1" name="title" placeholder="Session title..." required />
			<button type="submit" class="btn preset-filled-primary-500">Add Session</button>
		</form>
	</div>

	<!-- Sessions List (GM view with full controls) -->
	{#each mystery.sessions as session (session.id)}
		<div class="card p-4 mt-4">
			<div class="flex justify-between items-center">
				<h3 class="h3">{session.title}</h3>
				<div class="flex gap-2 items-center">
					<span class="text-xs text-surface-400">{new Date(session.date).toLocaleDateString()}</span>
					{#if session.isActive}
						<span class="badge preset-filled-primary-500">LIVE</span>
					{/if}
				</div>
			</div>

			<!-- Session Controls -->
			<details class="mt-3">
				<summary class="cursor-pointer text-surface-400 text-sm">Session Settings</summary>
				<form method="POST" action="?/updateSession" use:enhance class="mt-2">
					<input type="hidden" name="sessionId" value={session.id} />
					<input type="hidden" name="campaignId" value={data.campaign.id} />
					<label class="label mb-4">
						<span class="label-text">Summary</span>
						<textarea class="textarea" name="summary" rows="3">{session.summary ?? ''}</textarea>
					</label>
					<label class="flex items-center gap-2 text-sm mb-2">
						<input type="checkbox" name="isActive" value="true" checked={session.isActive} class="w-auto" />
						Mark as active session
					</label>
					<button type="submit" class="btn preset-filled-primary-500">Save</button>
				</form>
			</details>

			<!-- Attendance -->
			<details class="mt-2">
				<summary class="cursor-pointer text-surface-400 text-sm">Attendance ({session.attendees.length})</summary>
				<div class="flex flex-wrap gap-2 mt-2">
					{#each data.hunters as hunter (hunter.id)}
						{@const attending = session.attendees.some((a: any) => a.hunterId === hunter.id)}
						<form method="POST" action="?/toggleAttendance" use:enhance class="inline">
							<input type="hidden" name="sessionId" value={session.id} />
							<input type="hidden" name="hunterId" value={hunter.id} />
							<button type="submit" class="btn btn-sm {attending ? 'preset-filled-primary-500' : 'preset-outlined-surface-300-700'}">
								{hunter.name} ({hunter.playbook})
							</button>
						</form>
					{/each}
				</div>
			</details>

			<!-- NPC Appearances -->
			<details class="mt-2">
				<summary class="cursor-pointer text-surface-400 text-sm">NPCs ({session.npcAppearances.length})</summary>
				<div class="flex flex-wrap gap-2 mt-2">
					{#each data.npcs as npc (npc.id)}
						{@const appearing = session.npcAppearances.some((a: any) => a.npcId === npc.id)}
						<form method="POST" action="?/toggleNpcAppearance" use:enhance class="inline">
							<input type="hidden" name="sessionId" value={session.id} />
							<input type="hidden" name="npcId" value={npc.id} />
							<button type="submit" class="btn btn-sm {appearing ? 'preset-filled-primary-500' : 'preset-outlined-surface-300-700'}">
								{npc.name}
							</button>
						</form>
					{/each}
				</div>
			</details>

			<!-- Scenes -->
			<div class="mt-3">
				<h4 class="h4">Scenes</h4>
				<form method="POST" action="?/addScene" use:enhance class="flex gap-2 items-center mt-2">
					<input type="hidden" name="sessionId" value={session.id} />
					<input class="input flex-1" name="title" placeholder="Scene title..." required />
					<input class="input flex-1" name="description" placeholder="Description (optional)" />
					<button type="submit" class="btn preset-filled-primary-500">Add</button>
				</form>

				{#each session.scenes as scene (scene.id)}
					<div class="border-l-2 border-surface-600 pl-4 mt-2 py-1">
						<strong>Scene {scene.order}: {scene.title}</strong>
						{#if scene.description}
							<p class="text-xs text-surface-400">{scene.description}</p>
						{/if}

						<!-- Clues -->
						<div class="mt-2 pl-4">
							{#each scene.clues as clue (clue.id)}
								<div class="py-1 border-b border-surface-700">
									<p class="text-sm">{clue.description}</p>
									{#if clue.significance}
										<p class="text-xs text-surface-400"><em>{clue.significance}</em></p>
									{/if}
								</div>
							{/each}

							<form method="POST" action="?/addClue" use:enhance class="flex gap-2 items-center mt-2">
								<input type="hidden" name="sceneId" value={scene.id} />
								<input class="input flex-1" name="description" placeholder="New clue..." required />
								<input class="input flex-1" name="significance" placeholder="Significance (optional)" />
								<button type="submit" class="btn preset-filled-primary-500">Add Clue</button>
							</form>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
{:else}
	<!-- Player view: read-only sessions -->
	{#if mystery.sessions.length > 0}
		<h2 class="h2 mt-8">Sessions</h2>
		{#each mystery.sessions as session (session.id)}
			<div class="card p-4 mt-4">
				<div class="flex justify-between items-center">
					<h3 class="h3">{session.title}</h3>
					<div class="flex gap-2 items-center">
						<span class="text-xs text-surface-400">{new Date(session.date).toLocaleDateString()}</span>
						{#if session.isActive}
							<span class="badge preset-filled-primary-500">LIVE</span>
						{/if}
					</div>
				</div>
				{#if session.summary}
					<p class="text-sm text-surface-400 mt-2">{session.summary}</p>
				{/if}

				{#if session.scenes.length > 0}
					<div class="mt-3">
						<h4 class="h4">Scenes</h4>
						{#each session.scenes as scene (scene.id)}
							<div class="border-l-2 border-surface-600 pl-4 mt-2 py-1">
								<strong>Scene {scene.order}: {scene.title}</strong>
								{#if scene.description}
									<p class="text-xs text-surface-400">{scene.description}</p>
								{/if}
								{#each scene.clues as clue (clue.id)}
									<div class="py-1 border-b border-surface-700">
										<p class="text-sm">{clue.description}</p>
										{#if clue.significance}
											<p class="text-xs text-surface-400"><em>{clue.significance}</em></p>
										{/if}
									</div>
								{/each}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	{/if}
{/if}
