<script lang="ts">
	import { authClient } from '$lib/auth-client';

	async function signOut() {
		await authClient.signOut();
		window.location.href = '/';
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="card p-8 max-w-md text-center space-y-4">
		<h1 class="h1">Account Suspended</h1>
		<p class="text-surface-400">Your account has been suspended by an administrator.</p>
		<p class="text-surface-500 text-sm">If you believe this is a mistake, please contact an administrator.</p>
		<button class="btn preset-filled-surface-500" onclick={signOut}>Sign Out</button>
	</div>
</div>
