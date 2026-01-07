import dotenv from "dotenv";
dotenv.config();

import Otp from "../models/Otp.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error) => {
  if (error) {
    console.error("Email config error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});


export const sendOtp = async (req, res) => {
  try {
    const { emailOrMobile } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ emailOrMobile });

    await Otp.create({
      emailOrMobile,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60000)
    });

    await transporter.sendMail({
  from: `"Travelly Support" `,
  to: emailOrMobile,
  subject: "Your Travelly Login OTP",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #2563eb;">Travelly Login OTP</h2>
      <p>Hello,</p>
      <p>Your One-Time Password (OTP) is:</p>
      <h1 style="letter-spacing: 4px;">${otp}</h1>
      <p>This OTP is valid for <b>5 minutes</b>.</p>
      <p style="color: #dc2626;">
        Do not share this OTP with anyone.
      </p>
      <p>If you did not request this login, you can safely ignore this email.</p>
      <br/>
      <p>Thanks,<br/><b>Team Travelly</b></p>
    </div>
  `
});


    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  const { emailOrMobile, otp, name, role } = req.body;

  const record = await Otp.findOne({ emailOrMobile, otp });
  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  let user = await User.findOne({ emailOrMobile });
let isNewUser = false;

if (!user) {
  isNewUser = true;
  user = await User.create({
    name,
    emailOrMobile,
    role: role || "USER"
  });
}


  const token = jwt.sign(
  {
    id: user._id,
    email: user.emailOrMobile,   // ✅ ADD THIS
    role: user.role,
    name: user.name
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);  



  await Otp.deleteMany({ emailOrMobile });

  res.json({
  token,
  role: user.role,
  name: user.name,
  isNewUser
});


};
export const checkUser = async (req, res) => {
  try {
    const { emailOrMobile } = req.body;

    const user = await User.findOne({ emailOrMobile });

    res.json({
      exists: !!user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

