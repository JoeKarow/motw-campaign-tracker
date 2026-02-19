<script lang="ts">
	import { devOverrides, resetOverrides } from './dev-overrides.svelte';
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';
	import UserPickerModal from './UserPickerModal.svelte';

	let { isImpersonating = false }: { isImpersonating: boolean } = $props();

	let open = $state(false);
	let modalOpen = $state(false);

	let roleLabel = $derived(
		devOverrides.roleOverride === 'GM'
			? 'GM'
			: devOverrides.roleOverride === 'PLAYER'
				? 'Player'
				: 'Default'
	);

	function setRole(role: 'GM' | 'PLAYER' | null) {
		devOverrides.roleOverride = role;
	}

	async function handleImpersonate(userId: string) {
		await authClient.admin.impersonateUser({ userId });
		window.location.reload();
	}

	async function stopImpersonating() {
		await authClient.admin.stopImpersonating();
		await invalidateAll();
		window.location.href = '/app/admin';
	}
</script>

<UserPickerModal bind:open={modalOpen} onSelect={handleImpersonate} />

<div class="fixed bottom-4 right-4 z-9999 flex flex-col items-end gap-2">
	{#if open}
		<div
			class="w-72 rounded-lg border border-surface-500/30 bg-surface-900/95 p-4 shadow-xl backdrop-blur-sm"
		>
			<div class="mb-3 flex items-center justify-between">
				<h3 class="text-sm font-semibold text-surface-300">Dev Overrides</h3>
				<button
					type="button"
					class="text-surface-400 transition-colors hover:text-surface-100"
					onclick={() => (open = false)}
					aria-label="Close dev tools"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<!-- Campaign Role -->
			<div class="mb-3">
				<p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-surface-400">
					Campaign Role
					<span class="ml-1 normal-case tracking-normal text-primary-400">({roleLabel})</span>
				</p>
				<div class="flex gap-1">
					<button
						type="button"
						class="flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors {devOverrides.roleOverride ===
						'GM'
							? 'bg-primary-500 text-white'
							: 'bg-surface-700 text-surface-300 hover:bg-surface-600'}"
						onclick={() => setRole('GM')}
					>
						GM
					</button>
					<button
						type="button"
						class="flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors {devOverrides.roleOverride ===
						'PLAYER'
							? 'bg-primary-500 text-white'
							: 'bg-surface-700 text-surface-300 hover:bg-surface-600'}"
						onclick={() => setRole('PLAYER')}
					>
						Player
					</button>
					<button
						type="button"
						class="flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors {devOverrides.roleOverride ===
						null
							? 'bg-surface-600 text-white'
							: 'bg-surface-700 text-surface-300 hover:bg-surface-600'}"
						onclick={() => setRole(null)}
					>
						Reset
					</button>
				</div>
			</div>

			<!-- Impersonation -->
			<div class="mb-3">
				<p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-surface-400">
					Impersonation
				</p>
				{#if isImpersonating}
					<button
						type="button"
						class="w-full rounded bg-warning-500 px-2 py-1.5 text-xs font-medium text-black transition-colors hover:bg-warning-400"
						onclick={stopImpersonating}
					>
						Stop Impersonating
					</button>
				{:else}
					<button
						type="button"
						class="w-full rounded bg-surface-700 px-2 py-1.5 text-xs font-medium text-surface-300 transition-colors hover:bg-surface-600"
						onclick={() => (modalOpen = true)}
					>
						Choose User
					</button>
				{/if}
			</div>

			<!-- Reset All -->
			<button
				type="button"
				class="w-full rounded bg-error-500/20 px-2 py-1.5 text-xs font-medium text-error-400 transition-colors hover:bg-error-500/30"
				onclick={resetOverrides}
			>
				Reset All Overrides
			</button>
		</div>
	{/if}

	<!-- Toggle Button -->
	<button
		type="button"
		class="flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-colors {open
			? 'bg-primary-500 text-white'
			: 'bg-surface-800 text-surface-300 hover:bg-surface-700'}"
		onclick={() => (open = !open)}
		aria-label="Dev Tools"
		title="Dev Tools"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</div>
