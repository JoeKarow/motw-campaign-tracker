import type { CampaignEvent } from '$lib/events';

interface Subscriber {
	controller: ReadableStreamDefaultController;
	heartbeat: ReturnType<typeof setInterval>;
}

const channels = new Map<string, Set<Subscriber>>();

export function subscribe(campaignId: string): ReadableStream {
	const stream = new ReadableStream({
		start(controller) {
			const sub: Subscriber = {
				controller,
				heartbeat: setInterval(() => {
					try {
						controller.enqueue(': heartbeat\n\n');
					} catch {
						cleanup(campaignId, sub);
					}
				}, 30_000)
			};

			if (!channels.has(campaignId)) {
				channels.set(campaignId, new Set());
			}
			channels.get(campaignId)!.add(sub);
		},
		cancel() {
			// Stream was cancelled by client disconnect — clean up handled by error path
		}
	});

	return stream;
}

export function emit(campaignId: string, event: CampaignEvent) {
	const subs = channels.get(campaignId);
	if (!subs) return;

	const message = `data: ${JSON.stringify(event)}\n\n`;
	for (const sub of subs) {
		try {
			sub.controller.enqueue(message);
		} catch {
			cleanup(campaignId, sub);
		}
	}
}

function cleanup(campaignId: string, sub: Subscriber) {
	clearInterval(sub.heartbeat);
	try {
		sub.controller.close();
	} catch {
		// already closed
	}
	const subs = channels.get(campaignId);
	if (subs) {
		subs.delete(sub);
		if (subs.size === 0) channels.delete(campaignId);
	}
}
