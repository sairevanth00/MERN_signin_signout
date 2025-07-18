import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
});

export default mongoose.model("User", userSchema);
