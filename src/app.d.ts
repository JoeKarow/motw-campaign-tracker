// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user:
				| (import('better-auth').User & {
						role?: string | null;
						banned?: boolean | null;
						banReason?: string | null;
						banExpires?: Date | null;
				  })
				| null;
			session:
				| (import('better-auth').Session & {
						impersonatedBy?: string | null;
				  })
				| null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
