const presets: Record<string, string> = {
	ACTIVE: 'preset-filled-primary-500',
	RESOLVED: 'preset-filled-success-500',
	ABANDONED: 'preset-filled-surface-400-600',
	ALIVE: 'preset-filled-success-500',
	DEAD: 'preset-filled-error-500',
	MISSING: 'preset-filled-warning-500',
	UNKNOWN: 'preset-filled-surface-400-600'
};

export function badgePreset(status: string): string {
	return presets[status] ?? 'preset-filled-surface-400-600';
}
