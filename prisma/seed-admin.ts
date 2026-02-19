import { PrismaClient } from '../src/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
	const email = process.argv[2];

	let user;
	if (email) {
		user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			console.error(`No user found with email: ${email}`);
			process.exit(1);
		}
	} else {
		user = await prisma.user.findFirst({ orderBy: { createdAt: 'asc' } });
		if (!user) {
			console.error('No users found in database');
			process.exit(1);
		}
	}

	await prisma.user.update({
		where: { id: user.id },
		data: { role: 'admin' }
	});

	console.log(`Promoted ${user.name} (${user.email}) to admin`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
