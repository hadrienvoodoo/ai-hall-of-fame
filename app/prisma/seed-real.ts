import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Contributors
  await prisma.contributor.createMany({
    data: [
      { slackId: "U073E2GL57B", name: "Matéo", currentAiLevel: 3, projectCount: 1 },
      { slackId: "U01AP1QQ28Y", name: "Anil", currentAiLevel: 5, projectCount: 2 },
      { slackId: "UPDN3RMNC", name: "Eugene", currentAiLevel: 4, projectCount: 1 },
      { slackId: "U74N6A75J", name: "Hadrien", currentAiLevel: 5, projectCount: 2 },
    ],
  });

  // Projects from real #panam-ai posts
  await prisma.project.createMany({
    data: [
      {
        title: "Repomix — Full Repo to AI Context",
        description: "Tool that packs an entire Unity repo into a single AI-friendly XML file for Claude, Gemini or ChatGPT. Includes custom filtering to keep only relevant PO2 project files.",
        toolUsed: "Repomix + Claude Chat",
        problemSolved: "Too much code to paste into AI chat. Needed a way to give full codebase context to LLMs for non-Claude Code tasks.",
        impact: "Can now ask AI questions about the entire codebase at once — no more manual copy-pasting of files",
        aiLevel: 3,
        contributorSlackId: "U073E2GL57B",
        contributorName: "Matéo",
        voteCount: 2,
        createdAt: new Date("2026-03-19T10:24:00"),
      },
      {
        title: "BMAD Thermal Profiling App",
        description: "Built a full Windows app for thermal profiling from scratch in 30-40 min using BMAD method. Detects Android device via USB, reads thermal metrics, shows real-time graph, exports HTML reports.",
        toolUsed: "Rider + Codex + BMAD Agents",
        problemSolved: "Thermal profiling required manual setup with CLI tools. No easy way to monitor device temperature during gameplay sessions.",
        impact: "30-40 min from zero to working app. Full UI, USB detection, real-time graphs, HTML export. Zero lines of code written manually.",
        aiLevel: 5,
        contributorSlackId: "U01AP1QQ28Y",
        contributorName: "Anil",
        voteCount: 8,
        createdAt: new Date("2026-03-17T22:52:00"),
      },
      {
        title: "BMAD Shader Performance Analyzer",
        description: "Unity editor tool that automates GPU shader analysis. Previously required manual compilation, file extraction, and CLI execution for each shader pass. Now handles everything with minimum input.",
        toolUsed: "BMAD Agents (Full Pipeline)",
        problemSolved: "Assessing shader performance on different GPU architectures required an esoteric CLI tool from Arm Studio with tedious manual steps for each shader pass.",
        impact: "Entire tool built by AI agents — zero manual code. Everyone on the team can now check shader boundness info whenever needed.",
        aiLevel: 5,
        contributorSlackId: "U01AP1QQ28Y",
        contributorName: "Anil",
        voteCount: 7,
        createdAt: new Date("2026-03-18T21:52:00"),
      },
      {
        title: "Perf Metrics History & Comparison Tool",
        description: "App that stores history of performance metrics CSV files exported from the game and allows comparing them across versions. Replaces manual comparison process.",
        toolUsed: "AI-assisted development",
        problemSolved: "Comparing performance metrics between game versions was done manually by eyeballing CSV files side by side.",
        impact: "Automated comparison with visual diffs. Historical tracking of perf metrics across all builds.",
        aiLevel: 4,
        contributorSlackId: "UPDN3RMNC",
        contributorName: "Eugene",
        voteCount: 10,
        createdAt: new Date("2026-03-16T14:33:00"),
      },
      {
        title: "Release Train AI Agent (Concept)",
        description: "4-module AI agent system for automating the Paper.io 2 release workflow: RT Kickoff Generator, Progress Tracker, Bug Digest & Notion Sync, RC Lifecycle Manager.",
        toolUsed: "Claude Code + Cowork Skills",
        problemSolved: "Release train process is highly manual — kickoff messages, progress tracking, bug triaging, and RC management all done by hand in Slack.",
        impact: "Concept validated with full spec. Will automate weekly release cycle touchpoints, bug detection, progress aggregation, and build tracking.",
        aiLevel: 4,
        contributorSlackId: "U74N6A75J",
        contributorName: "Hadrien",
        voteCount: 2,
        createdAt: new Date("2026-03-16T15:07:00"),
      },
      {
        title: "Paper.io 2 AI Discovery Agent",
        description: "AI assistant with full game context — knows the codebase, game design, analytics, and team processes. Available as a Netlify-hosted tool for the whole team.",
        toolUsed: "Claude + Custom Context + Netlify",
        problemSolved: "Team members needed quick answers about the game's systems, analytics, and architecture without digging through docs or asking senior devs.",
        impact: "Instant access to game knowledge for the entire team. Reduces time spent searching for information and onboarding friction.",
        aiLevel: 4,
        contributorSlackId: "U74N6A75J",
        contributorName: "Hadrien",
        voteCount: 1,
        createdAt: new Date("2026-03-16T14:59:00"),
      },
    ],
  });

  console.log("🌱 Real data seeded from #panam-ai!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
