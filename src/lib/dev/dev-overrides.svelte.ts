export const devOverrides = $state({
	roleOverride: null as 'GM' | 'PLAYER' | null
});

export function resetOverrides() {
	devOverrides.roleOverride = null;
}
