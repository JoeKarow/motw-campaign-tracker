import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (locals.user?.role !== 'admin') {
		return json({ error: 'Forbidden' }, { status: 403 });
	}

	const q = url.searchParams.get('q') || '';

	const users = await prisma.user.findMany({
		where: q ? { name: { contains: q, mode: 'insensitive' } } : undefined,
		take: 10,
		select: { id: true, name: true, email: true, image: true }
	});

	return json({ users });
};
