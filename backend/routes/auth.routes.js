import express from "express";
import { sendOtp, verifyOtp, checkUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/check-user", checkUser); 
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
