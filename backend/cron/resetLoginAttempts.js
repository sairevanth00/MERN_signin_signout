import cron from "node-cron";
import User from "../models/userModel.js";

cron.schedule("0 */3 * * *", async () => {
  await User.updateMany({}, { loginAttempts: 0, lockUntil: null });
  console.log("Reset login attempts.");
});
