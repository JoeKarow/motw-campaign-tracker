# Monster of the Week Campaign Tracker

A self-hosted SvelteKit web app for managing Monster of the Week tabletop RPG campaigns. Features a web app for GM prep/management and a Discord Activity for at-the-table gameplay.

## Prerequisites

- [mise](https://mise.jdx.dev/) (or Node 22 + Bun manually)
- Docker & Docker Compose (for deployment)
- A Discord application (for OAuth + Activity)

## Setup

```sh
# Install runtimes
mise install

# Install dependencies
bun install

# Copy env and fill in values
cp .env.example .env

# Start Postgres (via Docker)
docker compose up db -d

# Run database migrations
bunx prisma migrate dev

# Start dev server
bun run dev
```

## Discord Developer Portal Setup

1. Go to https://discord.com/developers/applications and create a new application
2. Under **OAuth2**:
   - Add redirect URI: `http://localhost:5173/api/auth/callback/discord`
   - Copy Client ID and Client Secret to `.env`
3. Under **Activities** (for Discord Activity):
   - Enable Activities
   - Set URL Mapping: `/` -> `localhost:5173`
4. Set `PUBLIC_DISCORD_CLIENT_ID` in `.env` to the same Client ID

## Environment Variables

| Variable                   | Description                                   |
| -------------------------- | --------------------------------------------- |
| `DATABASE_URL`             | PostgreSQL connection string                  |
| `BETTER_AUTH_SECRET`       | Random secret for session signing             |
| `BETTER_AUTH_URL`          | Public URL of the app                         |
| `DISCORD_CLIENT_ID`        | Discord OAuth Client ID                       |
| `DISCORD_CLIENT_SECRET`    | Discord OAuth Client Secret                   |
| `PUBLIC_DISCORD_CLIENT_ID` | Same as DISCORD_CLIENT_ID (exposed to client) |

## Deployment

```sh
# Build and start all services
docker compose up --build -d
```

This starts PostgreSQL and the app on port 3000. Set your env vars in `.env` before running.

## Project Structure

- `src/routes/app/` — Web app (GM dashboard, campaign/mystery/NPC/hunter management)
- `src/routes/activity/` — Discord Activity (gameplay UI)
- `src/routes/api/` — JSON API endpoints for Activity
- `src/lib/components/` — Reusable UI components (HarmTrack, LuckTrack, etc.)
- `prisma/schema.prisma` — Database schema
