import express from "express";
import Refresh from "../models/refreshModel.js";
import { findUserById } from "../services/userService.js";
import { createRoom, roomDto } from "../services/roomServices.js";

const router = express.Router();

router.post("/createRoom", async (req, res) => {
  const { topic, roomType } = req.body();
  const { refreshtoken } = req.cookies();
  if (!topic || !roomtType) {
    return res.status(200).json({ message: "Topic and roomType is mandatory" });
  }
  if (refreshtoken) {
    const userToken = await Refresh.findOne({ token: refreshtoken });
    const user = await findUserById(userToken?.userId);
    if (!user) {
      return res.status(404).json({ message: "No user Found" });
    }
    const ownerId = user._id;
    const room = await createRoom({ topic, roomType, ownerId });
    const roomDto = await roomDto(room);
  } else {
    res
      .status(200)
      .json({ message: "Your Session has expired. Please Login again" });
  }
});
export default router;
