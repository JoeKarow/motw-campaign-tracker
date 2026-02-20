import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	// Discord embedded app iframe includes these query params
	if (url.searchParams.has('frame_id') && url.searchParams.has('instance_id')) {
		throw redirect(302, `/activity${url.search}`);
	}
};
