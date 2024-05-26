import { generateOtp, hashOtp, sendSms } from "../services/otpServices.js";

export const authentiCateOtpMobile = async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ message: "Phne field is required" });
  }

  //Genrate the Otp
  const otp = await generateOtp();

  //   Hash the Otp
  const ttl = 1000 * 60 * 2; //2min
  const expires = Date.now() + ttl;
  const data = `${number}.${otp}.${expires}`; // hashing the data more securely
  const hash = await hashOtp(data);

  try {
    await sendSms(number, otp);
    return res.status(200).json({ hash: `${hash}.${expires}`, otp, number });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occured" });
  }
};

export const authentiCateOtpEmail = async (req, res) => {};
