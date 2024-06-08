import express from "express";
import {
  authentiCateOtpMobile,
  verifyOtpMobile,
  getUser,
} from "../controllers/auth-controller.js";
import User from "../models/user-model.js";
import { userDto } from "../services/userService.js";

const router = express.Router();

router.post("/sendOtp", authentiCateOtpMobile);

router.post("/verifyOtp", verifyOtpMobile);

router.get("/getUser", getUser);

router.post("/activate", async (req, res) => {
  const { userId, name } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.name = name;
    user.activated = true;
    await user.save();
    const userData = await userDto(user);
    res.status(200).json({ userData });
  }
});

export default router;
