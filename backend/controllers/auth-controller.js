import { generateOtp, hashOtp } from "../services/otpServices.js";
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
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

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
  console.log(gmail, gmailpass);
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
      from: `"VoiceHub" ${process.env.GMAIL_ADDRESS}`,
      to: emailId,
      subject: "VoiceHub Signup OTP",
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
        console.log("Email sent: " + info.response);
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
      user = await creatUser({ emailId }); //If not then create
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
  const { userId, userName, fullName, password } = req.body;
  const user = await findUserById(userId);
  if (user && user.activated) {
    res.status(200).json({ message: "User is already activate" });
  } else if (user) {
    const hashPassword = bcryptjs.hashSync(password);
    user.userName = userName;
    user.fullName = fullName;
    user.password = hashPassword;
    user.activated = true;
    await user.save();
    const userData = await userDto(user);
    res.cookie("accesstoken", "", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    });
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
    const { emailId, password } = req.body;
    const user = await findUser({ emailId });
    if (!user) {
      return res.status(200).json({ message: "No user found" });
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Password is not correct" });
    }
    const userDtos = userDto(user);
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
