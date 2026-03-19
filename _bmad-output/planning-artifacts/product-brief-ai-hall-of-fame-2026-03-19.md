---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: ['brainstorming-session-2026-03-19-1030.md']
date: 2026-03-19
author: Hadrien
---

# Product Brief: ai-hall-of-fame

## Executive Summary

AI Hall of Fame is an internal showcase website that automatically surfaces AI achievements from the team's Slack channel (#panam-ai) and transforms them into an inspiring, curated portfolio. A Slack bot handles content collection via DMs — zero friction for contributors — while the site displays project cards with impact metrics, before/after comparisons, and AI adoption levels. The goal: make AI mastery visible, aspirational, and contagious across the team.

---

## Core Vision

### Problem Statement

The team underutilizes AI — most members stay at chatbot-level usage while significantly more powerful tools (agents, custom workflows, MCP) exist. As GM, Hadrien has experienced the transformative potential of advanced AI firsthand and sees a massive productivity/impact gap if the team doesn't level up.

### Problem Impact

The team misses out on compounding productivity gains. As the industry accelerates AI adoption, staying at basic usage means falling behind competitors and peer teams. Individual team members miss opportunities to amplify their craft.

### Why Existing Solutions Fall Short

The #panam-ai Slack channel exists but is purely organic — posts scroll by, there's no structure, no visibility into who's doing what, no progression tracking, and no lasting showcase. Great work gets buried in the feed.

### Proposed Solution

A website powered by a Slack bot that:
- Monitors #panam-ai for new posts
- DMs contributors directly with structured follow-up questions (tool used, problem solved, impact, before/after)
- Auto-generates project cards on the showcase site
- Displays AI adoption levels per person (L1 Chatbot → L5 Custom Tools)
- Surfaces most popular projects through team voting

### Key Differentiators

- **Zero friction:** No forms, no login, no manual submission — the bot does the work via Slack DMs
- **Organic content pipeline:** Content comes from natural team behavior, not forced processes
- **Visible progression:** AI adoption levels make growth aspirational and trackable
- **Social dynamics:** Team voting and visibility create positive peer pressure to level up

---

## Target Users

### Primary Users

**1. The Skeptic — "Sarah"**
Uses AI minimally — rephrasing emails, basic Q&A. Doesn't see how it applies to her actual work. Feels overwhelmed by the hype. Needs to see concrete, relatable examples from peers in her own team — not tech influencers — to realize it's accessible.

**2. The Curious Middle — "Matéo"**
Uses chatbots regularly and knows AI is powerful, but hasn't taken the leap to agents or automated workflows. Needs a success story close enough to his own work to think "if it worked for them, it works for me." The before/after format is his trigger.

**3. The Power User — "Léa"**
Already uses agents, MCP, Claude Code. She's ahead of the curve and wants that to be visible. Motivated by status, recognition, and staying on top. She'll be the first to post and the most engaged voter.

### Secondary Users

**4. GM / Admin — "Hadrien"**
Monitors team AI adoption progression, sees who's leveling up, identifies gaps. Uses the site as a pulse check on the team's AI maturity and as evidence of cultural shift.

### User Journey

| Stage | Experience |
|-------|-----------|
| **Discovery** | Team member posts an AI win in #panam-ai naturally |
| **Onboarding** | Bot DMs them privately with structured follow-up questions — zero effort |
| **Core Usage** | Browse the showcase site, see peers' projects, vote on favorites |
| **Aha Moment** | "My colleague automated that whole workflow with an agent? I could do that too" |
| **Long-term** | Track own AI level, try to level up, post more wins, inspire others |

---

## Success Metrics

### User Success Metrics

- Team members discover relatable AI use cases that inspire them to try new approaches
- Contributors feel recognized for their AI work without extra effort
- Skeptics move from "this isn't for me" to "I could try that"

### Business Objectives

- Accelerate team-wide AI adoption from chatbot-level to agent-level usage
- Make AI fluency a visible, shared cultural norm — not a niche skill
- Build an always-current knowledge base of what works with AI in the team's context

### Key Performance Indicators

| KPI | Target | Timeframe |
|-----|--------|-----------|
| **Team coverage** | 80% of team members have at least 1 project on the site | 2 months |
| **Level progression** | Average AI level moves from ~L1.5 to L3 | 2 months |
| **Post frequency** | Sustained growth in #panam-ai posts per month | Ongoing |
| **Voting engagement** | Majority of team votes on projects regularly | Ongoing |
| **Bot response rate** | 90%+ of DM'd contributors complete the follow-up questions | Ongoing |

---

## MVP Scope

### Core Features

1. **Slack Bot** — Monitors #panam-ai channel, detects new posts, DMs contributors directly with structured follow-up questions (tool used, problem solved, impact, before/after screenshot)
2. **Showcase Website** — Displays project cards with title, description, AI tool used, before/after, and AI adoption level tag
3. **Voting System** — Team members can upvote projects on the site, most popular rise to the top
4. **AI Adoption Levels** — Visible per person: L1 Chatbot → L2 Prompt Engineering → L3 Workflows → L4 Agents → L5 Custom Tools

### Out of Scope for MVP

- Analytics/admin dashboard
- Peer nomination system
- New member onboarding flow
- Email/Slack notifications or digests
- No V2 planned — ship V1, see what happens

### MVP Success Criteria

- Bot successfully captures project data from #panam-ai contributors via DM
- Site displays project cards that the team actually browses and votes on
- 80% team coverage within 2 months
- Average AI level progression visible and trending upward

### Future Vision

No V2 planned. If V1 works, iterate based on what the team actually needs. Keep it lean.
