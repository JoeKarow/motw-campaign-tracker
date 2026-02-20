import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const { code } = await request.json();
	if (!code) throw error(400, 'Missing code');

	// Exchange code for Discord access token
	const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: DISCORD_CLIENT_ID,
			client_secret: DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code
		})
	});

	if (!tokenRes.ok) {
		throw error(401, 'Discord token exchange failed');
	}

	const tokenData = await tokenRes.json();
	const discordAccessToken = tokenData.access_token;

	// Fetch Discord user profile
	const userRes = await fetch('https://discord.com/api/users/@me', {
		headers: { Authorization: `Bearer ${discordAccessToken}` }
	});

	if (!userRes.ok) {
		throw error(401, 'Failed to fetch Discord user');
	}

	const discordUser = await userRes.json();

	// Upsert user in database
	const user = await prisma.user.upsert({
		where: { email: discordUser.email ?? `${discordUser.id}@discord.local` },
		update: {
			name: discordUser.global_name ?? discordUser.username,
			image: discordUser.avatar
				? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
				: null
		},
		create: {
			id: discordUser.id,
			email: discordUser.email ?? `${discordUser.id}@discord.local`,
			name: discordUser.global_name ?? discordUser.username,
			image: discordUser.avatar
				? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
				: null
		}
	});

	// Upsert Discord account link
	const existingAccount = await prisma.account.findFirst({
		where: { providerId: 'discord', accountId: discordUser.id }
	});

	if (!existingAccount) {
		await prisma.account.create({
			data: {
				id: crypto.randomUUID(),
				providerId: 'discord',
				accountId: discordUser.id,
				userId: user.id,
				accessToken: discordAccessToken
			}
		});
	} else {
		await prisma.account.update({
			where: { id: existingAccount.id },
			data: { accessToken: discordAccessToken }
		});
	}

	// Create a session
	const sessionToken = crypto.randomUUID();
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	await prisma.session.create({
		data: {
			id: crypto.randomUUID(),
			token: sessionToken,
			userId: user.id,
			expiresAt
		}
	});

	return json(
		{ access_token: discordAccessToken, session_token: sessionToken },
		{
			headers: {
				'Set-Cookie': `better-auth.session_token=${sessionToken}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${30 * 24 * 60 * 60}`
			}
		}
	);
};
