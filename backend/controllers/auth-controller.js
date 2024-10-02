import { generateOtp, hashOtp } from "../services/otpServices.js";
import {
  creatUser,
  findUser,
  userDto,
  findUserById,
  searchUser,
} from "../services/userService.js";
import {
  generateTokens,
  getUserToken,
  storeRefereshToken,
} from "../services/tokenService.js";
import Refresh from "../models/refreshModel.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { verifyCreds } from "../utils/googleConfig.js";

export const authenticateOtpEmail = async (req, res) => {
  const { emailId } = req.body;
  const gmail = process.env.GMAIL_ADDRESS;
  const gmailpass = process.env.GMAIL_APP_PASSWORD;
  if (!emailId) {
    return res.status(400).json({ message: "Email Id  is required" });
  }
  const isExistingEmailId = await findUser({ emailId });

  if (isExistingEmailId) {
    return res
      .status(200)
      .json({ message: "EmailId already in use try another one" });
  }
  //Generate the Otp
  const otp = await generateOtp();

  // Hash the Otp
  const ttl = 1000 * 60 * 5; //2min
  const expires = Date.now() + ttl;
  const data = `${emailId}.${otp}.${expires}`; // hashing the data more securely
  const hash = await hashOtp(data);

  // Send the OTP on email
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: gmail,
        // This is app password for my account
        pass: gmailpass,
      },
    });
    let mailOptions = {
      from: `"MeetCast" ${process.env.GMAIL_ADDRESS}`,
      to: emailId,
      subject: "MeetCast Signup OTP",
      text: `
      Hello User,
      This is your OTP ${otp} to signup your account on WATCHME.
      Please do not share with anyone
      If this is not you then just ignore this mail
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        if (error.code === "EENVELOPE" && error.responseCode === 553) {
          return res.status(200).json({ message: "Wrong Email Address" });
        } else {
          return res
            .status(200)
            .json({ message: "There's some error in sending mail" });
        }
      } else {
        return res
          .status(200)
          .json({ hash: `${hash}.${expires}`, otp, emailId });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occured" });
  }
};

export const verifyOtpEmail = async (req, res) => {
  const { otp, hash, emailId } = req.body;
  if (!otp || !hash || !emailId)
    return res.status(400).json({ message: "All fields are required" });

  const [hashedOtp, expires] = hash.split("."); // Destructuring the hashedOtp & expired time

  if (Date.now() > expires)
    return res.status(200).json({ message: "Otp is expired" });

  const data = `${emailId}.${otp}.${expires}`;

  const computedHash = await hashOtp(data); //Whether Hashed otp is correct or not

  if (computedHash !== hashedOtp)
    return res.status(400).json({ message: "Invalid Otp" });

  let user;

  try {
    user = await findUser({ emailId }); //Finding user
    if (!user) {
      user = await creatUser({ emailId, signedUpwithGoogle: false }); //If not then create
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
export const getUserbyUserName = async (req, res) => {
  const { userName } = req.query;
  const user = await findUser({ userName });
  if (user) {
    const userData = await userDto(user);
    res.status(200).json({ userData });
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

export const activateUser = async (req, res) => {
  const { userId, userName, fullName, password, avatar } = req.body;
  const user = await findUserById(userId);
  try {
    if (user && user.activated) {
      res.status(200).json({ message: "User is already activate" });
    } else if (user) {
      if (user?.signedUpwithGoogle) {
        user.userName = userName;
        user.activated = true;
        user.avatar = avatar;
      } else {
        const hashPassword = bcryptjs.hashSync(password);
        user.userName = userName;
        user.fullName = fullName;
        user.password = hashPassword;
        user.activated = true;
        user.avatar = avatar;
      }
      await user.save();
      const userData = await userDto(user);
      res.cookie("accesstoken", "", {
        expires: new Date(0),
        httpOnly: true,
        path: "/",
      });
      res.status(200).json({ userData });
    } else {
      res.status(200).json({ message: "No user found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Some internal Server Error" });
    console.log({ error });
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
      res
        .status(200)
        .json({ message: "Your Session has expired. Please Login again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.query;
    const user = await findUser({ emailId });
    if (!user) {
      return res.status(200).json({ message: "No user found" });
    }
    if (user.signedUpwithGoogle) {
      return res.status(200).json({ message: "Please Login with Google" });
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Password is not correct" });
    }
    const refreshToken = await getUserToken(user?.id);
    const userDtos = await userDto(user);
    if (refreshToken) {
      res.cookie("refreshtoken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
    }
    res.status(200).json({ userDtos });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error });
  }
};

export const logoutFunctionality = async (req, res) => {
  const { refreshtoken } = req.cookies;
  if (!refreshtoken) {
    return res.status(400).json({ message: "No Cookies found" });
  }
  res.cookie("refreshtoken", "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });
  res.status(200).json({ message: "User Logged out" });
};
export const searchUserFunctionality = async (req, res) => {
  try {
    const { searchText } = req.query;

    // Ensure searchText is provided
    if (!searchText) {
      return res.status(400).json({ error: "searchText is required" });
    }

    // Create a regex for case-insensitive search
    const searchRegEx = new RegExp(searchText, "i");

    // Search in both userName and fullName fields
    const users = await searchUser(searchRegEx);

    res.status(200).json({ length: users.length, users });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for users" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { cred, mode } = req.query;

    const { email, name, picture } = await verifyCreds(cred);
    if (mode === "login") {
      const user = await findUser({ emailId: email });

      if (!user) {
        return res.status(200).json({ message: "No user found" });
      }
      const refreshToken = await getUserToken(user?.id);
      const userDtos = await userDto(user);
      if (refreshToken) {
        res.cookie("refreshtoken", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
        });
      }
      res.status(200).json({ userDtos });
    }
    if (mode === "register") {
      let user;

      user = await findUser({ emailId: email });
      if (user) {
        return res.status(200).json({ message: "EmailId is already in use" });
      }
      const modifiedAvatar = picture?.split("=")[0];
      user = await creatUser({
        emailId: email,
        fullName: name,
        avatar: modifiedAvatar,
        signedUpwithGoogle: true,
      });

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
      res.status(200).json({ userData, auth: true });
    }
  } catch (error) {
    console.log("Error occured", error);
    res.status(500).json({ error });
  }
};
