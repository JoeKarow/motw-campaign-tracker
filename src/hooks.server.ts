import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }: Parameters<import('@sveltejs/kit').Handle>[0]) {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	} else {
		event.locals.session = null;
		event.locals.user = null;
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
