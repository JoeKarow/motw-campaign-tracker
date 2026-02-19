import { DiscordSDK } from '@discord/embedded-app-sdk';

export type DiscordResult =
	| { sdk: DiscordSDK; mode: 'activity'; accessToken: string }
	| { sdk: null; mode: 'web' };

export async function initDiscord(clientId: string): Promise<DiscordResult> {
	try {
		const sdk = new DiscordSDK(clientId);
		await sdk.ready();

		// Authorize with Discord
		const { code } = await sdk.commands.authorize({
			client_id: clientId,
			response_type: 'code',
			state: '',
			prompt: 'none',
			scope: ['identify', 'guilds']
		});

		// Exchange code for our session token
		const res = await fetch('/api/auth/activity-token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code })
		});

		if (!res.ok) throw new Error('Token exchange failed');

		const { access_token } = await res.json();

		// Authenticate with Discord SDK
		await sdk.commands.authenticate({ access_token });

		return { sdk, mode: 'activity', accessToken: access_token };
	} catch {
		return { sdk: null, mode: 'web' };
	}
}
