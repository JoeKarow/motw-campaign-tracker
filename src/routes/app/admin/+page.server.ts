import { auth } from '$lib/auth';
import { requireAdmin } from '$lib/server/admin-auth';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url, request }) => {
	requireAdmin(locals.user);

	const searchValue = url.searchParams.get('q') || undefined;
	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = 20;
	const offset = (page - 1) * limit;

	const result = await auth.api.listUsers({
		headers: request.headers,
		query: {
			limit,
			offset,
			...(searchValue
				? { searchValue, searchField: 'email' as const, searchOperator: 'contains' as const }
				: {})
		}
	});

	return {
		users: result.users,
		total: result.total,
		page,
		limit
	};
};

export const actions: Actions = {
	setRole: async ({ request, locals }) => {
		requireAdmin(locals.user);
		const form = await request.formData();
		const userId = form.get('userId') as string;
		const role = form.get('role') as string;

		if (!userId || !role) return fail(400, { error: 'Missing fields' });

		await auth.api.setRole({
			headers: request.headers,
			body: { userId, role: role as 'user' | 'admin' }
		});

		return { success: true };
	},

	ban: async ({ request, locals }) => {
		requireAdmin(locals.user);
		const form = await request.formData();
		const userId = form.get('userId') as string;
		const banReason = (form.get('banReason') as string) || undefined;

		if (!userId) return fail(400, { error: 'Missing userId' });

		await auth.api.banUser({
			headers: request.headers,
			body: { userId, banReason }
		});

		return { success: true };
	},

	unban: async ({ request, locals }) => {
		requireAdmin(locals.user);
		const form = await request.formData();
		const userId = form.get('userId') as string;

		if (!userId) return fail(400, { error: 'Missing userId' });

		await auth.api.unbanUser({
			headers: request.headers,
			body: { userId }
		});

		return { success: true };
	},

	removeUser: async ({ request, locals }) => {
		requireAdmin(locals.user);
		const form = await request.formData();
		const userId = form.get('userId') as string;

		if (!userId) return fail(400, { error: 'Missing userId' });

		await auth.api.removeUser({
			headers: request.headers,
			body: { userId }
		});

		return { success: true };
	}
};
