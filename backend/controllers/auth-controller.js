import { generateOtp, hashOtp } from '../services/otpServices.js';
import {
  creatUser,
  findUser,
  userDto,
  findUserById,
} from '../services/userService.js';
import {
  generateTokens,
  removeRefreshToken,
  storeRefereshToken,
} from '../services/tokenService.js';
import Refresh from '../models/refreshModel.js';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import { verifyCreds } from '../utils/googleConfig.js';

export const authenticateOtpEmail = async (req, res) => {
  const { emailId } = req.body;
  const gmail = process.env.GMAIL_ADDRESS;
  const gmailpass = process.env.GMAIL_APP_PASSWORD;
  if (!emailId) {
    return res.status(400).json({ message: 'Email Id  is required' });
  }
  const isExistingEmailId = await findUser({ emailId });

  if (isExistingEmailId) {
    return res
      .status(409)
      .json({ message: 'EmailId already in use try another one' });
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
      service: 'Gmail',
      auth: {
        user: gmail,
        // This is app password for my account
        pass: gmailpass,
      },
    });
    let mailOptions = {
      from: `"MeetCast" ${process.env.GMAIL_ADDRESS}`,
      to: emailId,
      subject: 'MeetCast Signup OTP',
      html: `
      <h4>Hello User,</h4>
      <p>This is your OTP: <strong>${otp}</strong> to sign up your account on <b>MeetCast</b>.</p>
      <br>
      <p><b>This OTP is valid for 10 minutes only.</b></p>
      <h5>Please do not share this OTP with anyone.<br>
      If this was not generated by you, kindly ignore this mail.</h5>
    `,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        if (error.code === 'EENVELOPE' && error.responseCode === 553) {
          return res.status(400).json({ message: 'Wrong Email Address' });
        } else {
          return res
            .status(500)
            .json({ message: "There's some error in sending mail" });
        }
      } else {
        return res.status(200).json({ hash: `${hash}.${expires}`, emailId });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Some error occured' });
  }
};

export const verifyOtpEmail = async (req, res) => {
  const { otp, hash, emailId, password } = req.body;
  if (!otp || !hash || !emailId)
    return res.status(400).json({ message: 'All fields are required' });

  const [hashedOtp, expires] = hash.split('.'); // Destructuring the hashedOtp & expired time

  if (Date.now() > expires)
    return res.status(200).json({ message: 'Otp is expired' });

  const data = `${emailId}.${otp}.${expires}`;

  const computedHash = await hashOtp(data); //Whether Hashed otp is correct or not

  if (computedHash !== hashedOtp)
    return res.status(400).json({ message: 'Invalid Otp' });

  let user;

  try {
    user = await findUser({ emailId }); //Finding user
    if (!user) {
      user = await creatUser({ emailId, password, signedUpwithGoogle: false }); //If not then create
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }

  //Token Generation

  const { accessToken, refereshToken } = generateTokens({
    id: user?._id,
    email: emailId,
  });

  //Stroing refresh Token
  await storeRefereshToken(refereshToken, user?._id);

  //Sending refreshtoken in cookie & accessotken in JSON
  res.cookie('refreshtoken', refereshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cookie will be in browser
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  const userData = await userDto(user);
  res.json({ userData, accessToken });
};

export const activateUser = async (req, res) => {
  const { userId, userName, fullName, avatar } = req.body;
  const user = await findUserById(userId);
  try {
    if (user && user.activated) {
      res.status(200).json({ message: 'User is already activate' });
    } else if (user) {
      if (user?.signedUpwithGoogle) {
        user.userName = userName;
        user.activated = true;
        user.avatar = avatar;
      } else {
        user.userName = userName;
        user.fullName = fullName;
        user.activated = true;
        user.avatar = avatar;
      }
      await user.save();
      const userData = await userDto(user);
      res.status(200).json({ userData });
    } else {
      res.status(200).json({ message: 'No user found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some internal Server Error' });
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
        return res.status(404).json({ message: 'No user Found' });
      }
      const userData = await userDto(user);
      res.status(200).json({ userData });
    } else {
      res
        .status(200)
        .json({ message: 'Your Session has expired. Please Login again' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const refreshTokenVerification = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    const userToken = await Refresh.findOne({ token: refreshtoken });
    const user = await findUserById(userToken?.userId);
    if (!user) {
      return res.status(404).json({ message: 'No user Found' });
    }
    const { accessToken, refereshToken: newRefreshToken } = generateTokens({
      id: user?.id,
      email: user?.emailId,
    });

    //Storing refresh Token
    await storeRefereshToken(newRefreshToken, user?._id);
    const userDtos = await userDto(user);

    if (newRefreshToken) {
      res.cookie('refreshtoken', newRefreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days this cookie will be in the browser
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
    }
    res.status(200).json({ userDtos, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await findUser({ emailId });
    if (!user) {
      return res.status(401).json({ message: 'No user found' });
    }
    if (user.signedUpwithGoogle) {
      return res.status(401).json({ message: 'Please Login with Google' });
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Password is not correct' });
    }

    const userDtos = await userDto(user);
    const { accessToken, refereshToken } = generateTokens({
      id: user?.id,
      email: user?.emailId,
    });
    //Storing refresh Token
    await storeRefereshToken(refereshToken, user?._id);

    if (refereshToken) {
      res.cookie('refreshtoken', refereshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days this cookie will be in the browser
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
    }
    res.status(200).json({ userDtos, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error });
  }
};

export const logoutFunctionality = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (!refreshtoken) {
      return res.status(400).json({ message: 'No Cookies found' });
    }
    const isRefreshTokenRemove = await removeRefreshToken(refreshtoken);
    if (isRefreshTokenRemove) {
      res.cookie('refreshtoken', '', {
        expires: new Date(0),
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'None',
      });
      res.status(200).json({ message: 'User Logged out' });
    } else {
      res.status(500).json({ message: 'Some error occured while logging out' });
    }
  } catch (error) {
    console.log('Error occured', error);
    res.status(500).json({ message: 'Some internal server occured' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { cred, mode } = req.body;

    const { email, name, picture } = await verifyCreds(cred);
    if (mode === 'login') {
      const user = await findUser({ emailId: email });

      if (!user) {
        return res.status(401).json({ message: 'No user found' });
      }
      const { accessToken, refereshToken } = generateTokens({
        id: user?.id,
        email: user?.emailId,
      });

      //Storing refresh Token
      await storeRefereshToken(refereshToken, user?._id);
      if (refereshToken) {
        res.cookie('refreshtoken', refereshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        });
      }
      res.status(200).json({ accessToken });
    }
    if (mode === 'register') {
      let user;

      user = await findUser({ emailId: email });
      if (user) {
        return res.status(409).json({ message: 'EmailId is already in use' });
      }
      const modifiedAvatar = picture?.split('=')[0];
      user = await creatUser({
        emailId: email,
        fullName: name,
        avatar: modifiedAvatar,
        signedUpwithGoogle: true,
      });

      //Token Generation

      const { accessToken, refereshToken } = generateTokens({
        id: user?._id,
        email: email,
      });

      //Storing refresh Token
      await storeRefereshToken(refereshToken, user?._id);
      //Sending refreshtoken in cookie & accessotken in JSON
      res.cookie('refreshtoken', refereshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // Store for 7 days
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.status(201).json({ accessToken });
    }
  } catch (error) {
    console.log('Error occured', error);
    res.status(500).json({ error });
  }
};
