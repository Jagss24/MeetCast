import { generateOtp, hashOtp, sendSms } from "../services/otpServices.js";
import {
  creatUser,
  findUser,
  userDto,
  findUserById,
} from "../services/userService.js";
import {
  generateTokens,
  storeRefereshToken,
} from "../services/tokenService.js";
import Refresh from "../models/refreshModel.js";

export const authentiCateOtpMobile = async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ message: "Phne field is required" });
  }

  //Generate the Otp
  const otp = await generateOtp();

  // Hash the Otp
  const ttl = 1000 * 60 * 5; //2min
  const expires = Date.now() + ttl;
  const data = `${number}.${otp}.${expires}`; // hashing the data more securely
  const hash = await hashOtp(data);

  // Send the OTP on mobile
  try {
    // await sendSms(number, otp);
    return res.status(200).json({ hash: `${hash}.${expires}`, otp, number });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occured" });
  }
};

export const verifyOtpMobile = async (req, res) => {
  const { otp, hash, number } = req.body;
  if (!otp || !hash || !number)
    return res.status(400).json({ message: "All fields are required" });

  const [hashedOtp, expires] = hash.split("."); // Destructuring the hashedOtp & expired time

  if (Date.now() > expires)
    return res.status(200).json({ message: "Otp is expired" });

  const data = `${number}.${otp}.${expires}`;

  const computedHash = await hashOtp(data); //Whether Hashed otp is correct or not

  if (computedHash !== hashedOtp)
    return res.status(400).json({ message: "Invalid Otp" });

  let user;

  try {
    user = await findUser({ number }); //Finding user
    if (!user) {
      user = await creatUser({ number }); //If not then create
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }

  //Token Generation

  const { accessToken, refereshToken } = generateTokens({
    id: user?._id,
    activated: false,
  });

  //Stroing refresh Token
  await storeRefereshToken(refereshToken, user?._id);

  //Sending refreshtoken in cookie & accessotken in JSON
  res.cookie("refreshtoken", refereshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });
  res.cookie("accesstoken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });
  const userData = await userDto(user);
  res.json({ userData, auth: true });
};

export const getUser = async (req, res) => {
  const { userId } = req.query;
  const user = await findUserById(userId);
  if (user) {
    const userData = await userDto(user);
    res.status(200).json({ userData });
  } else {
    res.status(200).json({ message: "Not Found" });
  }
};

export const activateUser = async (req, res) => {
  const { userId, name, avatar } = req.body;
  const user = await findUserById(userId);
  if (user) {
    user.name = name;
    user.avatar = avatar;
    user.activated = true;
    await user.save();
    const userData = await userDto(user);
    res.status(200).json({ userData });
  } else {
    res.status(404).json({ message: "No user found" });
  }
};

export const autoReLoginFunctionality = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (refreshtoken) {
      const userToken = await Refresh.findOne({ token: refreshtoken });
      const user = await findUserById(userToken?.userId);
      if (!user) {
        return res.status(404).json({ message: "No user Found" });
      }
      const userData = await userDto(user);
      res.status(200).json({ userData });
    } else {
      res.status(400).json({ messgae: "Refresh Token is required" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authentiCateOtpEmail = async (req, res) => {};
