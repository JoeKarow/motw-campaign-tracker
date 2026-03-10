import type { LookCategory } from '$lib/playbooks/types';

/**
 * Parse a comma-separated look string back into category → value mapping,
 * using positional alignment with the playbook's look categories.
 */
export function parseLookString(
	look: string,
	categories: LookCategory[]
): Record<string, string> {
	const parts = look.split(', ');
	const result: Record<string, string> = {};
	categories.forEach((cat, i) => {
		if (parts[i]) {
			result[cat.label] = parts[i];
		}
	});
	return result;
}

/**
 * Build a comma-separated look string from category selections,
 * preserving the order of the playbook's look categories.
 */
export function buildLookString(
	selections: Record<string, string>,
	categories: LookCategory[]
): string {
	return categories
		.map((cat) => selections[cat.label] ?? '')
		.filter(Boolean)
		.join(', ');
}
