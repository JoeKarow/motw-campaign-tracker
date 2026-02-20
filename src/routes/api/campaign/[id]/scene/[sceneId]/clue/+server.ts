import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';
export const POST: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) throw error(401, 'Unauthorized');
	await requireGM(locals.user.id, params.id);

	const { description, significance } = await request.json();

	if (!description) throw error(400, 'Description is required');

	const clue = await prisma.clue.create({
		data: {
			description,
			significance: significance || null,
			sceneId: params.sceneId
		},
		emit: true
	});

	return json({ clue });
};
