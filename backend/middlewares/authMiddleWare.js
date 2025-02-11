import { verifyAccessToken } from "../services/tokenService.js";

export const authMiddleWarefunc = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Access Denied" });
    const accessToken = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!accessToken) {
      throw new Error();
    }
    const userData = await verifyAccessToken(accessToken);

    if (userData?.error === "TokenExpired") {
      return res
        .status(401)
        .json({ message: "Token expired. Please refresh your token." });
    }

    if (userData?.error === "InvalidToken") {
      return res
        .status(401)
        .json({ message: "Invalid token. Please login again." });
    }

    if (userData?.error) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Try again." });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
