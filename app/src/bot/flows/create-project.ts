import { prisma } from "../../lib/db";
import { getPendingFollowups } from "./dm-followup";

function detectAiLevel(toolUsed: string, description: string): number {
  const text = `${toolUsed} ${description}`.toLowerCase();

  if (
    text.includes("custom tool") ||
    text.includes("mcp") ||
    text.includes("plugin") ||
    text.includes("extension")
  )
    return 5;
  if (
    text.includes("agent") ||
    text.includes("claude code") ||
    text.includes("cursor") ||
    text.includes("autonomous")
  )
    return 4;
  if (
    text.includes("workflow") ||
    text.includes("automation") ||
    text.includes("pipeline") ||
    text.includes("chain")
  )
    return 3;
  if (
    text.includes("prompt") ||
    text.includes("template") ||
    text.includes("few-shot") ||
    text.includes("system prompt")
  )
    return 2;
  return 1; // Default: chatbot level
}

export async function createProjectFromFollowup(userId: string) {
  const followup = getPendingFollowups().get(userId);
  if (!followup || followup.responses.length < 4) return null;

  const title = followup.responses[0];
  const toolUsed = followup.responses[1];
  const problemSolved = followup.responses[2];
  const impact = followup.responses[3];
  const beforeAfterUrl = followup.responses[4] || null;
  const aiLevel = detectAiLevel(toolUsed, problemSolved);

  try {
    // Upsert contributor
    const contributor = await prisma.contributor.upsert({
      where: { slackId: followup.userId },
      update: {
        name: followup.userName,
        projectCount: { increment: 1 },
        currentAiLevel: {
          set: aiLevel, // Will be corrected below if existing level is higher
        },
      },
      create: {
        slackId: followup.userId,
        name: followup.userName,
        currentAiLevel: aiLevel,
        projectCount: 1,
      },
    });

    // Ensure contributor level is the max of existing and new
    if (contributor.currentAiLevel < aiLevel) {
      await prisma.contributor.update({
        where: { slackId: followup.userId },
        data: { currentAiLevel: aiLevel },
      });
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        description: `${problemSolved} — Impact: ${impact}`,
        toolUsed,
        problemSolved,
        impact,
        beforeAfterUrl,
        aiLevel,
        contributorSlackId: followup.userId,
        contributorName: followup.userName,
        slackMessageTs: followup.channelMessageTs,
      },
    });

    console.log(
      `✅ Project created: "${title}" by ${followup.userName} (L${aiLevel})`
    );

    // Remove from pending followups
    getPendingFollowups().delete(userId);

    return project;
  } catch (error) {
    console.error(`Failed to create project for ${followup.userName}:`, error);
    return null;
  }
}
