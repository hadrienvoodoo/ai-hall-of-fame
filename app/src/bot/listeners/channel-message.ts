import type { App } from "@slack/bolt";
import { startDmFollowup, getPendingFollowups } from "../flows/dm-followup";

const CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

export function registerChannelListener(app: App) {
  app.message(async ({ message, client }) => {
    // Only process messages from #panam-ai channel
    if (!("channel" in message) || message.channel !== CHANNEL_ID) return;

    // Ignore bot messages, thread replies, and system messages
    if (message.subtype) return;
    if ("thread_ts" in message && message.thread_ts !== message.ts) return;
    if (!("user" in message) || !message.user) return;

    const userId = message.user;
    const messageTs = message.ts;

    // Skip if user already has a pending followup
    if (getPendingFollowups().has(userId)) {
      console.log(`⏭️ Skipping DM for ${userId} — already has pending followup`);
      return;
    }

    console.log(`📬 New message detected in #panam-ai from user ${userId}`);

    // Get user info for display name
    try {
      const userInfo = await client.users.info({ user: userId });
      const userName =
        userInfo.user?.real_name || userInfo.user?.name || userId;

      // Start DM followup
      await startDmFollowup(app, userId, userName, messageTs);
    } catch (error) {
      console.error(`Failed to process message from ${userId}:`, error);
    }
  });
}
