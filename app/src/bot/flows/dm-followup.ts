import type { App } from "@slack/bolt";
import { createProjectFromFollowup } from "./create-project";

const FOLLOWUP_QUESTIONS = [
  "What's a short title for this AI project? (e.g., 'Automated Sprint Summaries')",
  "Which AI tool did you use? (e.g., Claude, ChatGPT, Gemini, Copilot...)",
  "What problem did it solve? (1-2 sentences)",
  "What was the impact? (e.g., time saved, quality improved...)",
  "Do you have a before/after screenshot URL? (optional — just type 'skip' to skip)",
];

interface PendingFollowup {
  userId: string;
  userName: string;
  channelMessageTs: string;
  currentQuestion: number;
  responses: string[];
  dmChannelId: string;
  createdAt: Date;
  reminderSent: boolean;
}

// In-memory store for pending followups (sufficient for internal tool)
const pendingFollowups = new Map<string, PendingFollowup>();

export function getPendingFollowups() {
  return pendingFollowups;
}

export async function startDmFollowup(
  app: App,
  userId: string,
  userName: string,
  channelMessageTs: string
) {
  try {
    // Open DM channel with user
    const dmResult = await app.client.conversations.open({ users: userId });
    const dmChannelId = dmResult.channel?.id;
    if (!dmChannelId) {
      console.error(`Failed to open DM channel with ${userName}`);
      return;
    }

    // Store pending followup
    pendingFollowups.set(userId, {
      userId,
      userName,
      channelMessageTs,
      currentQuestion: 0,
      responses: [],
      dmChannelId,
      createdAt: new Date(),
      reminderSent: false,
    });

    // Send intro + first question
    await app.client.chat.postMessage({
      channel: dmChannelId,
      text: `Hey ${userName}! 👋 Nice post in #panam-ai! I'd love to feature it on the AI Hall of Fame. A few quick questions (takes ~2 min):\n\n${FOLLOWUP_QUESTIONS[0]}`,
    });

    console.log(`📨 DM sent to ${userName} — starting followup flow`);
  } catch (error) {
    console.error(`Failed to start DM followup with ${userName}:`, error);
  }
}

export function registerDmListener(app: App) {
  app.message(async ({ message, client }) => {
    // Only handle DMs (im type)
    if (!("channel_type" in message) || message.channel_type !== "im") return;
    if (message.subtype) return;
    if (!("user" in message) || !message.user) return;
    if (!("text" in message) || !message.text) return;

    const userId = message.user;
    const followup = pendingFollowups.get(userId);
    if (!followup) return; // No pending followup for this user

    const response = message.text.trim();

    // Handle "skip" for optional questions
    const isSkippable = followup.currentQuestion === 4; // before/after URL
    const finalResponse = isSkippable && response.toLowerCase() === "skip" ? "" : response;

    // Store response
    followup.responses.push(finalResponse);
    followup.currentQuestion++;

    if (followup.currentQuestion < FOLLOWUP_QUESTIONS.length) {
      // Ask next question
      await client.chat.postMessage({
        channel: followup.dmChannelId,
        text: FOLLOWUP_QUESTIONS[followup.currentQuestion],
      });
    } else {
      // All questions answered — ready to create project
      await client.chat.postMessage({
        channel: followup.dmChannelId,
        text: "Thanks! 🎉 Your project will appear on the AI Hall of Fame shortly!",
      });

      console.log(
        `✅ Followup complete for ${followup.userName}:`,
        JSON.stringify({
          title: followup.responses[0],
          toolUsed: followup.responses[1],
          problemSolved: followup.responses[2],
          impact: followup.responses[3],
          beforeAfterUrl: followup.responses[4] || null,
        })
      );

      // Create project in database
      await createProjectFromFollowup(userId);
    }
  });
}
