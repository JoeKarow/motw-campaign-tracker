<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { badgePreset } from '$lib/badge-preset';

	let { data }: { data: PageData } = $props();
	let npc = $derived(data.npc);
	let isGM = $derived(data.userRole === 'GM');
	let descriptions = $derived(npc.details.filter((d) => d.kind === 'DESCRIPTION'));
	let notes = $derived(npc.details.filter((d) => d.kind === 'NOTE'));
	let editingId: string | null = $state(null);
	let editingName = $state(false);
	let editingStatus = $state(false);
	let statusFormEl: HTMLFormElement | undefined = $state();
	let editingCause = $state(false);
	let editingKilledBy = $state(false);
	let killedByType = $state('UNKNOWN');
	let killedByHunterId = $state('');
	let killedByNpcId = $state('');
	let killedByName = $state('');

	const statuses = ['ALIVE', 'DEAD', 'MISSING', 'UNKNOWN'] as const;
	const killedByTypes = ['HUNTER', 'NPC', 'MONSTER', 'ENVIRONMENT', 'UNKNOWN'] as const;
	const killedByLabels: Record<string, string> = {
		HUNTER: 'Hunter',
		NPC: 'NPC',
		MONSTER: 'Monster',
		ENVIRONMENT: 'Environment',
		UNKNOWN: 'Unknown'
	};

	let killedByDisplayText = $derived.by(() => {
		if (!npc.killedByType) return '';
		switch (npc.killedByType) {
			case 'HUNTER':
				return npc.killedByHunter?.name ?? 'Unknown hunter';
			case 'NPC':
				return npc.killedByNpc?.name ?? 'Unknown NPC';
			case 'MONSTER':
			case 'ENVIRONMENT':
				return npc.killedByName ?? '';
			case 'UNKNOWN':
				return 'Unknown';
			default:
				return '';
		}
	});

	function resetKilledByFields() {
		killedByType = npc.killedByType ?? 'UNKNOWN';
		killedByHunterId = npc.killedByHunterId ?? '';
		killedByNpcId = npc.killedByNpcId ?? '';
		killedByName = npc.killedByName ?? '';
	}

	function submitStatus(value: string) {
		if (!statusFormEl) return;
		const input = statusFormEl.querySelector<HTMLInputElement>('input[name="status"]');
		if (input) input.value = value;
		statusFormEl.requestSubmit();
	}

	function handleStatusKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			editingStatus = false;
		}
	}
</script>

<svelte:document onclick={(e) => {
	if (editingStatus && statusFormEl && !statusFormEl.contains(e.target as Node)) {
		editingStatus = false;
	}
}} />

<div class="flex justify-between items-center mb-6">
	{#if editingName}
		<form
			method="POST"
			action="?/update"
			use:enhance={() => {
				return async ({ update }) => {
					editingName = false;
					await update();
				};
			}}
		>
			<input type="hidden" name="status" value={npc.status} />
			<input
				class="h1 bg-transparent border-b-2 border-primary-500 outline-none"
				name="name"
				value={npc.name}
				required
				autofocus
				onkeydown={(e) => {
					if (e.key === 'Escape') {
						e.preventDefault();
						editingName = false;
					}
				}}
				onblur={(e) => e.currentTarget.form?.requestSubmit()}
			/>
		</form>
	{:else}
		<h1 class="h1">
			{#if isGM}
				<button type="button" class="cursor-pointer hover:text-primary-400 transition-colors" onclick={() => (editingName = true)}>{npc.name}</button>
			{:else}
				{npc.name}
			{/if}
		</h1>
	{/if}

	<div class="relative">
		{#if isGM}
			<button type="button" class="badge {badgePreset(npc.status)} cursor-pointer" onclick={(e) => { e.stopPropagation(); editingStatus = !editingStatus; }}>{npc.status}</button>
		{:else}
			<span class="badge {badgePreset(npc.status)}">{npc.status}</span>
		{/if}

		{#if editingStatus}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<form
				bind:this={statusFormEl}
				method="POST"
				action="?/update"
				use:enhance={() => {
					return async ({ update }) => {
						editingStatus = false;
						await update();
					};
				}}
				class="absolute right-0 top-full mt-1 z-10 card p-1 flex flex-col gap-1 shadow-xl"
				onkeydown={handleStatusKeydown}
			>
				<input type="hidden" name="name" value={npc.name} />
				<input type="hidden" name="status" value={npc.status} />
				{#each statuses as status}
					<button
						type="button"
						class="badge {badgePreset(status)} cursor-pointer w-full text-center{status === npc.status ? ' ring-2 ring-white/50' : ''}"
						onclick={() => submitStatus(status)}
					>
						{status}
					</button>
				{/each}
			</form>
		{/if}
	</div>
</div>

{#if npc.status === 'DEAD'}
	<section class="mb-8">
		<h2 class="h2 mb-2">Death Details</h2>

		<div class="space-y-3">
			<!-- Cause of Death -->
			<div>
				<span class="text-sm font-semibold text-surface-400">Cause of Death</span>
				{#if editingCause && isGM}
					<form
						method="POST"
						action="?/update"
						use:enhance={() => {
							return async ({ update }) => {
								editingCause = false;
								await update();
							};
						}}
					>
						<input type="hidden" name="name" value={npc.name} />
						<input type="hidden" name="status" value={npc.status} />
						<input type="hidden" name="killedByType" value={npc.killedByType ?? ''} />
						<input type="hidden" name="killedByHunterId" value={npc.killedByHunterId ?? ''} />
						<input type="hidden" name="killedByNpcId" value={npc.killedByNpcId ?? ''} />
						<input type="hidden" name="killedByName" value={npc.killedByName ?? ''} />
						<input
							class="input mt-1"
							name="causeOfDeath"
							value={npc.causeOfDeath ?? ''}
							placeholder="Describe the cause of death..."
							autofocus
							onkeydown={(e) => {
								if (e.key === 'Escape') {
									e.preventDefault();
									editingCause = false;
								}
							}}
							onblur={(e) => e.currentTarget.form?.requestSubmit()}
						/>
					</form>
				{:else if isGM}
					<button
						type="button"
						class="block mt-1 cursor-pointer hover:text-primary-400 transition-colors {npc.causeOfDeath ? 'text-surface-300' : 'text-surface-500 italic'}"
						onclick={() => (editingCause = true)}
					>
						{npc.causeOfDeath || 'Unknown cause of death'}
					</button>
				{:else}
					<p class="mt-1 text-surface-300">{npc.causeOfDeath || 'Unknown cause of death'}</p>
				{/if}
			</div>

			<!-- Killed By -->
			<div>
				<span class="text-sm font-semibold text-surface-400">Killed By</span>
				{#if editingKilledBy && isGM}
					<form
						method="POST"
						action="?/update"
						use:enhance={() => {
							return async ({ update }) => {
								editingKilledBy = false;
								await update();
							};
						}}
						class="mt-1 space-y-2"
					>
						<input type="hidden" name="name" value={npc.name} />
						<input type="hidden" name="status" value={npc.status} />
						<input type="hidden" name="causeOfDeath" value={npc.causeOfDeath ?? ''} />

						<select
							class="select"
							name="killedByType"
							bind:value={killedByType}
							onchange={() => {
								killedByHunterId = '';
								killedByNpcId = '';
								killedByName = '';
							}}
						>
							{#each killedByTypes as type}
								<option value={type}>{killedByLabels[type]}</option>
							{/each}
						</select>

						{#if killedByType === 'HUNTER'}
							<select class="select" name="killedByHunterId" bind:value={killedByHunterId}>
								<option value="">Select hunter...</option>
								{#each data.hunters as hunter (hunter.id)}
									<option value={hunter.id}>{hunter.name}</option>
								{/each}
							</select>
						{:else if killedByType === 'NPC'}
							<select class="select" name="killedByNpcId" bind:value={killedByNpcId}>
								<option value="">Select NPC...</option>
								{#each data.otherNpcs as other (other.id)}
									<option value={other.id}>{other.name}</option>
								{/each}
							</select>
						{:else if killedByType === 'MONSTER'}
							<input
								class="input"
								name="killedByName"
								placeholder="Monster name..."
								bind:value={killedByName}
							/>
						{:else if killedByType === 'ENVIRONMENT'}
							<input
								class="input"
								name="killedByName"
								placeholder="Environmental cause..."
								bind:value={killedByName}
							/>
						{/if}

						<div class="flex gap-2">
							<button type="submit" class="btn btn-sm preset-filled-primary-500">Save</button>
							<button
								type="button"
								class="btn btn-sm preset-outlined-surface-300-700"
								onclick={() => {
									resetKilledByFields();
									editingKilledBy = false;
								}}
							>Cancel</button>
						</div>
					</form>
				{:else if isGM}
					<button
						type="button"
						class="block mt-1 cursor-pointer hover:text-primary-400 transition-colors {killedByDisplayText ? 'text-surface-300' : 'text-surface-500 italic'}"
						onclick={() => {
							resetKilledByFields();
							editingKilledBy = true;
						}}
					>
						{#if npc.killedByType}
							{killedByLabels[npc.killedByType]}{killedByDisplayText && npc.killedByType !== 'UNKNOWN' ? `: ${killedByDisplayText}` : ''}
						{:else}
							Click to set...
						{/if}
					</button>
				{:else}
					<p class="mt-1 text-surface-300">
						{#if npc.killedByType}
							{killedByLabels[npc.killedByType]}{killedByDisplayText && npc.killedByType !== 'UNKNOWN' ? `: ${killedByDisplayText}` : ''}
						{:else}
							Unknown
						{/if}
					</p>
				{/if}
			</div>
		</div>
	</section>
{/if}

<section class="mb-8">
	<h2 class="h2 mb-2">Description</h2>
	{#if descriptions.length === 0 && !isGM}
		<p class="text-xs text-surface-400">No description yet.</p>
	{/if}
	{#each descriptions as detail (detail.id)}
		{#if editingId === detail.id}
			<form
				method="POST"
				action="?/updateDetail"
				use:enhance={() => {
					return async ({ update }) => {
						editingId = null;
						await update();
					};
				}}
				class="mb-2"
			>
				<input type="hidden" name="detailId" value={detail.id} />
				<textarea class="textarea mb-1" name="text" rows="3">{detail.text}</textarea>
				<div class="flex gap-2">
					<button type="submit" class="btn btn-sm preset-filled-primary-500">Save</button>
					<button type="button" class="btn btn-sm preset-outlined-surface-300-700" onclick={() => (editingId = null)}>Cancel</button>
				</div>
			</form>
		{:else}
			<div class="flex justify-between items-start gap-2 py-2 border-b border-surface-700">
				<p class="text-surface-300 whitespace-pre-wrap">{detail.text}</p>
				{#if isGM}
					<div class="flex gap-1 shrink-0">
						<button type="button" class="btn btn-sm preset-outlined-surface-300-700" onclick={() => (editingId = detail.id)}>Edit</button>
						<form method="POST" action="?/removeDetail" use:enhance class="inline">
							<input type="hidden" name="detailId" value={detail.id} />
							<button type="submit" class="btn btn-sm preset-filled-error-500">Remove</button>
						</form>
					</div>
				{/if}
			</div>
		{/if}
	{/each}
	{#if isGM}
		<form
			method="POST"
			action="?/addDetail"
			use:enhance={() => {
				return async ({ update, result }) => {
					if (result.type === 'success') {
						await update({ reset: true });
					} else {
						await update();
					}
				};
			}}
			class="mt-3"
		>
			<input type="hidden" name="kind" value="DESCRIPTION" />
			<input class="input" name="text" placeholder="Add a description item..." required />
		</form>
	{/if}
</section>

{#if isGM}
	<section class="mb-8">
		<h2 class="h2 mb-2">GM Notes</h2>
		{#if notes.length === 0}
			<p class="text-xs text-surface-400">No notes yet.</p>
		{/if}
		{#each notes as detail (detail.id)}
			{#if editingId === detail.id}
				<form
					method="POST"
					action="?/updateDetail"
					use:enhance={() => {
						return async ({ update }) => {
							editingId = null;
							await update();
						};
					}}
					class="mb-2"
				>
					<input type="hidden" name="detailId" value={detail.id} />
					<textarea class="textarea mb-1" name="text" rows="3">{detail.text}</textarea>
					<div class="flex gap-2">
						<button type="submit" class="btn btn-sm preset-filled-primary-500">Save</button>
						<button type="button" class="btn btn-sm preset-outlined-surface-300-700" onclick={() => (editingId = null)}>Cancel</button>
					</div>
				</form>
			{:else}
				<div class="flex justify-between items-start gap-2 py-2 border-b border-surface-700">
					<p class="text-surface-300 whitespace-pre-wrap">{detail.text}</p>
					<div class="flex gap-1 shrink-0">
						<button type="button" class="btn btn-sm preset-outlined-surface-300-700" onclick={() => (editingId = detail.id)}>Edit</button>
						<form method="POST" action="?/removeDetail" use:enhance class="inline">
							<input type="hidden" name="detailId" value={detail.id} />
							<button type="submit" class="btn btn-sm preset-filled-error-500">Remove</button>
						</form>
					</div>
				</div>
			{/if}
		{/each}
		<form
			method="POST"
			action="?/addDetail"
			use:enhance={() => {
				return async ({ update, result }) => {
					if (result.type === 'success') {
						await update({ reset: true });
					} else {
						await update();
					}
				};
			}}
			class="mt-3"
		>
			<input type="hidden" name="kind" value="NOTE" />
			<input class="input" name="text" placeholder="Add a note..." required />
		</form>
	</section>
{/if}

<div class="mt-8">
	<h2 class="h2">Relationships</h2>

	{#each npc.relationships as rel (rel.id)}
		<div class="flex justify-between items-center py-2 border-b border-surface-700 text-sm">
			<span>{npc.name} <strong>{rel.label}</strong> {rel.object.name}</span>
			{#if isGM}
				<form method="POST" action="?/removeRelationship" use:enhance class="inline">
					<input type="hidden" name="relationshipId" value={rel.id} />
					<button type="submit" class="btn btn-sm preset-outlined-surface-300-700">Remove</button>
				</form>
			{/if}
		</div>
	{/each}

	{#each npc.relatedTo as rel (rel.id)}
		<div class="flex justify-between items-center py-2 border-b border-surface-700 text-sm">
			<span>{rel.subject.name} <strong>{rel.label}</strong> {npc.name}</span>
		</div>
	{/each}

	{#if isGM && data.otherNpcs.length > 0}
		<form method="POST" action="?/addRelationship" use:enhance class="flex gap-2 items-center mt-3">
			<input class="input flex-1" name="label" placeholder="e.g. is friends with" required />
			<select class="select flex-1" name="objectId" required>
				<option value="">Select NPC...</option>
				{#each data.otherNpcs as other (other.id)}
					<option value={other.id}>{other.name}</option>
				{/each}
			</select>
			<button type="submit" class="btn preset-filled-primary-500">Add</button>
		</form>
	{/if}
</div>

<div class="mt-8">
	<h2 class="h2">Appearances</h2>
	{#if npc.appearances.length === 0}
		<p class="text-xs text-surface-400">No appearances recorded.</p>
	{:else}
		<ul class="list-none">
			{#each npc.appearances as app (app.session.id)}
				<li class="py-2 border-b border-surface-700 text-sm">
					<strong>{app.session.title}</strong> — {app.session.mystery.title}
					<span class="text-xs text-surface-400">({new Date(app.session.date).toLocaleDateString()})</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
