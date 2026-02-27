// Augment @prisma/client to re-export from our custom output path.
// This fixes prisma-extension-emitter's ModelNames type which imports from @prisma/client.
declare module '@prisma/client' {
	export { PrismaClient } from '$lib/generated/prisma/client';
}
