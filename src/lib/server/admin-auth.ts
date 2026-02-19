import { error } from '@sveltejs/kit';

export function requireAdmin(user: App.Locals['user']): asserts user is NonNullable<App.Locals['user']> {
	if (!user) throw error(401, 'Unauthorized');
	if (user.role !== 'admin') throw error(403, 'Admin access required');
}
