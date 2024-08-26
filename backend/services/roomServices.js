import mongoose from "mongoose";
import Rooms from "../models/roomModel.js";

export const createRoom = async ({
  topic,
  roomType,
  ownerId,
  accessibility,
  speakers,
  description,
  aboutWhat,
}) => {
  let speakersId = speakers?.map((eachSpeaker) => eachSpeaker.value);
  const room = await Rooms.create({
    ownerId,
    topic,
    roomType,
    accessibility,
    speakers: speakersId ? [ownerId, ...speakersId] : [ownerId],
    description,
    aboutWhat,
  });
  return room;
};

export const roomDto = async (fields) => {
  const {
    _id,
    ownerId,
    topic,
    roomType,
    speakers,
    description,
    aboutWhat,
    memberList,
    removedList,
    waitingList,
    accessibility,
  } = fields;
  return {
    id: _id,
    ownerId,
    topic,
    roomType,
    speakers,
    description,
    aboutWhat,
    memberList,
    removedList,
    waitingList,
    accessibility,
  };
};

export const getRooms = async (type) => {
  const rooms = await Rooms.find({ roomType: type, accessibility: "public" })
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
export const getRoomsByTopic = async (topicName) => {
  const rooms = await Rooms.find({
    aboutWhat: topicName,
    accessibility: "public",
  })
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
export const getSingleRoom = async (roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return null;
  }
  const rooms = await Rooms.findById(roomId)
    .populate({
      path: "speakers",
      select: "fullName userName avatar _id",
    })
    .populate({
      path: "ownerId",
      select: "fullName avatar _id",
    })
    .populate({
      path: "waitingList",
      select: "fullName avatar _id",
    })
    .populate({
      path: "memberList",
      select: " _id",
    })
    .populate({
      path: "removedList",
      select: " _id",
    })
    .exec();
  return rooms;
};
export const getUserRoomsWithType = async (roomType, user) => {
  const rooms = await Rooms.find({ roomType, ownerId: user?._id })
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

//this function is used  to find the user is assigned as a speaker in which rooms
export const getSpeakerRooms = async (user) => {
  const rooms = await Rooms.find({
    ownerId: { $ne: user?.id }, // ownerId should not be equal to userId
    speakers: user?.id, // userId should be in the speakers array
  })
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

//this function is used to add the user in the waiting list of room
export const addUserinWaitingList = async (roomId, userId) => {
  const room = await getSingleRoom(roomId);
  if (!room) {
    return false;
  }
  const UserExist = room.waitingList.find(
    (eachUser) => eachUser?.id === userId
  );

  const UserinRemovedList = room.removedList.find(
    (eachUser) => eachUser?.id === userId
  );
  // Check if the user is already in the waiting list
  if (!UserExist) {
    // if not then push the userId into the waitingList array
    room.waitingList.push(userId);
    if (UserinRemovedList)
      room.removedList = room.removedList.filter(
        (eachUser) => !eachUser?._id.equals(new mongoose.Types.ObjectId(userId))
      );
    // Save the updated room
    await room.save();
    return true;
  }
  return false;
};

//this function is used to add the user from waiting list to member list
export const addUserinMemberList = async (roomId, userId) => {
  const room = await getSingleRoom(roomId);
  if (!room) {
    return false;
  }

  const userinMemberList = room.memberList.find(
    (eachUser) => eachUser?.id === userId
  );
  const userinWaitinList = room.waitingList.find(
    (eachUser) => eachUser?.id === userId
  );
  // Check if the user is in the waiting list & is not in member List
  if (userinWaitinList && !userinMemberList) {
    // if not then push the userId into the memberList array
    room.memberList.push(userId);
    room.waitingList = room.waitingList.filter(
      (eachUser) => !eachUser?._id.equals(new mongoose.Types.ObjectId(userId))
    );
    // Save the updated room
    await room.save();

    return true;
  }
  return false;
};

//this function is used to add the user from waiting list to member list
export const removeUserFromRoom = async (roomId, userId) => {
  const room = await getSingleRoom(roomId);
  if (!room) {
    return false;
  }

  const userinRemoveList = room.removedList.find(
    (eachUser) => eachUser?.id === userId
  );
  const userinWaitinList = room.waitingList.find(
    (eachUser) => eachUser?.id === userId
  );

  // Check if the user is in the waiting list & is not in removed List
  if (userinWaitinList && !userinRemoveList) {
    // if not then push the userId into the removed list array
    room.removedList.push(userId);
    room.waitingList = room.waitingList.filter(
      (eachUser) => !eachUser?._id.equals(new mongoose.Types.ObjectId(userId))
    );
    // Save the updated room
    await room.save();

    return true;
  }
  return false;
};
