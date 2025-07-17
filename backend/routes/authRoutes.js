import express from "express";

const router = express.Router();
import { sendOtp, verifyOtp, signup, login } from "../controllers/authController.js";

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/signup", signup);

router.post("/login", login);

export default router;
