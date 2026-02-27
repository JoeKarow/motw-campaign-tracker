# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
mise run dev          # Start dev server (port 5173)
mise run build        # Production build (adapter-node → build/)
mise run check        # Type-check with svelte-check
mise run preview      # Preview production build

mise run db:migrate   # Create + apply migration (interactive -—name prompt)
mise run db:generate  # Regenerate Prisma client after schema changes
mise run db:studio    # Visual DB browser

docker compose up db -d    # Start just Postgres
docker compose up --build  # Build and run full stack (app + db)
```

## Architecture

Monster of the Week campaign tracker — SvelteKit app with two surfaces:

- **Web app** (`/app/*`) — GM dashboard for campaign, mystery, NPC, and hunter management. Uses SvelteKit form actions with `use:enhance` for all mutations.
- **Discord Activity** (`/activity/*`) — At-the-table gameplay UI running inside Discord. Uses JSON API endpoints (`/api/campaign/[id]/*`) with client-side fetch for instant updates.

### Auth Flow

- **Web**: Discord OAuth via better-auth (`$lib/auth.ts`) → `hooks.server.ts` populates `event.locals.user`/`event.locals.session`
- **Activity**: Discord SDK authorize → exchange code via `/api/auth/activity-token` → creates better-auth session manually → SDK authenticate
- Auth guard: `/app` layout server redirects to `/` if no user

### Key Patterns

- **Skeleton UI**: Import components from `@skeletonlabs/skeleton-svelte`. Use Skeleton utility classes (`.btn`, `.card`, `.input`, etc.) — don't build custom equivalents.
- **Superforms**: Server uses `superValidate(request, zod4(schema))`, client uses `superForm(data.form)` with `dataType: 'json'` + `resetForm: false`. Schemas in `$lib/schemas/`.
- **SSE events**: `$lib/server/events.ts` manages per-campaign subscriber channels. Prisma extension listeners emit events on model changes. Frontend reconnects with exponential backoff (`$lib/activity-events.svelte.ts`).
- **Campaign auth helper**: `$lib/server/campaign-auth.ts` — `requireCampaignMember()` validates user role (GM/Player) for both web actions and API endpoints.
- **Bearer token auth**: Activity iframe uses Bearer token in Authorization header (fallback for no third-party cookies). Validated in `hooks.server.ts`. Client helper: `getActivityFetch()` from `$lib/discord-context.svelte.ts`.
- **Prisma singleton**: `$lib/server/prisma.ts` — import this, never instantiate PrismaClient directly
- **Auth tables**: The Prisma `Session` model (better-auth) maps to table `session` via `@@map`. Domain sessions use `GameSession` model to avoid naming collision.
- **Campaign-scoped loading**: `app/campaign/[id]/+layout.server.ts` loads campaign with mysteries/npcs/hunters, child routes access via `parent()`
- **Discord context**: Activity layout calls `initDiscord()` on mount, stores result via Svelte context (`$lib/discord-context.ts`). Components use `getDiscordContext()`, never import SDK directly.
- **Web mutations**: SvelteKit form actions (server-side). Activity mutations: JSON API endpoints with auth check via `locals.user`.

### Data Model Hierarchy

Campaign → Mystery → GameSession → Scene → Clue. NPCs and Hunters belong to Campaign. Join tables: SessionAttendance (hunter↔session), NpcAppearance (npc↔session), NpcRelationship (npc↔npc).

## Tech Stack

- **Runtime**: Bun, Node 22 (mise.toml)
- **Framework**: SvelteKit (Svelte 5 with runes), adapter-node
- **DB**: PostgreSQL + Prisma ORM
- **Auth**: better-auth with Prisma adapter + Discord social provider
- **Discord**: @discord/embedded-app-sdk for Activity iframe
- **Styling**: Tailwind 4 (@tailwindcss/vite) + Skeleton UI (cerberus theme)
- **Forms**: sveltekit-superforms + Zod 4 for validation, dirty tracking via `$tainted`
- **Real-time**: SSE via custom ReadableStream channels (`$lib/server/events.ts`) + prisma-extension-emitter
- **JSON types**: prisma-json-types-generator for typed JSON columns (moves/gear/bonds)
- **Testing**: Vitest + @testing-library/svelte (no tests written yet)
- **Deploy**: Docker multi-stage (oven/bun), docker-compose with Postgres

## Notes

- `prisma-emitter generate` runs via postinstall — regenerate after schema changes (output: `src/lib/generated/prisma/`)
- Zod schemas use discriminated unions for gear types (weapons vs items) in `$lib/schemas/hunter.ts`
- `.env.example` lists required env vars: DATABASE_URL, BETTER_AUTH_SECRET/URL, DISCORD_CLIENT_ID/SECRET, PUBLIC_DISCORD_CLIENT_ID
- CSRF trustedOrigins includes `.discordsays.com` for Activity iframe
- Vite allowedHosts includes `.discordsays.com`
- Svelte 5 runes: use `$props()`, `$state()`, `$derived()` — no legacy `export let` or stores
- Hunter moves/gear/bonds are stored as JSON arrays in Prisma
