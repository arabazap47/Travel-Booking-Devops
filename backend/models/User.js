import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  emailOrMobile: { type: String, unique: true },
  role: { 
    type: String, 
    enum: ["USER", "OWNER", "ADMIN"], 
    default: "USER" 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
