import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  emailOrMobile: String,
  otp: String,
  expiresAt: Date
});

export default mongoose.model("Otp", otpSchema);
