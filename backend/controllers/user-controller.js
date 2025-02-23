import {
  findUser,
  findUserById,
  searchUser,
  userDto,
} from '../services/userService.js';

export const getUser = async (req, res) => {
  const { userId } = req.query;
  const user = await findUserById(userId);
  if (user) {
    const userData = await userDto(user);
    res.status(200).json({ userData });
  } else {
    res.status(200).json({ message: 'Not Found' });
  }
};

export const getUserbyUserName = async (req, res) => {
  const { userName } = req.query;
  const user = await findUser({ userName });
  if (user) {
    const userData = await userDto(user);
    res.status(200).json({ userData });
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
};

export const searchUserFunctionality = async (req, res) => {
  try {
    const { searchText } = req.query;

    // Ensure searchText is provided
    if (!searchText) {
      return res.status(400).json({ error: 'searchText is required' });
    }

    // Create a regex for case-insensitive search
    const searchRegEx = new RegExp(searchText, 'i');

    // Search in both userName and fullName fields
    const users = await searchUser(searchRegEx);

    res.status(200).json({ length: users.length, users });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while searching for users' });
  }
};
