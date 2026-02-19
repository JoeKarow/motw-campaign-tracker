import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) throw error(401, 'Unauthorized');

	const { description, significance } = await request.json();

	if (!description) throw error(400, 'Description is required');

	const clue = await prisma.clue.create({
		data: {
			description,
			significance: significance || null,
			sceneId: params.sceneId
		}
	});

	return json({ clue });
};
