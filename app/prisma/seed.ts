import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create contributors
  const mateo = await prisma.contributor.upsert({
    where: { slackId: "U_MATEO" },
    update: {},
    create: { slackId: "U_MATEO", name: "Matéo", currentAiLevel: 3, projectCount: 2 },
  });
  const lea = await prisma.contributor.upsert({
    where: { slackId: "U_LEA" },
    update: {},
    create: { slackId: "U_LEA", name: "Léa", currentAiLevel: 4, projectCount: 2 },
  });
  const sarah = await prisma.contributor.upsert({
    where: { slackId: "U_SARAH" },
    update: {},
    create: { slackId: "U_SARAH", name: "Sarah", currentAiLevel: 1, projectCount: 1 },
  });
  const hadrien = await prisma.contributor.upsert({
    where: { slackId: "U_HADRIEN" },
    update: {},
    create: { slackId: "U_HADRIEN", name: "Hadrien", currentAiLevel: 5, projectCount: 1 },
  });

  // Create projects
  await prisma.project.createMany({
    data: [
      {
        title: "Repomix — Repo to AI Context",
        description: "Tool that packs an entire repo into a single AI-friendly XML file for Claude, Gemini or ChatGPT.",
        toolUsed: "Repomix + Claude",
        problemSolved: "Too much code context to paste into AI chat. Repomix compresses the whole repo into one file.",
        impact: "Can now ask AI questions about the entire codebase at once — saves hours of manual context building",
        aiLevel: 3,
        contributorSlackId: mateo.slackId,
        contributorName: mateo.name,
        voteCount: 8,
      },
      {
        title: "Automated Sprint Summaries",
        description: "Claude agent that reads Jira tickets and generates weekly sprint summaries for stakeholders.",
        toolUsed: "Claude Code + MCP",
        problemSolved: "Spent 2 hours every Friday manually writing sprint summaries from Jira.",
        impact: "2 hours → 10 minutes. Summaries are now more consistent and detailed.",
        aiLevel: 4,
        contributorSlackId: lea.slackId,
        contributorName: lea.name,
        voteCount: 12,
      },
      {
        title: "Email Rephrasing Assistant",
        description: "Using ChatGPT to rephrase client emails to sound more professional.",
        toolUsed: "ChatGPT",
        problemSolved: "Non-native English speaker, struggled with professional tone in client emails.",
        impact: "Emails are now clearer and more professional. Clients respond faster.",
        aiLevel: 1,
        contributorSlackId: sarah.slackId,
        contributorName: sarah.name,
        voteCount: 3,
      },
      {
        title: "Custom MCP Data Pipeline",
        description: "Built a custom MCP server that connects Claude directly to our internal analytics pipeline.",
        toolUsed: "Claude Code + Custom MCP Server",
        problemSolved: "Had to manually export data from analytics, paste into AI, then interpret. Now Claude reads it directly.",
        impact: "Data analysis that took 30 min now takes 2 min. Real-time insights during meetings.",
        aiLevel: 5,
        contributorSlackId: hadrien.slackId,
        contributorName: hadrien.name,
        voteCount: 15,
      },
      {
        title: "Bug Report Auto-Triage",
        description: "Workflow that auto-categorizes incoming bug reports using AI classification.",
        toolUsed: "Claude API + Zapier",
        problemSolved: "Bug reports sat in a generic queue. Triage took 20 min per bug to route to right team.",
        impact: "Bugs now auto-routed to the right team in seconds. Triage time reduced by 90%.",
        aiLevel: 3,
        contributorSlackId: mateo.slackId,
        contributorName: mateo.name,
        voteCount: 7,
      },
      {
        title: "Code Review Agent",
        description: "An autonomous agent that reviews PRs and suggests improvements before human review.",
        toolUsed: "Claude Code Agent",
        problemSolved: "Code reviews were a bottleneck — reviewers overloaded, PRs waiting days.",
        impact: "AI catches 70% of issues before human review. Review cycle cut from 2 days to 4 hours.",
        aiLevel: 4,
        contributorSlackId: lea.slackId,
        contributorName: lea.name,
        voteCount: 11,
      },
    ],
  });

  console.log("🌱 Seed data created!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
