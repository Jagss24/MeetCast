import jwt from "jsonwebtoken";

export const generateTokens = (payload) => {
  const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
  const refereshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "1h",
  });

  const refereshToken = jwt.sign(payload, refereshTokenSecret, {
    expiresIn: "1y",
  });

  return { accessToken, refereshToken };
};
