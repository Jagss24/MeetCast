import express from "express";
import Refresh from "../models/refreshModel.js";
import { findUser, findUserById } from "../services/userService.js";
import {
  addUserinMemberList,
  addUserinWaitingList,
  createRoom,
  getRooms,
  getSingleRoom,
  getSpeakerRooms,
  getUserRoomsWithType,
  removeUserFromRoom,
  roomDto,
} from "../services/roomServices.js";

const router = express.Router();

router.post("/createRoom", async (req, res) => {
  const { topic, roomType, accessibility, speakers } = req.body;
  const { refreshtoken } = req.cookies;
  if (!topic || !roomType || !accessibility) {
    return res.status(200).json({
      message: "Topic, roomType and it's accessibility is mandatory ",
    });
  }
  if (refreshtoken) {
    const userToken = await Refresh.findOne({ token: refreshtoken });
    const user = await findUserById(userToken?.userId);
    if (!user) {
      return res.status(404).json({ message: "No user Found" });
    }
    const ownerId = user._id;
    const room = await createRoom({
      topic,
      roomType,
      accessibility,
      ownerId,
      speakers,
    });
    const roomDtos = await roomDto(room);
    res.status(200).json({ roomDtos });
  } else {
    res
      .status(200)
      .json({ message: "Your Session has expired. Please Login again" });
  }
});

router.get("/getRooms", async (req, res) => {
  const rooms = await getRooms("podcast");
  res.status(200).json({ rooms });
});

router.get("/getSingleRoom", async (req, res) => {
  const { roomId } = req.query;
  const room = await getSingleRoom(roomId);
  if (!room) {
    return res.status(404).json({ message: "Not a Valid Room Id " });
  }
  res.status(200).json({ room });
});

router.get("/getUserRoom", async (req, res) => {
  const { userName, roomType } = req.query;
  const user = await findUser({ userName });
  if (!user) {
    return res.status(404).json({ message: "user Not Found" });
  }
  if (!roomType) {
    return res.status(400).json({ message: "Please Specify the room type" });
  }
  const rooms = await getUserRoomsWithType(roomType, user);
  res.status(200).json({ rooms });
});

router.get("/getSpeakers", async (req, res) => {
  const { userName } = req.query;
  const user = await findUser({ userName });
  if (!user) {
    return res.status(404).json({ message: "user Not Found" });
  }
  const rooms = await getSpeakerRooms(user);
  res.status(200).json({ rooms });
});

router.put("/requestToJoin", async (req, res) => {
  const { roomId, userId } = req.body;
  if (!roomId || !userId) {
    return res.status(400).json({ message: "Please provide roomId & userId" });
  }
  const user = await findUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const room = await addUserinWaitingList(roomId, userId);
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }
  res.status(200).json({ message: "User added in waiting List" });
});

router.put("/addMemberToRoom", async (req, res) => {
  const { roomId, userId } = req.body;
  if (!roomId || !userId) {
    return res.status(400).json({ message: "Please provide roomId & userId" });
  }
  const user = await findUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const room = await addUserinMemberList(roomId, userId);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }
  res.status(200).json({ message: "User added in Member List" });
});

router.put("/removeMemberFromRoom", async (req, res) => {
  const { roomId, userId } = req.body;
  if (!roomId || !userId) {
    return res.status(400).json({ message: "Please provide roomId & userId" });
  }
  const user = await findUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const room = await removeUserFromRoom(roomId, userId);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }
  res.status(200).json({ message: "User Removed from Waiting List" });
});
export default router;
