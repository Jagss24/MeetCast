import User from "../models/user-model.js";

export const findUser = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

export const creatUser = async (data) => {
  const user = await User.create(data);
  return user;
};

export const userDto = (fields) => {
  const { _id, activated, number, createdAt } = fields;
  return { id: _id, activated, number, createdAt };
};
