import type { PlaybookDefinition } from './types';
import { chosen } from './chosen';
import { constructed } from './constructed';
import { crooked } from './crooked';
import { divine } from './divine';
import { exile } from './exile';
import { expert } from './expert';
import { flake } from './flake';
import { hardCase } from './hard-case';
import { initiate } from './initiate';
import { meddlingKid } from './meddling-kid';
import { monstrous } from './monstrous';
import { mundane } from './mundane';
import { professional } from './professional';
import { sidekick } from './sidekick';
import { snoop } from './snoop';
import { spellSlinger } from './spell-slinger';
import { spooky } from './spooky';
import { wronged } from './wronged';

const registry: Record<string, PlaybookDefinition> = {
	chosen,
	constructed,
	crooked,
	divine,
	exile,
	expert,
	flake,
	'hard-case': hardCase,
	initiate,
	'meddling-kid': meddlingKid,
	monstrous,
	mundane,
	professional,
	sidekick,
	snoop,
	'spell-slinger': spellSlinger,
	spooky,
	wronged,
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
