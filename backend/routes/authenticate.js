import express from "express";
import {
  authenticateOtpEmail,
  verifyOtpEmail,
  getUser,
  activateUser,
  autoReLoginFunctionality,
  loginUser,
  logoutFunctionality,
  searchUserFunctionality,
  getUserbyUserName,
  googleLogin,
} from "../controllers/auth-controller.js";
import { authMiddleWarefunc } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/sendOtp", authenticateOtpEmail);

router.post("/verifyOtp", verifyOtpEmail);

router.get("/getUser", getUser);

router.post("/activate", authMiddleWarefunc, activateUser);

router.get("/login", loginUser);

router.get("/autoReLogin", autoReLoginFunctionality);

router.get("/logout", logoutFunctionality);

router.get("/searchUser", searchUserFunctionality);

router.get("/getUserbyUserName", getUserbyUserName);

router.get("/google", googleLogin);

export default router;
