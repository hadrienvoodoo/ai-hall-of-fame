---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['prd.md', 'product-brief-ai-hall-of-fame-2026-03-19.md']
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-19'
project_name: 'ai-hall-of-fame'
user_name: 'Hadrien'
date: '2026-03-19'
---

# Architecture Decision Document

_AI Hall of Fame — Internal AI achievements showcase powered by Slack bot integration_

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
22 FRs across 6 capability areas: Slack Bot (FR1-6), Project Cards (FR7-11), Voting (FR12-14), AI Adoption Levels (FR15-17), Contributor Profiles (FR18-19), Site Browsing (FR20-22). Low complexity — no auth system needed for browsing, Slack identity handles voting.

**Non-Functional Requirements:**
- Performance: pages < 2s, bot response < 5min, votes < 500ms
- Security: bot tokens in env vars, voting via Slack identity
- Integration: Slack Events API + Web API

**Scale & Complexity:**
- Primary domain: Full-stack web app + Slack bot
- Complexity level: Low
- Estimated architectural components: 4 (Slack bot, API backend, database, static frontend)

### Technical Constraints & Dependencies

- Slack workspace access required for bot permissions
- Slack Events API requires a publicly accessible endpoint (webhook URL)
- Team size is small — no need for enterprise-scale infrastructure

### Cross-Cutting Concerns Identified

- Slack identity used for both contribution attribution and vote authentication
- AI level calculation spans bot data collection and frontend display
- Project card data flows from Slack DMs → backend → frontend

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application with API backend and Slack bot integration.

### Selected Stack

**Rationale:** Keep it simple. This is an internal tool with low complexity. No need for heavy frameworks.

- **Frontend:** Next.js (App Router) with TypeScript + Tailwind CSS
- **Backend/API:** Next.js API routes (co-located with frontend)
- **Database:** SQLite via Prisma (simple, no external DB needed for internal tool)
- **Slack Bot:** Bolt for JavaScript (@slack/bolt)
- **Deployment:** Vercel (frontend + API) + separate process for Slack bot listener

**Initialization Command:**

```bash
npx create-next-app@latest ai-hall-of-fame --typescript --tailwind --app --src-dir --eslint
```

**Architectural Decisions Provided by Starter:**
- TypeScript strict mode
- Tailwind CSS for styling
- App Router for routing
- ESLint for linting
- src/ directory structure

## Core Architectural Decisions

### Data Architecture

**Database:** SQLite via Prisma ORM
- Rationale: Internal tool, single-server deployment, no need for PostgreSQL complexity
- Migration strategy: Prisma Migrate
- If team grows significantly, can swap to PostgreSQL with zero Prisma code changes

**Core Data Models:**

```
Project: id, title, description, toolUsed, problemSolved, impact, beforeAfterUrl, aiLevel, contributorSlackId, contributorName, slackMessageTs, voteCount, createdAt
Contributor: slackId, name, avatarUrl, currentAiLevel, projectCount, createdAt
Vote: id, projectId, voterSlackId, createdAt (unique constraint on projectId + voterSlackId)
```

### Authentication & Security

- **No user auth for site browsing** — public internal site, no login
- **Voting auth:** Slack OAuth or simple Slack identity verification via bot
- **Bot tokens:** stored in environment variables, never in code
- **No sensitive data** — all project info is meant to be team-visible

### API & Communication

- **REST API** via Next.js API routes
- **Endpoints:**
  - `GET /api/projects` — list projects (sort by recent, votes, level)
  - `GET /api/projects/:id` — single project
  - `POST /api/projects` — create project (from bot only)
  - `POST /api/projects/:id/vote` — vote on project (Slack identity required)
  - `GET /api/contributors` — list contributors with levels
  - `GET /api/contributors/:slackId` — single contributor profile
- **Error format:** `{ error: { message: string, code: string } }`
- **Success format:** `{ data: T }`

### Frontend Architecture

- **Next.js App Router** with server components for project listing (SEO not critical but SSR gives fast loads)
- **Client components** only for interactive elements (voting buttons)
- **No state management library** — React Server Components + minimal client state
- **Tailwind CSS** for styling — no component library overhead

### Infrastructure & Deployment

- **Frontend + API:** Vercel (zero-config Next.js deployment)
- **Slack Bot:** Long-running process — deploy on Railway, Render, or a small VPS
- **Database:** SQLite file on the bot server (or switch to Vercel Postgres if co-locating)
- **CI/CD:** GitHub Actions for lint + type-check on PR, auto-deploy on merge to main

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database:** snake_case for tables and columns (`projects`, `vote_count`, `slack_id`)
**API:** camelCase for JSON fields (`voteCount`, `slackId`, `beforeAfterUrl`)
**Code:** camelCase for variables/functions, PascalCase for components/types
**Files:** kebab-case for routes/pages, PascalCase for components (`ProjectCard.tsx`)

### Structure Patterns

- Tests co-located: `__tests__/` folder next to source files
- Components organized by feature, not type
- Shared utilities in `src/lib/`
- Database operations in `src/lib/db/`
- Slack bot code in `src/bot/`

### Format Patterns

**API Responses:**
```json
{ "data": { ... } }
{ "error": { "message": "Not found", "code": "NOT_FOUND" } }
```

**Dates:** ISO 8601 strings in API, formatted for display in frontend

### Process Patterns

**Error Handling:** Try/catch at API route level, return structured error response
**Loading States:** Skeleton components for project cards during load
**Voting:** Optimistic UI update, rollback on error

## Project Structure & Boundaries

### Complete Project Directory Structure

```
ai-hall-of-fame/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home — project feed
│   │   ├── globals.css
│   │   ├── projects/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Single project view
│   │   ├── contributors/
│   │   │   └── page.tsx                # Contributors list with levels
│   │   └── api/
│   │       ├── projects/
│   │       │   ├── route.ts            # GET list, POST create
│   │       │   └── [id]/
│   │       │       ├── route.ts        # GET single project
│   │       │       └── vote/
│   │       │           └── route.ts    # POST vote
│   │       └── contributors/
│   │           └── route.ts            # GET contributors
│   ├── components/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectList.tsx
│   │   ├── VoteButton.tsx
│   │   ├── ContributorBadge.tsx
│   │   ├── AiLevelTag.tsx
│   │   ├── BeforeAfter.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── db.ts                       # Prisma client
│   │   ├── ai-levels.ts                # Level calculation logic
│   │   └── utils.ts
│   ├── bot/
│   │   ├── index.ts                    # Bolt app entry point
│   │   ├── listeners/
│   │   │   └── channel-message.ts      # #panam-ai listener
│   │   ├── flows/
│   │   │   └── dm-followup.ts          # DM conversation flow
│   │   └── utils/
│   │       └── parse-responses.ts      # Extract structured data from DMs
│   └── types/
│       └── index.ts                    # Shared TypeScript types
├── tests/
│   ├── api/
│   ├── bot/
│   └── components/
└── public/
    └── assets/
```

### Architectural Boundaries

**Slack Bot ↔ API:** Bot creates projects via internal API call (POST /api/projects)
**Frontend ↔ API:** React Server Components fetch directly from API routes; client components use fetch for mutations (voting)
**API ↔ Database:** All DB access through Prisma client in `src/lib/db.ts`

### Requirements to Structure Mapping

| FR Category | Directory |
|------------|-----------|
| Slack Bot (FR1-6) | `src/bot/` |
| Project Cards (FR7-11) | `src/components/`, `src/app/projects/` |
| Voting (FR12-14) | `src/components/VoteButton.tsx`, `src/app/api/projects/[id]/vote/` |
| AI Levels (FR15-17) | `src/lib/ai-levels.ts`, `src/components/AiLevelTag.tsx` |
| Contributor Profiles (FR18-19) | `src/app/contributors/` |
| Site Browsing (FR20-22) | `src/app/page.tsx`, `src/app/projects/` |

## Architecture Validation

### Completeness Check

- All 22 FRs mapped to specific files/directories
- All NFRs addressed by architectural choices (performance via SSR, security via env vars, integration via Slack API)
- All user journeys supported by the architecture
- No orphaned requirements

### Coherence Check

- Technology stack is consistent (TypeScript throughout)
- Data flows are clear: Slack → Bot → API → DB → Frontend
- No circular dependencies between components
- Naming patterns consistent across layers

### Risk Assessment

- **SQLite limitation:** Single-writer. Fine for internal tool with low write volume. Migrate to PostgreSQL if needed.
- **Bot hosting:** Needs separate process from Vercel. Railway/Render handles this simply.
- **Slack API rate limits:** Bot handles one channel with moderate traffic — well within limits.
