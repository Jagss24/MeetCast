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

export const userDto = (fields) => {
  const { _id, activated, number, createdAt, name } = fields;
  return { id: _id, name, activated, number, createdAt };
};
