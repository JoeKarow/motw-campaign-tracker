import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { prisma } from '$lib/server/prisma';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';

const authOrigins = ['http://localhost:5173', 'https://motw.jk3.me', 'https://*.discordsays.com'];

export const auth = betterAuth({
	baseURL: {
		allowedHosts: authOrigins
	},
	trustedOrigins: authOrigins,
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
