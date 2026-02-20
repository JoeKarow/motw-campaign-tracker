import type { CampaignEvent } from '$lib/events';

export function createCampaignEventSource(
	campaignId: string,
	token: string,
	handler: (event: CampaignEvent) => void
) {
	let connected = $state(false);
	let es: EventSource | null = null;
	let retryDelay = 1000;
	let retryTimeout: ReturnType<typeof setTimeout> | null = null;

	function connect() {
		es = new EventSource(`/api/campaign/${campaignId}/events?token=${encodeURIComponent(token)}`);

		es.onopen = () => {
			connected = true;
			retryDelay = 1000;
		};

		es.onmessage = (e) => {
			try {
				const event: CampaignEvent = JSON.parse(e.data);
				handler(event);
			} catch {
				// ignore malformed messages
			}
		};

		es.onerror = () => {
			connected = false;
			es?.close();
			es = null;
			retryTimeout = setTimeout(() => {
				connect();
			}, retryDelay);
			retryDelay = Math.min(retryDelay * 2, 30_000);
		};
	}

	connect();

	function destroy() {
		if (retryTimeout) clearTimeout(retryTimeout);
		es?.close();
		es = null;
		connected = false;
	}

	return {
		get connected() {
			return connected;
		},
		destroy
	};
}
