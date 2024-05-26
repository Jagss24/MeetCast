import express from "express";
// import authentiCateOtpMobile from "../controllers/auth-controller.js";
import { authentiCateOtpMobile } from "../controllers/auth-controller.js";
import { hashOtp } from "../services/otpServices.js";

const router = express.Router();

router.post("/sendOtp", authentiCateOtpMobile);

router.post("verify-otp", async (req, res) => {
  const { otp, hash, number } = req.body;
  if (!otp || !hash || !number)
    return res.status(400).json({ message: "all fields are required" });

  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > expires)
    return res.status(200).json({ message: "Otp is expired" });

  const data = `${number}.${otp}.${expires}`;

  const computedHash = await hashOtp(data);

  if (!(computedHash === hashedOtp))
    return res.status(400).json({ message: "Invalid Otp" });

  let userToken, accessToken, refereshToken;
});

router.post("/sendEmailOtp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
});

export default router;
