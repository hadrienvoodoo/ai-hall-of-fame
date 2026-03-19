import "dotenv/config";
import { App } from "@slack/bolt";
import { registerChannelListener } from "./listeners/channel-message";
import { registerDmListener } from "./flows/dm-followup";
import { startReminderScheduler } from "./flows/reminder-scheduler";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Register listeners
registerChannelListener(app);
registerDmListener(app);

(async () => {
  await app.start();
  startReminderScheduler(app);
  console.log("⚡️ AI Hall of Fame bot is running in Socket Mode");
})();

export { app };
