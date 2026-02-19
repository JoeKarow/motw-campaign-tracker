import type { PlaybookDefinition } from './types';
import { chosen } from './chosen';
import { expert } from './expert';

const registry: Record<string, PlaybookDefinition> = {
	chosen,
	expert,
};

/** Look up a playbook definition by name (case-insensitive). Returns undefined for unknown playbooks. */
export function getPlaybook(name: string): PlaybookDefinition | undefined {
	return registry[name.toLowerCase().replace(/^the\s+/, '')];
}

/** All currently registered playbook definitions. */
export function allPlaybooks(): PlaybookDefinition[] {
	return Object.values(registry);
}

export type { PlaybookDefinition } from './types';
