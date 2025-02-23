import jwt from 'jsonwebtoken';
import Refresh from '../models/refreshModel.js';

export const generateTokens = (payload) => {
  const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
  const refereshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: '15m',
  });

  const refereshToken = jwt.sign(payload, refereshTokenSecret, {
    expiresIn: '7d',
  });

  return { accessToken, refereshToken };
};

export const storeRefereshToken = async (token, userId) => {
  try {
    const refreshTokenExist = await Refresh.findOne({ userId });
    if (refreshTokenExist) {
      refreshTokenExist.token = token;
      refreshTokenExist.save();
    } else {
      await Refresh.create({
        token,
        userId,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const verifyAccessToken = async (token) => {
  try {
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

    // Verify the token
    return jwt.verify(token, accessTokenSecret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'TokenExpired' }; // Token expired
    } else if (error.name === 'JsonWebTokenError') {
      return { error: 'InvalidToken' }; // Invalid token
    } else {
      return { error: 'UnknownError' }; // Other errors
    }
  }
};

export const getUserToken = async (userId) => {
  try {
    const refreshToken = await Refresh.findOne({ userId });
    if (!refreshToken) {
      return null;
    }
    return refreshToken.token;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const removeRefreshToken = async (userId) => {
  try {
    const tokenRecord = await Refresh.findOne({ userId });
    if (!tokenRecord) {
      return false;
    }
    tokenRecord.token = '';
    await tokenRecord.save();
    return true;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};
