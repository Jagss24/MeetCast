import express from "express";
import Refresh from "../models/refreshModel.js";
import { findUserById } from "../services/userService.js";
import { createRoom, getRooms, roomDto } from "../services/roomServices.js";

const router = express.Router();

router.post("/createRoom", async (req, res) => {
  const { topic, roomType } = req.body;
  const { refreshtoken } = req.cookies;
  if (!topic || !roomType) {
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
    const roomDtos = await roomDto(room);
    res.status(200).json({ roomDtos });
  } else {
    res
      .status(200)
      .json({ message: "Your Session has expired. Please Login again" });
  }
});

router.get("/getRooms", async (req, res) => {
  const rooms = await getRooms("open");
  res.status(200).json({ rooms });
});
export default router;
