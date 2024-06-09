import { verifyAccessToken } from "../services/tokenService.js";

export const authMiddleWarefunc = async (req, res, next) => {
  try {
    const { accesstoken } = req.cookies;
    if (!accesstoken) {
      throw new Error();
    }
    const userData = await verifyAccessToken(accesstoken);
    if (!userData) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
