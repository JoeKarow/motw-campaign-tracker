import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { prisma } from '$lib/server/prisma';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, BETTER_AUTH_URL } from '$env/static/private';

export const auth = betterAuth({
	baseURL: BETTER_AUTH_URL,
	trustedOrigins: ['http://localhost:5173', 'https://motw.jk3.me', 'https://*.discordsays.com'],
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
