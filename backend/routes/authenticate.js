import express from "express";
import {
  authentiCateOtpMobile,
  verifyOtpMobile,
  getUser,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sendOtp", authentiCateOtpMobile);

router.post("/verifyOtp", verifyOtpMobile);

router.get("/getUser", getUser);

export default router;
