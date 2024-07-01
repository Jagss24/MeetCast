import express from "express";
import {
  authenticateOtpEmail,
  verifyOtpEmail,
  getUser,
  activateUser,
  autoReLoginFunctionality,
  loginUser,
  logoutFunctionality,
} from "../controllers/auth-controller.js";
import { authMiddleWarefunc } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/sendOtp", authenticateOtpEmail);

router.post("/verifyOtp", verifyOtpEmail);

router.get("/getUser", getUser);

router.post("/activate", authMiddleWarefunc, activateUser);

router.post("/login", loginUser);

router.get("/autoReLogin", autoReLoginFunctionality);

router.get("/logout", logoutFunctionality);

export default router;
