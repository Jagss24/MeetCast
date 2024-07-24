import mongoose from "mongoose";
import Rooms from "../models/roomModel.js";

export const createRoom = async ({ topic, roomType, ownerId }) => {
  const room = await Rooms.create({
    ownerId,
    topic,
    roomType,
    speakers: [ownerId],
  });
  return room;
};

export const roomDto = async (fields) => {
  const { _id, ownerId, topic, roomType, speakers } = fields;
  return { id: _id, ownerId, topic, roomType, speakers };
};

export const getRooms = async (type) => {
  const rooms = await Rooms.find({ roomType: type })
    .populate("speakers")
    .populate("ownerId")
    .exec();
  return rooms;
};

export const getSingleRoom = async (roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return null;
  }
  const rooms = await Rooms.findById(roomId)
    .populate({
      path: "speakers",
      select: "fullName avatar _id",
    })
    .populate({
      path: "ownerId",
      select: "fullName avatar _id",
    })
    .exec();
  return rooms;
};
