import express from "express";
// import authentiCateOtpMobile from "../controllers/auth-controller.js";
import { authentiCateOtpMobile } from "../controllers/auth-controller.js";
const router = express.Router();

router.post("/sendOtp", authentiCateOtpMobile);

export default router;
