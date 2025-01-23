import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from "../../../utils/encryptor_util.js";
import { generateToken } from "../../../utils/helper_util.js";
// const sendOtpAndLogin = async (req, res) => {
//   try {
//     const { name, phone } = req.body;
//     if (!name || !phone) {
//       return response.badRequest("Name and phone number are required", res);
//     }
//     const client = twilio(
//       process.env.TWILIO_ACCOUNT_SID,
//       process.env.TWILIO_AUTH_TOKEN
//     );
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     const otpHash = await bcrypt.hash(otp.toString(), 10);
//     const message = await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });
//     console.log(`OTP sent: ${message.sid}`);
//     let userFound = await models.User.findOne({ phone });
//     if (userFound) {
//       await models.User.findByIdAndUpdate(userFound._id, { name });
//     } else {
//       userFound = new models.User({
//         name,
//         phone,
//       });
//       await userFound.save();
//     }
//     const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
//       expiresIn: "24d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     return response.success(
//       "User logged in successfully",
//       { userFound, otpHash, token },
//       res
//     );
//   } catch (error) {
//     console.log(error);
//     return response.failure(error, res);
//   }
// };
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userFound = await models.User.findOne({ email });
    if (userFound) {
      return response.badRequest("User already registered", res);
    }
    const hashedPassword = encrypt(password);
    const newUser = new models.User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = generateToken({ id: newUser._id });
    const hashedToken = encrypt(token);
    res.cookie("token", hashedToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return response.success("User registered successfully", hashedToken, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await models.User.findOne({ email });
    if (!userFound) {
      return response.badRequest("Invalid email or password", res);
    } else {
      const isPwdMatch = decrypt(userFound.password) === password;
      if (!isPwdMatch) {
        return response.badRequest("Invalid email or password", res);
      } else {
        const token = generateToken({ id: userFound._id });
        const hashedToken = encrypt(token);
        res.cookie("token", hashedToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });
        return response.success(
          "User logged in successfully",
          hashedToken,
          res
        );
      }
    }
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};
const authController = {
  registerUser,
  loginUser,
};
export default authController;
