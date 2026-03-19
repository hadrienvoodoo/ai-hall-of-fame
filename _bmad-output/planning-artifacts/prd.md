---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments: ['product-brief-ai-hall-of-fame-2026-03-19.md', 'brainstorming-session-2026-03-19-1030.md']
workflowType: 'prd'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - ai-hall-of-fame

**Author:** Hadrien
**Date:** 2026-03-19

## Executive Summary

AI Hall of Fame is an internal showcase website that automatically surfaces AI achievements from the team's Slack channel (#panam-ai) and transforms them into an inspiring, curated portfolio. A Slack bot monitors the channel, DMs contributors with structured follow-up questions, and auto-generates project cards on the site. The site displays projects with before/after comparisons, AI adoption levels, and team voting — creating positive social pressure that drives the team from chatbot-level AI usage toward agents and advanced workflows.

**Target Users:** Internal team members across all AI adoption levels — from skeptics to power users — plus GM (Hadrien) as admin.

**Core Problem:** The team underutilizes AI. Most stay at chatbot-level usage while agents, automated workflows, and custom tools exist. Great work shared in #panam-ai gets buried in the feed with no structure, no progression tracking, and no lasting visibility.

### What Makes This Special

- **Zero friction:** No forms, no login, no manual submission — the Slack bot does all the work via DMs
- **Organic content pipeline:** Content comes from natural team behavior in #panam-ai, not forced processes
- **Visible progression:** AI adoption levels (L1→L5) make growth aspirational and trackable
- **Social dynamics:** Team voting and peer visibility create positive pressure to level up

## Project Classification

- **Project Type:** Web App + Slack Bot
- **Domain:** General (internal team tool)
- **Complexity:** Low
- **Project Context:** Greenfield

## Success Criteria

### User Success

- Team members discover relatable AI use cases from peers that inspire them to try new approaches
- Contributors feel recognized for their AI work without any extra effort
- Skeptics move from "this isn't for me" to "I could try that" after seeing peer projects

### Business Success

- Accelerate team-wide AI adoption from chatbot-level to agent-level usage
- Make AI fluency a visible, shared cultural norm across the team
- Build an always-current knowledge base of proven AI applications in the team's context

### Technical Success

- Bot reliably detects posts in #panam-ai and initiates DM conversations
- Project cards are auto-generated from bot-collected data without manual intervention
- Site loads fast and is browsable without authentication

### Measurable Outcomes

| KPI | Target | Timeframe |
|-----|--------|-----------|
| Team coverage | 80% of team members have at least 1 project on the site | 2 months |
| Level progression | Average AI level moves from ~L1.5 to L3 | 2 months |
| Post frequency | Sustained growth in #panam-ai posts per month | Ongoing |
| Voting engagement | Majority of team votes on projects regularly | Ongoing |
| Bot response rate | 90%+ of DM'd contributors complete the follow-up questions | Ongoing |

## Product Scope

### MVP - Minimum Viable Product

1. **Slack Bot** — Monitors #panam-ai, detects new posts, DMs contributors with structured follow-up questions
2. **Showcase Website** — Displays project cards with title, description, AI tool used, before/after, AI level tag
3. **Voting System** — Team members upvote projects, most popular rise to the top
4. **AI Adoption Levels** — Visible per person: L1 Chatbot → L2 Prompt Engineering → L3 Workflows → L4 Agents → L5 Custom Tools

### Post-MVP Features

No V2 planned. Ship V1, iterate based on actual team usage and feedback. Potential additions if needed:
- Analytics/admin dashboard for GM
- Peer nomination system
- Slack notifications/digests
- Onboarding flow for new team members

## User Journeys

### Journey 1: The Contributor (Happy Path)

**Matéo**, a game developer, discovers Repomix — a tool that packs an entire repo into AI-friendly context. He posts about it in #panam-ai with a code snippet and a brief explanation.

Within minutes, the AI Hall of Fame bot DMs him: "Nice post! A few quick questions to feature this on the showcase..." The bot asks what tool he used, what problem it solved, what the impact was, and if he has a before/after screenshot. Matéo replies in the DM thread — takes 2 minutes.

His project card appears on the site automatically. Colleagues browse, see the before/after, and upvote it. Matéo sees his AI level is tagged as L2 (Prompt Engineering). He thinks: "Maybe I should try building an agent next to level up."

**Capabilities revealed:** Slack channel monitoring, DM conversation flow, project card generation, AI level tagging, voting.

### Journey 2: The Skeptic Becomes Curious

**Sarah**, a project manager, has only used ChatGPT to rephrase emails. She hears about the AI Hall of Fame site in a team meeting and checks it out.

She sees 15 project cards from colleagues. One catches her eye — a PM on another team automated their weekly status reports using Claude. The before/after is striking: 2 hours of manual work → 10 minutes. She thinks: "If they can do that for status reports, I could probably do it for my sprint summaries."

She doesn't post anything yet, but she starts experimenting. Two weeks later, she posts her first AI win in #panam-ai.

**Capabilities revealed:** Browse projects without authentication, filter/sort by AI level or popularity, before/after display, inspiration through peer examples.

### Journey 3: The Power User Maintains Status

**Léa**, a senior engineer, already uses Claude Code with MCP servers daily. She's posted 4 projects on the Hall of Fame and is tagged L4 (Agents). She regularly browses the site to see new submissions and votes on projects she finds impressive.

When a new colleague posts a clever agent-based workflow, Léa upvotes it and feels motivated to share her latest automation — a custom MCP tool that connects Claude to their internal data pipeline.

**Capabilities revealed:** Multi-project contributor profile, voting on others' projects, AI level progression visibility, repeat engagement loop.

### Journey 4: The GM Admin View

**Hadrien** checks the site weekly to see team AI adoption trends. He sees which team members have posted, what AI levels are represented, and which projects are most popular. He uses this as a pulse check during team meetings — mentioning standout projects to reinforce the culture.

**Capabilities revealed:** Overview of all projects and contributors, visibility into adoption levels, ability to reference projects in team communications.

### Journey Requirements Summary

| Capability Area | Revealed By |
|----------------|-------------|
| Slack channel monitoring | Journey 1 |
| Bot DM conversation flow | Journey 1 |
| Project card auto-generation | Journey 1 |
| AI level tagging & display | Journeys 1, 2, 3 |
| Voting system | Journeys 1, 3 |
| Browse without auth | Journey 2 |
| Before/after display | Journeys 1, 2 |
| Contributor profiles | Journeys 3, 4 |
| Project listing with sort/filter | Journeys 2, 3, 4 |

## Web App Specific Requirements

### Technical Architecture Considerations

- **SPA or static site** for the showcase frontend — no login required
- **Slack Bot** using Slack API (Events API for channel monitoring, Web API for DMs)
- **Backend/data store** to persist project cards, votes, and contributor data
- **No complex infrastructure** — keep deployment simple for an internal tool

### Slack Bot Integration

- Bot must listen to #panam-ai channel for new messages
- Bot must send DMs to post authors with structured follow-up questions
- Bot must handle threaded DM conversations and extract structured data from replies
- Bot must handle non-responses gracefully (reminder after 24h, give up after 48h)

### Implementation Considerations

- Slack workspace permissions needed for bot to read channel and send DMs
- Consider rate limiting for bot DMs to avoid spamming
- Project card data model: title, description, tool used, problem solved, impact, before/after image URL, AI level, contributor, date, vote count

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solving MVP — prove that a zero-friction Slack-to-site pipeline can drive AI adoption visibility and motivation.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** Contributor happy path, Skeptic browsing, Power user voting, GM overview

**Must-Have Capabilities:**
- Slack bot monitoring + DM follow-up flow
- Showcase website with project cards
- Before/after display on cards
- AI adoption level per contributor
- Voting on projects
- Browse without authentication

### Risk Mitigation Strategy

**Technical Risks:** Slack API rate limits and permissions — mitigate with early Slack app setup and testing.
**Adoption Risks:** Team doesn't post in #panam-ai — mitigate by seeding with Hadrien's own projects and mentioning in team meetings.
**Data Quality Risks:** Bot gets poor-quality responses — mitigate with well-crafted follow-up questions and optional fields.

## Functional Requirements

### Slack Bot

- FR1: Bot can detect new messages posted in the configured #panam-ai Slack channel
- FR2: Bot can send a DM to the message author with structured follow-up questions
- FR3: Bot can collect responses from the DM thread and extract structured project data
- FR4: Bot can send a reminder DM if the contributor hasn't responded within 24 hours
- FR5: Bot can stop follow-up attempts after 48 hours of non-response
- FR6: Bot can create a project card entry from collected DM responses

### Project Cards

- FR7: System can display project cards with title, description, AI tool used, problem solved, and impact
- FR8: System can display before/after comparison on project cards (image or text)
- FR9: System can display the contributor's name and AI adoption level on each card
- FR10: System can display the date a project was posted
- FR11: System can sort projects by most recent, most voted, or AI level

### Voting

- FR12: Team members can upvote a project card
- FR13: System can display the vote count on each project card
- FR14: System can rank projects by vote count

### AI Adoption Levels

- FR15: System can assign an AI adoption level (L1-L5) to each contributor based on their projects
- FR16: System can display adoption levels: L1 Chatbot, L2 Prompt Engineering, L3 Workflows, L4 Agents, L5 Custom Tools
- FR17: System can update a contributor's level as they post new projects at higher levels

### Contributor Profiles

- FR18: System can display a contributor's profile showing all their projects and current AI level
- FR19: System can list all contributors with their AI levels

### Site Browsing

- FR20: Users can browse the showcase site without authentication
- FR21: Users can filter projects by AI level
- FR22: Users can search projects by keyword

## Non-Functional Requirements

### Performance

- Site pages load within 2 seconds on standard connections
- Bot responds to new #panam-ai posts within 5 minutes
- Voting interactions respond within 500ms

### Security

- Slack bot tokens stored securely (environment variables, not in code)
- Voting limited to authenticated team members via Slack identity (no anonymous vote manipulation)
- No sensitive data stored — all project information is meant to be visible to the team

### Integration

- Slack Events API for real-time channel monitoring
- Slack Web API for sending DMs and managing conversations
- Slack user identity for contributor profiles and vote authentication
