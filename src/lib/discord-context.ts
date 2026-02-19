import { getContext, setContext } from 'svelte';
import type { DiscordResult } from './discord';

const DISCORD_KEY = Symbol('discord');

export function setDiscordContext(result: DiscordResult) {
	setContext(DISCORD_KEY, result);
}

export function getDiscordContext(): DiscordResult {
	return getContext<DiscordResult>(DISCORD_KEY);
}
