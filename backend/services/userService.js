import User from "../models/user-model.js";

export const findUser = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

export const creatUser = async (data) => {
  const user = await User.create(data);
  return user;
};

export const findUserById = async (data) => {
  const user = await User.findById(data);
  return user;
};

export const userDto = async (fields) => {
  const {
    _id,
    activated,
    emailId,
    userName,
    fullName,
    avatar,
    signedUpwithGoogle,
    coverPhoto,
  } = fields;
  return {
    id: _id,
    userName,
    fullName,
    activated,
    emailId,
    avatar,
    signedUpwithGoogle,
    coverPhoto,
  };
};
export const searchUser = async (searchText) => {
  const users = User.find({
    $or: [
      { userName: { $regex: searchText } },
      { fullName: { $regex: searchText } },
    ],
  });
  return users;
};

export const photoUpdation = async (req, res) => {
  const { userId, photo, type } = req.body;
  const user = await User.findById(userId);
  try {
    if (user) {
      if (type === "Cover Photo") {
        user.coverPhoto = photo;
        await user.save();
      } else if (type === "Profile Photo") {
        user.avatar = photo;
        await user.save();
      } else {
        res.status(422).json({ message: "Unknown Type" });
        return;
      }
      res.status(200).json({ message: `${type} has been Updated` });
    } else {
      res.status(404).json({ message: "User Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log({ error });
  }
};
