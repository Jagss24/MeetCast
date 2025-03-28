import mongoose from 'mongoose';
import Rooms from '../models/roomModel.js';

export const createRoom = async ({
  topic,
  ownerId,
  accessibility,
  speakers,
  description,
  aboutWhat,
  allCanSpeak = false,
}) => {
  let speakersId = speakers?.map((eachSpeaker) => eachSpeaker.id);
  const room = await Rooms.create({
    ownerId,
    topic,
    accessibility,
    allCanSpeak,
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
    speakers,
    description,
    aboutWhat,
    memberList,
    removedList,
    waitingList,
    accessibility,
    allCanSpeak,
  } = fields;
  return {
    id: _id,
    ownerId,
    topic,
    speakers,
    description,
    aboutWhat,
    memberList,
    removedList,
    waitingList,
    accessibility,
    allCanSpeak,
  };
};

export const getRooms = async () => {
  const rooms = await Rooms.find({})
    .populate({
      path: 'speakers',
      select: 'fullName avatar _id',
    })
    .populate({
      path: 'ownerId',
      select: 'fullName avatar _id',
    })
    .exec();
  return rooms;
};

export const getRoomsByTopic = async (topicName) => {
  const rooms = await Rooms.find({
    aboutWhat: topicName,
    accessibility: 'public',
  })
    .populate({
      path: 'speakers',
      select: 'fullName avatar _id',
    })
    .populate({
      path: 'ownerId',
      select: 'fullName avatar _id',
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
      path: 'speakers',
      select: 'fullName userName avatar _id',
    })
    .populate({
      path: 'ownerId',
      select: 'fullName avatar _id',
    })
    .populate({
      path: 'waitingList',
      select: 'fullName avatar _id',
    })
    .populate({
      path: 'memberList',
      select: ' _id',
    })
    .populate({
      path: 'removedList',
      select: ' _id',
    })
    .exec();
  return rooms;
};

export const getUserRooms = async (user) => {
  const rooms = await Rooms.find({ ownerId: user?._id })
    .populate({
      path: 'speakers',
      select: 'fullName avatar _id',
    })
    .populate({
      path: 'ownerId',
      select: 'fullName avatar _id',
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
      path: 'speakers',
      select: 'fullName avatar _id',
    })
    .populate({
      path: 'ownerId',
      select: 'fullName avatar _id',
    })
    .exec();
  return rooms;
};

//this function is used to add the user in the waiting list of room
export const addUserinWaitingList = async (roomId, userId) => {
  const room = await getSingleRoom(roomId);
  if (!room) {
    return { code: 'ROOM_NOT_FOUND' };
  }

  const userExistsInWaitingList = room.waitingList.find(
    (eachUser) => eachUser?.id === userId
  );

  if (userExistsInWaitingList) {
    return { code: 'ALREADY_IN_WAITING_LIST' };
  }

  const useExistsInRemovedList = room?.removedList.find(
    (eachUser) => eachUser?.id === userId
  );

  if (useExistsInRemovedList) {
    return { code: 'REMOVED_FROM_WAITING' };
  }

  const userExistsinMemberList = room.memberList.find(
    (eachUser) => eachUser?.id === userId
  );

  if (userExistsinMemberList) {
    return { code: 'USER_IS_MEMBER' };
  }

  const userInRemovedList = room.removedList.find(
    (eachUser) => eachUser?.id === userId
  );

  // Add user to waiting list
  room.waitingList.push(userId);

  // Remove from removed list if present
  if (userInRemovedList) {
    room.removedList = room.removedList.filter(
      (eachUser) => !eachUser?._id.equals(new mongoose.Types.ObjectId(userId))
    );
  }

  // Save the updated room
  await room.save();
  return { code: 'ADDED_TO_WAITING_LIST' };
};

//this function is used to add the user from waiting list to member list
export const addUserinMemberList = async (roomId, userId) => {
  const room = await getSingleRoom(roomId);
  if (!room) {
    return { code: 'ROOM_NOT_FOUND' };
  }

  const userExistsinMemberList = room.memberList.find(
    (eachUser) => eachUser?.id === userId
  );

  if (userExistsinMemberList) {
    return { code: 'USER_IS_MEMBER' };
  }

  const userExistsinWaitingList = room.waitingList.find(
    (eachUser) => eachUser?.id === userId
  );
  // Check if the user is in the waiting list & is not in member List
  if (userExistsinWaitingList) {
    // if not then push the userId into the memberList array
    room.memberList.push(userId);
    room.waitingList = room.waitingList.filter(
      (eachUser) => !eachUser?._id.equals(new mongoose.Types.ObjectId(userId))
    );
    // Save the updated room
    await room.save();

    return { code: 'ADDED_IN_MEMBER' };
  } else {
    return { code: 'USER_IS_NOT_IN_WAITING' };
  }
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
