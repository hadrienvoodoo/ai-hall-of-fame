---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ['prd.md', 'architecture.md']
status: 'complete'
---

# ai-hall-of-fame - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for ai-hall-of-fame, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Bot can detect new messages posted in the configured #panam-ai Slack channel
- FR2: Bot can send a DM to the message author with structured follow-up questions
- FR3: Bot can collect responses from the DM thread and extract structured project data
- FR4: Bot can send a reminder DM if the contributor hasn't responded within 24 hours
- FR5: Bot can stop follow-up attempts after 48 hours of non-response
- FR6: Bot can create a project card entry from collected DM responses
- FR7: System can display project cards with title, description, AI tool used, problem solved, and impact
- FR8: System can display before/after comparison on project cards (image or text)
- FR9: System can display the contributor's name and AI adoption level on each card
- FR10: System can display the date a project was posted
- FR11: System can sort projects by most recent, most voted, or AI level
- FR12: Team members can upvote a project card
- FR13: System can display the vote count on each project card
- FR14: System can rank projects by vote count
- FR15: System can assign an AI adoption level (L1-L5) to each contributor based on their projects
- FR16: System can display adoption levels: L1 Chatbot, L2 Prompt Engineering, L3 Workflows, L4 Agents, L5 Custom Tools
- FR17: System can update a contributor's level as they post new projects at higher levels
- FR18: System can display a contributor's profile showing all their projects and current AI level
- FR19: System can list all contributors with their AI levels
- FR20: Users can browse the showcase site without authentication
- FR21: Users can filter projects by AI level
- FR22: Users can search projects by keyword

### NonFunctional Requirements

- NFR1: Site pages load within 2 seconds on standard connections
- NFR2: Bot responds to new #panam-ai posts within 5 minutes
- NFR3: Voting interactions respond within 500ms
- NFR4: Slack bot tokens stored securely in environment variables
- NFR5: Voting limited to authenticated team members via Slack identity
- NFR6: Slack Events API for real-time channel monitoring
- NFR7: Slack Web API for sending DMs and managing conversations

### Additional Requirements

- Starter template: Next.js with TypeScript, Tailwind CSS, App Router, src directory
- Database: SQLite via Prisma ORM
- Slack bot: @slack/bolt framework
- Deployment: Vercel (frontend + API) + Railway (bot process)
- API: REST via Next.js API routes
- Bot creates projects via internal API call

### UX Design Requirements

N/A — no UX design document provided.

### FR Coverage Map

- FR1: Epic 1 — Slack bot channel monitoring
- FR2: Epic 1 — Bot DM follow-up
- FR3: Epic 1 — Bot data collection
- FR4: Epic 1 — Bot reminder
- FR5: Epic 1 — Bot timeout
- FR6: Epic 1 — Project creation from bot
- FR7: Epic 2 — Project card display
- FR8: Epic 2 — Before/after display
- FR9: Epic 2 — Contributor info on card
- FR10: Epic 2 — Date display
- FR11: Epic 2 — Sort projects
- FR12: Epic 3 — Upvote project
- FR13: Epic 3 — Vote count display
- FR14: Epic 3 — Rank by votes
- FR15: Epic 4 — AI level assignment
- FR16: Epic 4 — AI level display
- FR17: Epic 4 — AI level progression
- FR18: Epic 4 — Contributor profile
- FR19: Epic 4 — Contributors list
- FR20: Epic 2 — Browse without auth
- FR21: Epic 2 — Filter by AI level
- FR22: Epic 2 — Search projects

## Epic List

### Epic 1: Slack Bot Content Pipeline
The Slack bot monitors #panam-ai, DMs contributors with follow-up questions, collects structured responses, and creates project entries in the database. After this epic, the content pipeline from Slack to database is fully functional.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6

### Epic 2: Showcase Website
The showcase website displays project cards with all project details, before/after comparisons, sorting, filtering, and search. After this epic, the team can browse and discover AI projects.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR20, FR21, FR22

### Epic 3: Voting System
Team members can upvote projects via Slack identity. Projects display vote counts and can be ranked by popularity. After this epic, the social engagement layer is active.
**FRs covered:** FR12, FR13, FR14

### Epic 4: AI Adoption Levels & Contributor Profiles
Contributors have AI adoption levels (L1-L5) that update based on their projects. Contributor profiles show all projects and current level. A contributors page lists everyone with their levels. After this epic, the progression/gamification layer is complete.
**FRs covered:** FR15, FR16, FR17, FR18, FR19

---

## Epic 1: Slack Bot Content Pipeline

Enable the Slack bot to monitor #panam-ai, engage contributors via DM, and create project entries automatically.

### Story 1.1: Project Setup and Slack Bot Foundation

As a developer,
I want to initialize the project with Next.js and set up the Slack bot with @slack/bolt,
So that we have a working foundation with database schema and bot connectivity.

**Acceptance Criteria:**

**Given** a fresh repository
**When** the project is initialized with `npx create-next-app@latest` and dependencies are installed
**Then** the project runs locally with Next.js App Router, TypeScript, and Tailwind CSS
**And** Prisma is configured with SQLite and the Project, Contributor, and Vote models are created
**And** @slack/bolt is installed and a basic bot connects to the Slack workspace
**And** environment variables are documented in .env.example

### Story 1.2: Channel Message Detection

As a bot,
I want to detect new messages posted in the #panam-ai Slack channel,
So that I can identify when team members share AI achievements.

**Acceptance Criteria:**

**Given** the bot is running and connected to Slack
**When** a user posts a message in #panam-ai
**Then** the bot receives the message event within 5 minutes
**And** the bot extracts the author's Slack ID and message content
**And** the bot ignores bot messages, thread replies, and channel join/leave events

### Story 1.3: DM Follow-Up Conversation

As a bot,
I want to send a DM to the post author with structured follow-up questions,
So that I can collect structured project data from their AI achievement.

**Acceptance Criteria:**

**Given** the bot has detected a new message in #panam-ai
**When** the bot initiates a DM with the author
**Then** the bot sends a friendly message with follow-up questions: project title, AI tool used, problem solved, impact/time saved, and optional before/after screenshot URL
**And** the bot collects responses from the DM thread
**And** the bot extracts structured data from the contributor's replies

### Story 1.4: Reminder and Timeout Handling

As a bot,
I want to send a reminder after 24 hours and stop after 48 hours of non-response,
So that contributors aren't spammed but get a gentle nudge.

**Acceptance Criteria:**

**Given** a contributor has been DM'd but hasn't responded
**When** 24 hours have passed since the initial DM
**Then** the bot sends one reminder message
**And** if 48 hours pass with no response, the bot stops follow-up attempts
**And** the bot logs the non-response for tracking

### Story 1.5: Project Card Creation from Bot Data

As a bot,
I want to create a project entry in the database from collected DM responses,
So that the project appears on the showcase website.

**Acceptance Criteria:**

**Given** the bot has collected complete responses from a contributor
**When** the bot processes the structured data
**Then** a new Project record is created in the database with title, description, toolUsed, problemSolved, impact, beforeAfterUrl, and contributorSlackId
**And** a Contributor record is created or updated with the contributor's Slack ID and name
**And** the project is assigned an AI level based on the tool/approach described
**And** the API endpoint POST /api/projects is used for project creation

---

## Epic 2: Showcase Website

Display project cards on a browseable website with sorting, filtering, and search capabilities.

### Story 2.1: Project Feed Page

As a team member,
I want to browse a feed of AI project cards on the website,
So that I can discover what my colleagues have built with AI.

**Acceptance Criteria:**

**Given** projects exist in the database
**When** a user visits the home page
**Then** project cards are displayed showing title, description, AI tool used, contributor name, date, and AI level tag
**And** the page loads within 2 seconds
**And** no authentication is required to browse
**And** the GET /api/projects endpoint serves the project data

### Story 2.2: Before/After Display on Project Cards

As a team member,
I want to see before/after comparisons on project cards,
So that I can understand the concrete impact of each AI project.

**Acceptance Criteria:**

**Given** a project has a beforeAfterUrl field populated
**When** the project card is displayed
**Then** the before/after comparison is shown (image or text description)
**And** if no before/after data exists, the section is gracefully hidden

### Story 2.3: Project Sorting and Filtering

As a team member,
I want to sort projects by most recent, most voted, or AI level and filter by AI level,
So that I can find the most relevant or impressive projects.

**Acceptance Criteria:**

**Given** the project feed page is loaded
**When** a user selects a sort option (recent, votes, AI level)
**Then** the projects are re-ordered accordingly
**And** the user can filter projects by specific AI level (L1-L5)
**And** the user can search projects by keyword
**And** filters and sort persist during the browsing session

### Story 2.4: Single Project View

As a team member,
I want to view a dedicated page for a single project,
So that I can see all details including full description and before/after.

**Acceptance Criteria:**

**Given** a project exists in the database
**When** a user clicks on a project card or navigates to /projects/[id]
**Then** the full project details are displayed: title, description, tool used, problem solved, impact, before/after, contributor profile, AI level, vote count, and date
**And** the GET /api/projects/:id endpoint serves the data

---

## Epic 3: Voting System

Enable team members to upvote projects using their Slack identity.

### Story 3.1: Vote on Projects

As a team member,
I want to upvote a project card,
So that I can show appreciation and surface the best projects.

**Acceptance Criteria:**

**Given** a project card is displayed on the site
**When** a team member clicks the upvote button
**Then** the system verifies the voter's Slack identity
**And** the vote is recorded (one vote per person per project)
**And** the vote count updates immediately on the card (optimistic UI)
**And** the POST /api/projects/:id/vote endpoint handles the vote
**And** duplicate votes from the same Slack user are rejected
**And** voting responds within 500ms

### Story 3.2: Vote Count Display and Ranking

As a team member,
I want to see vote counts on project cards and sort by most voted,
So that I can discover the most appreciated projects.

**Acceptance Criteria:**

**Given** projects have received votes
**When** the project feed is displayed
**Then** each project card shows its current vote count
**And** sorting by "most voted" orders projects by descending vote count
**And** the vote count is accurate and updates in real-time

---

## Epic 4: AI Adoption Levels & Contributor Profiles

Track and display AI adoption levels per contributor and provide contributor profile pages.

### Story 4.1: AI Level Assignment and Progression

As a system,
I want to assign and update AI adoption levels for each contributor based on their projects,
So that the team can see their progression from chatbot to advanced AI usage.

**Acceptance Criteria:**

**Given** a contributor has posted projects
**When** the system evaluates their projects
**Then** the contributor is assigned the highest AI level among their projects
**And** levels are: L1 Chatbot, L2 Prompt Engineering, L3 Workflows, L4 Agents, L5 Custom Tools
**And** the level updates automatically when a new project at a higher level is posted
**And** the AI level tag is displayed on all their project cards

### Story 4.2: Contributor Profile Page

As a team member,
I want to view a contributor's profile showing all their projects and current AI level,
So that I can see their full AI journey and be inspired by their progression.

**Acceptance Criteria:**

**Given** a contributor exists in the database
**When** a user navigates to /contributors or clicks on a contributor's name
**Then** the contributor's profile shows their name, avatar, current AI level, and all their projects
**And** projects are listed chronologically showing the contributor's progression

### Story 4.3: Contributors Leaderboard

As a team member,
I want to see a page listing all contributors with their AI levels,
So that I can see the team's overall AI adoption and who's leading.

**Acceptance Criteria:**

**Given** contributors exist in the database
**When** a user navigates to the contributors page
**Then** all contributors are listed with their name, AI level, and project count
**And** contributors can be sorted by AI level or project count
**And** the GET /api/contributors endpoint serves the data
