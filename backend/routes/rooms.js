import express from "express";
import Refresh from "../models/refreshModel.js";
import { findUser, findUserById } from "../services/userService.js";
import {
  addUserinMemberList,
  addUserinWaitingList,
  createRoom,
  getRooms,
  getRoomsByTopic,
  getSingleRoom,
  getSpeakerRooms,
  getUserRoomsWithType,
  removeUserFromRoom,
  roomDto,
} from "../services/roomServices.js";

const router = express.Router();

router.post("/createRoom", async (req, res) => {
  const { topic, description, roomType, accessibility, speakers, aboutWhat } =
    req.body;
  const { refreshtoken } = req.cookies;
  if (!topic || !roomType || !accessibility || !description) {
    return res.status(200).json({
      message: "Some info about room is missing",
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
      description,
      aboutWhat,
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
  const roomDtos = await Promise.all(
    rooms.map(async (eachRoom) => await roomDto(eachRoom))
  );
  res.status(200).json({ roomDtos });
});

router.get("/getSingleRoom", async (req, res) => {
  const { roomId } = req.query;
  const room = await getSingleRoom(roomId);
  const roomDtos = await roomDto(room);
  if (!room) {
    return res.status(404).json({ message: "Not a Valid Room Id " });
  }
  res.status(200).json({ roomDtos });
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
  const roomDtos = await Promise.all(
    rooms.map(async (eachRoom) => await roomDto(eachRoom))
  );
  res.status(200).json({ roomDtos });
});

router.get("/getSpeakers", async (req, res) => {
  const { userName } = req.query;
  const user = await findUser({ userName });
  if (!user) {
    return res.status(404).json({ message: "user Not Found" });
  }
  const rooms = await getSpeakerRooms(user);
  const roomDtos = await Promise.all(
    rooms.map(async (eachRoom) => await roomDto(eachRoom))
  );
  res.status(200).json({ roomDtos });
});

router.get("/roomsBytTopic", async (req, res) => {
  const { topic } = req.query;
  const { refreshtoken } = req.cookies;
  if (!topic) {
    return res.status(500).json({ message: "Send the topic name" });
  }
  if (refreshtoken) {
    const rooms = await getRoomsByTopic(topic);
    if (rooms.length) {
      const roomDtos = await Promise.all(
        rooms.map(async (eachRoom) => await roomDto(eachRoom))
      );
      res.status(200).json({ roomDtos });
    } else {
      res.status(200).json({ message: "No rooms found" });
    }
  } else {
    res.status(200).json({ message: "Your Session has expired" });
  }
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
