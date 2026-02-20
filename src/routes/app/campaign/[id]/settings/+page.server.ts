import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { requireGM } from '$lib/server/campaign-auth';

interface DiscordGuild {
	id: string;
	name: string;
	icon: string | null;
	permissions: string;
}

const MANAGE_GUILD = 0x20n;

export const load: PageServerLoad = async ({ params, locals }) => {
	await requireGM(locals.user?.id, params.id);

	const campaign = await prisma.campaign.findUnique({
		where: { id: params.id },
		select: { id: true, name: true, discordGuildId: true }
	});

	if (!campaign) throw error(404, 'Campaign not found');

	// Fetch GM's Discord guilds via their stored access token
	const account = await prisma.account.findFirst({
		where: { userId: locals.user!.id, providerId: 'discord' }
	});

	let guilds: { id: string; name: string; icon: string | null }[] = [];

	if (account?.accessToken) {
		try {
			const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
				headers: { Authorization: `Bearer ${account.accessToken}` }
			});

			if (res.ok) {
				const allGuilds: DiscordGuild[] = await res.json();
				guilds = allGuilds
					.filter((g) => (BigInt(g.permissions) & MANAGE_GUILD) !== 0n)
					.map((g) => ({ id: g.id, name: g.name, icon: g.icon }));
			}
		} catch {
			// Discord API unavailable — show page without guilds
		}
	}

	return { campaign, guilds };
};

export const actions: Actions = {
	linkGuild: async ({ params, locals, request }) => {
		await requireGM(locals.user?.id, params.id);

		const formData = await request.formData();
		const guildId = formData.get('guildId') as string | null;

		await prisma.campaign.update({
			where: { id: params.id },
			data: { discordGuildId: guildId || null }
		});

		return { success: true };
	}
};
