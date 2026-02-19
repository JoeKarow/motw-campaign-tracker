/**
 * Backfill CampaignMember records for existing campaigns.
 * For each campaign, the first hunter's user becomes GM; other hunters' users become PLAYER.
 * Run with: bun prisma/seed-members.ts
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
	const campaigns = await prisma.campaign.findMany({
		include: {
			hunters: { orderBy: { id: 'asc' } },
			members: true
		}
	});

	for (const campaign of campaigns) {
		if (campaign.members.length > 0) {
			console.log(`Skipping ${campaign.name} — already has members`);
			continue;
		}

		const seenUsers = new Set<string>();
		let isFirst = true;

		for (const hunter of campaign.hunters) {
			if (seenUsers.has(hunter.userId)) continue;
			seenUsers.add(hunter.userId);

			await prisma.campaignMember.create({
				data: {
					userId: hunter.userId,
					campaignId: campaign.id,
					role: isFirst ? 'GM' : 'PLAYER'
				}
			});

			console.log(
				`  ${campaign.name}: ${hunter.userId} → ${isFirst ? 'GM' : 'PLAYER'}`
			);
			isFirst = false;
		}

		if (campaign.hunters.length === 0) {
			console.log(`  ${campaign.name}: no hunters — no GM assigned`);
		}
	}
}

main()
	.then(() => console.log('Done'))
	.catch(console.error)
	.finally(() => prisma.$disconnect());
