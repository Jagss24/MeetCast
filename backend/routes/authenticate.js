import express from "express";

const router = express.Router();

router.post("/sendOtp", (req, res) => {
  res.send("SendOtp");
});

export default router;
