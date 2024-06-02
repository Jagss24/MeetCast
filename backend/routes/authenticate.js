import express from "express";
import {
  authentiCateOtpMobile,
  verifyOtpMobile,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sendOtp", authentiCateOtpMobile);

router.post("/verifyOtp", verifyOtpMobile);

export default router;
