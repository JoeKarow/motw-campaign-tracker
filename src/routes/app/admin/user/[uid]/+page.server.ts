import { auth } from '$lib/auth';
import { requireAdmin } from '$lib/server/admin-auth';
import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, request }) => {
	requireAdmin(locals.user);

	const user = await prisma.user.findUnique({
		where: { id: params.uid },
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
			role: true,
			banned: true,
			banReason: true,
			banExpires: true,
			createdAt: true
		}
	});

	if (!user) throw error(404, 'User not found');

	const sessionsResult = await auth.api.listUserSessions({
		headers: request.headers,
		body: { userId: params.uid }
	});

	return {
		targetUser: user,
		sessions: sessionsResult as unknown as Array<{
			id: string;
			token: string;
			ipAddress: string | null;
			userAgent: string | null;
			createdAt: Date;
			expiresAt: Date;
		}>
	};
};

export const actions: Actions = {
	revokeSession: async ({ request, locals }) => {
		requireAdmin(locals.user);
		const form = await request.formData();
		const sessionToken = form.get('sessionToken') as string;

		if (!sessionToken) return fail(400, { error: 'Missing sessionToken' });

		await auth.api.revokeUserSession({
			headers: request.headers,
			body: { sessionToken }
		});

		return { success: true };
	},

	revokeAll: async ({ request, locals, params }) => {
		requireAdmin(locals.user);

		await auth.api.revokeUserSessions({
			headers: request.headers,
			body: { userId: params.uid }
		});

		return { success: true };
	}
};
