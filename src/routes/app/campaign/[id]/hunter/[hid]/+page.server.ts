import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const hunter = await prisma.hunter.findUnique({
		where: { id: params.hid },
		include: { user: true }
	});

	if (!hunter) throw error(404, 'Hunter not found');

	return { hunter };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const formData = await request.formData();

		const getInt = (name: string, fallback: number) => {
			const val = formData.get(name)?.toString();
			return val ? parseInt(val, 10) : fallback;
		};

		const getJson = (name: string) => {
			const val = formData.get(name)?.toString()?.trim();
			if (!val) return [];
			try {
				return JSON.parse(val);
			} catch {
				return [];
			}
		};

		await prisma.hunter.update({
			where: { id: params.hid },
			data: {
				name: formData.get('name')?.toString()?.trim() || undefined,
				playbook: formData.get('playbook')?.toString()?.trim() || undefined,
				look: formData.get('look')?.toString()?.trim() || null,
				charmMod: getInt('charmMod', 0),
				coolMod: getInt('coolMod', 0),
				sharpMod: getInt('sharpMod', 0),
				toughMod: getInt('toughMod', 0),
				weirdMod: getInt('weirdMod', 0),
				harm: getInt('harm', 0),
				luck: getInt('luck', 7),
				xp: getInt('xp', 0),
				moves: getJson('moves'),
				gear: getJson('gear'),
				bonds: getJson('bonds')
			}
		});

		return { success: true };
	}
};
