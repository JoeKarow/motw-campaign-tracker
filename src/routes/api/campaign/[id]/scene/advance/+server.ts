import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) throw error(401, 'Unauthorized');

	const { direction, sessionId } = await request.json();

	const scenes = await prisma.scene.findMany({
		where: { sessionId },
		orderBy: { order: 'asc' }
	});

	if (scenes.length === 0) {
		return json({ scene: null });
	}

	// This endpoint returns the next/prev scene info
	// The client tracks the current scene index
	return json({ scenes, direction });
};
