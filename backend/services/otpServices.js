import crypto from "crypto";
import twilio from "twilio";

export const generateOtp = async () => {
  return crypto.randomInt(1000, 9999);
};

export const hashOtp = async (data) => {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET)
    .update(data)
    .digest("hex");
};

export const sendSms = async (phone, otp) => {
  const smsSid = process.env.SMS_SID;
  const smsAuthToken = process.env.SMS_AUTH_TOKEN;

  const twilioConfig = twilio(smsSid, smsAuthToken);
  return await twilioConfig.messages.create({
    to: phone,
    from: process.env.SMS_FROM_NUMBER,
    body: `Your Voicehub Signup OTP is ${otp}`,
  });
};

// export const sentMail = ()
