---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: 'Internal team website showcasing AI achievements to inspire and drive advanced AI adoption'
session_goals: 'Inspire team members, create progression path from chatbot to agents, drive adoption'
selected_approach: 'ai-recommended'
techniques_used: ['Role Playing', 'Analogical Thinking', 'SCAMPER Method']
ideas_generated: [15]
context_file: ''
session_active: false
workflow_completed: true
---

# Brainstorming Session Results

**Facilitator:** Hadrien
**Date:** 2026-03-19

## Session Overview

**Topic:** Internal team website showcasing AI achievements — an "AI Hall of Fame" to highlight what team members have built with AI, inspire peers, and drive adoption toward more advanced usage (from chatbot to agents and beyond).

**Goals:**
- Inspire team members through visible, concrete examples
- Create a progression path from basic (chatbot) to advanced (agents) AI usage
- Drive adoption and ambition across the team

### Session Setup

_Hadrien wants to build a showcase platform for his team's AI accomplishments. The core challenge is moving people from passive AI use (chatbot Q&A) toward agentic, autonomous workflows. The site should make advanced AI usage visible, aspirational, and accessible._

## Technique Selection

**Approach:** AI-Recommended Techniques (Lightning Round — 10 min)
**Analysis Context:** AI Hall of Fame with focus on behavior change and team adoption

**Recommended Techniques:**
- **Role Playing:** Understand different team member personas and what motivates them
- **Analogical Thinking:** Draw patterns from successful inspiration platforms
- **SCAMPER Method:** Systematically explore and refine features

## Technique Execution Results

### Role Playing — 3 Personas

**Persona A — The Skeptic** (uses AI for basic tasks only)
- Key insight: Social pressure works — they don't want to be the only one with nothing on the board
- The GM (Hadrien) publicly applauding those who take the leap adds weight

**Persona B — The Curious Middle** (uses chatbots but hasn't gone further)
- Key insight: They need relatable success stories — "if it worked for their project, it works for mine"
- Advanced use cases that succeeded are the trigger

**Persona C — The Power User** (already uses agents, MCP, Claude Code)
- Key insight: They want to show they're the best at the AI game — status and recognition drive them

**Three core levers identified:**
1. Social pressure + GM visibility
2. Relatable success stories
3. Status and recognition

### Analogical Thinking — Pattern Stealing

**Platforms analyzed:** Strava, Product Hunt, Duolingo, GitHub, Dribbble

**Winning patterns selected:**
- **Product Hunt:** Upvotes, launch moments, maker identity, discovery feed
- **GitHub:** Contribution history, project showcase, visible proof of work

**Dropped:** Strava (too fitness-oriented), Duolingo (too gamified), Dribbble (too visual-only)

### SCAMPER Method — Feature Exploration

| Lens | Idea | Status |
|------|------|--------|
| **Substitute** | Team votes instead of GM curation — organic popularity | KEPT |
| **Combine** | Project card with before/after showing AI impact | KEPT |
| **Adapt** | AI adoption levels per person (L1 Chatbot → L5 Custom tools) | KEPT |
| **Modify** | WIP "currently building" section | DROPPED — not wanted |
| **Put to other uses** | Site as onboarding resource for new team members | KEPT |
| **Eliminate** | No login, no forms — everything flows through Slack | KEPT |
| **Reverse** | Peer nomination — tag someone else's achievement | KEPT |

**Key pivot during SCAMPER:** No direct submission on the site. Instead, a Slack bot monitors the #panam-ai channel, DMs contributors with follow-up questions, and auto-generates project cards on the site. Zero friction.

## Idea Organization and Prioritization

### Theme 1: Content Pipeline (Slack → Site)
- The #panam-ai Slack channel is the single source of content
- A bot detects new posts and DMs the person directly with structured follow-up questions (tool used, problem solved, impact, screenshot/before-after)
- Responses automatically populate a project card on the site
- Zero friction — no forms, no login, no manual submission

### Theme 2: Engagement & Social Dynamics
- Team voting system — most popular projects rise organically (no top-down curation)
- Positive social pressure — nobody wants to be the only one without a project
- Peer recognition — ability to tag/nominate a colleague in the channel

### Theme 3: Progression & Adoption
- Visible AI adoption levels per person: L1 Chatbot → L2 Prompt Engineering → L3 Workflows → L4 Agents → L5 Custom Tools
- Before/After on each project card — makes impact concrete and undeniable
- Site doubles as onboarding resource — new members immediately see what's possible

### Theme 4: UX & Simplicity
- No login, no complex forms
- Everything flows through Slack — the tool the team already uses
- The site is a read-only showcase, not a submission tool

### Prioritization Results

**Top Priority:**
1. **Slack Bot (DM-based)** — The core of the system, everything depends on it
2. **Project cards with before/after + AI level** — The content that inspires
3. **Team voting / popularity** — The engagement that keeps people coming back

**Quick Wins:**
- Set up the Slack channel monitoring
- Design the project card template
- Define the AI adoption level framework

**Longer-term:**
- Onboarding integration
- Peer nomination workflows
- Analytics on team AI adoption progression

## Session Summary

**Key Achievements:**
- Clear product concept: Slack-powered AI showcase with zero-friction content pipeline
- Three core engagement levers identified (social pressure, relatable stories, status)
- Feature set refined through SCAMPER — kept what matters, dropped what doesn't
- Concrete architecture: Slack bot DMs → project cards → voting → showcase site

**Decisions Made:**
- No GitHub integration (not everyone uses it)
- No WIP/in-progress view
- No direct site submission — Slack is the only input
- No GM curation — team votes drive visibility
- Bot contacts people via DM, not in-channel replies
