import crypto from "crypto";

export const generateOtp = async () => {
  return crypto.randomInt(1000, 9999);
};

export const hashOtp = async (data) => {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET)
    .update(data)
    .digest("hex");
};
