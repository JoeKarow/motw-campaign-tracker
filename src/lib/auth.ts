import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { prisma } from '$lib/server/prisma';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
	trustedOrigins: ['http://localhost:5173', 'https://motw.jk3.me'],
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),
	socialProviders: {
		discord: {
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET
		}
	},
	plugins: [admin()]
});
