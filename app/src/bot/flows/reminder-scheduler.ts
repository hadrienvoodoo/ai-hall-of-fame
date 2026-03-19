import type { App } from "@slack/bolt";
import { getPendingFollowups } from "./dm-followup";

const REMINDER_AFTER_MS = 24 * 60 * 60 * 1000; // 24 hours
const TIMEOUT_AFTER_MS = 48 * 60 * 60 * 1000; // 48 hours
const CHECK_INTERVAL_MS = 60 * 60 * 1000; // Check every hour

export function startReminderScheduler(app: App) {
  setInterval(async () => {
    const now = new Date();
    const followups = getPendingFollowups();

    for (const [userId, followup] of followups.entries()) {
      const elapsed = now.getTime() - followup.createdAt.getTime();

      // Timeout: remove after 48h
      if (elapsed > TIMEOUT_AFTER_MS) {
        console.log(
          `⏰ Timeout for ${followup.userName} — removing pending followup`
        );
        followups.delete(userId);
        continue;
      }

      // Reminder: send after 24h if not already sent
      if (elapsed > REMINDER_AFTER_MS && !followup.reminderSent) {
        try {
          await app.client.chat.postMessage({
            channel: followup.dmChannelId,
            text: `Hey ${followup.userName}! 👋 Just a gentle reminder — I still have a couple of questions about your #panam-ai post. Takes less than 2 min! If you'd rather skip, no worries at all.`,
          });
          followup.reminderSent = true;
          console.log(`🔔 Reminder sent to ${followup.userName}`);
        } catch (error) {
          console.error(
            `Failed to send reminder to ${followup.userName}:`,
            error
          );
        }
      }
    }
  }, CHECK_INTERVAL_MS);

  console.log("⏰ Reminder scheduler started (checks every hour)");
}
