# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
bun run dev          # Start dev server (port 5173)
bun run build        # Production build (adapter-node → build/)
bun run check        # Type-check with svelte-check
bun run preview      # Preview production build

bunx prisma migrate dev --name <name>   # Create + apply migration
bunx prisma generate                     # Regenerate Prisma client after schema changes
bunx prisma studio                       # Visual DB browser

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
- **Deploy**: Docker multi-stage (oven/bun), docker-compose with Postgres

## Notes

- CSRF trustedOrigins includes `.discordsays.com` for Activity iframe
- Vite allowedHosts includes `.discordsays.com`
- Svelte 5 runes: use `$props()`, `$state()`, `$derived()` — no legacy `export let` or stores
- Hunter moves/gear/bonds are stored as JSON arrays in Prisma
