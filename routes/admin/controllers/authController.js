import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";
import { encrypt, decrypt } from "../../../utils/encryptor_util.js";

const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminFound = await models.Admin.findOne({ email });
    if (adminFound) {
      return response.badRequest("Admin already registered", res);
    }

    const hashedPassword = encrypt(password);
    const newAdmin = new models.Admin({ email, password: hashedPassword });
    await newAdmin.save();
    return response.success("Admin registered successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminFound = await models.Admin.findOne({ email });
    if (!adminFound) {
      return response.badRequest("Invalid email or password", res);
    }
    const decryptedPassword = decrypt(adminFound.password);

    const isPwdMatch = decryptedPassword === password;
    if (!isPwdMatch) {
      return response.badRequest("Invalid email or password", res);
    }

    return response.success("Admin logged in successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const authController = {
  registerAdmin,
  loginAdmin,
};

export default authController;
