import { requireAdmin } from '$lib/server/admin-auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	requireAdmin(locals.user);
};
