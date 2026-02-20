import { getContext, setContext } from 'svelte';
import type { DiscordResult } from './discord';

const DISCORD_KEY = Symbol('discord');

export function setDiscordContext(initial: DiscordResult) {
	const state = $state({ current: initial });
	setContext(DISCORD_KEY, state);
	return state;
}

export function getDiscordContext(): DiscordResult {
	const state = getContext<{ current: DiscordResult }>(DISCORD_KEY);
	return state.current;
}

export function getActivityFetch(): typeof fetch {
	const ctx = getDiscordContext();
	if (ctx.mode !== 'activity') return fetch;
	const token = ctx.sessionToken;
	return (input: RequestInfo | URL, init?: RequestInit) => {
		const headers = new Headers(init?.headers);
		headers.set('Authorization', `Bearer ${token}`);
		return fetch(input, { ...init, headers });
	};
}

export function getSessionToken(): string | null {
	const ctx = getDiscordContext();
	return ctx.mode === 'activity' ? ctx.sessionToken : null;
}
