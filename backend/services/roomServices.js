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
