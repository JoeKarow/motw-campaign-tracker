import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function handle({ event, resolve }: Parameters<import('@sveltejs/kit').Handle>[0]) {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	} else {
		// Fallback: check for Bearer token (used by Discord Activity iframe
		// where third-party cookies are blocked)
		const authHeader = event.request.headers.get('authorization');
		if (authHeader?.startsWith('Bearer ')) {
			const token = authHeader.slice(7);
			const dbSession = await prisma.session.findFirst({
				where: { token, expiresAt: { gt: new Date() } },
				include: { user: true }
			});
			if (dbSession) {
				event.locals.session = dbSession as any;
				event.locals.user = dbSession.user as any;
			} else {
				event.locals.session = null;
				event.locals.user = null;
			}
		} else {
			event.locals.session = null;
			event.locals.user = null;
		}
	}

	// Redirect banned users away from /app routes
	if (
		event.locals.user?.banned &&
		event.url.pathname.startsWith('/app')
	) {
		throw redirect(303, '/banned');
	}

	return svelteKitHandler({ event, resolve, auth, building });
}
