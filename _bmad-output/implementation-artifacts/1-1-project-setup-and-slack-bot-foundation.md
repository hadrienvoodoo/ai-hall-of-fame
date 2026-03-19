# Story 1.1: Project Setup and Slack Bot Foundation

Status: review

## Story

As a developer,
I want to initialize the project with Next.js and set up the Slack bot with @slack/bolt,
so that we have a working foundation with database schema and bot connectivity.

## Acceptance Criteria

1. Project is initialized with Next.js App Router, TypeScript, and Tailwind CSS using `npx create-next-app@latest`
2. Prisma is configured with SQLite and the Project, Contributor, and Vote models are created and migrated
3. @slack/bolt is installed and a basic bot connects to the Slack workspace
4. Environment variables are documented in `.env.example`
5. Project runs locally with `npm run dev` (Next.js) and a separate bot process
6. ESLint is configured and passes on all files
7. Basic project structure matches the architecture document

## Tasks / Subtasks

- [x] Task 1: Initialize Next.js project (AC: #1)
  - [x] Run `npx create-next-app@latest` with TypeScript, Tailwind, App Router, src dir
  - [x] Verify project runs with `npm run dev`
  - [x] Clean up default Next.js boilerplate (remove default page content)

- [x] Task 2: Set up Prisma with SQLite (AC: #2)
  - [x] Install Prisma, @prisma/client, @prisma/adapter-libsql, @libsql/client
  - [x] Initialize Prisma with SQLite datasource
  - [x] Create schema with Project, Contributor, and Vote models
  - [x] Run initial migration: `npx prisma migrate dev --name init`
  - [x] Create `src/lib/db.ts` with PrismaClient singleton (Prisma 7 adapter pattern)

- [x] Task 3: Set up Slack bot foundation (AC: #3)
  - [x] Install @slack/bolt
  - [x] Create `src/bot/index.ts` — Bolt app entry point with Socket Mode
  - [x] Configure bot with Socket Mode for local dev
  - [x] Add basic health check: bot logs on startup
  - [x] Create separate npm script: `"bot": "npx tsx src/bot/index.ts"`

- [x] Task 4: Project structure and config (AC: #4, #5, #6, #7)
  - [x] Create directory structure per architecture doc
  - [x] Create `.env.example` with required variables
  - [x] Create `.env` for local development
  - [x] Verify ESLint passes on all files
  - [x] Verify build passes

## Dev Notes

### Data Models (Prisma Schema)

```prisma
model Project {
  id               String   @id @default(cuid())
  title            String
  description      String
  toolUsed         String
  problemSolved    String
  impact           String
  beforeAfterUrl   String?
  aiLevel          Int      @default(1)
  contributorSlackId String
  contributorName  String
  slackMessageTs   String?
  voteCount        Int      @default(0)
  createdAt        DateTime @default(now())
  votes            Vote[]
}

model Contributor {
  id             String   @id @default(cuid())
  slackId        String   @unique
  name           String
  avatarUrl      String?
  currentAiLevel Int      @default(1)
  projectCount   Int      @default(0)
  createdAt      DateTime @default(now())
}

model Vote {
  id           String   @id @default(cuid())
  projectId    String
  voterSlackId String
  createdAt    DateTime @default(now())
  project      Project  @relation(fields: [projectId], references: [id])

  @@unique([projectId, voterSlackId])
}
```

### Environment Variables (.env.example)

```
# Database
DATABASE_URL="file:./dev.db"

# Slack Bot
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_CHANNEL_ID=C-your-panam-ai-channel-id
```

### Architecture Compliance

- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma/SQLite + @slack/bolt
- **Naming:** snake_case for DB columns, camelCase for JSON/code, PascalCase for components, kebab-case for files
- **API responses:** `{ data: T }` for success, `{ error: { message, code } }` for errors
- **DB client:** Singleton pattern in `src/lib/db.ts`
- **Bot:** Socket Mode for development, Events API for production

### Project Structure to Create

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/          (empty, for future stories)
├── components/       (empty, for future stories)
├── lib/
│   ├── db.ts         (Prisma client singleton)
│   ├── ai-levels.ts  (empty export, for future stories)
│   └── utils.ts      (empty export, for future stories)
├── bot/
│   ├── index.ts      (Bolt app entry point)
│   ├── listeners/    (empty, for future stories)
│   └── flows/        (empty, for future stories)
└── types/
    └── index.ts      (shared TypeScript types)
prisma/
├── schema.prisma
└── migrations/
tests/                (empty, for future stories)
```

### Testing Requirements

- No tests required for this setup story
- Verify manually: `npm run dev` starts Next.js, `npm run bot` connects to Slack
- ESLint must pass: `npm run lint`

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]
- [Source: _bmad-output/planning-artifacts/prd.md#Web App Specific Requirements]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Prisma 7 breaking change: datasource `url` removed from schema, moved to prisma.config.ts
- Prisma 7 requires adapter pattern: PrismaLibSql from @prisma/adapter-libsql
- Prisma 7 PrismaClient constructor requires adapter argument

### Completion Notes List

- Next.js 16.2.0 initialized with App Router, TypeScript, Tailwind CSS
- Prisma 7.5.0 with SQLite via @prisma/adapter-libsql
- DB schema: Project, Contributor, Vote models + migration applied
- Slack bot skeleton with @slack/bolt Socket Mode
- ESLint passes, build passes

### Change Log

- 2026-03-19: Story 1.1 implemented

### File List

- app/package.json
- app/prisma/schema.prisma
- app/prisma/migrations/20260319120542_init/migration.sql
- app/prisma.config.ts
- app/src/lib/db.ts
- app/src/lib/ai-levels.ts
- app/src/lib/utils.ts
- app/src/types/index.ts
- app/src/bot/index.ts
- app/src/app/page.tsx
- app/.env.example
- app/.env
