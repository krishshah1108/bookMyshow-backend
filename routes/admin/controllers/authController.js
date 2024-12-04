import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";
import { encrypt, decrypt } from "../../../utils/encryptor_util.js";

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminFound = await models.Admin.findOne({ email });
    if (adminFound) {
      return response.badRequest("Admin already registered", res);
    }

    const hashedPassword = encrypt(password);
    const newAdmin = new models.Admin({
      name,
      email,
      password: hashedPassword,
    });
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

const updateAdmin = async (req, res) => {
  try {
    const adminFound = await models.Admin.findById(req.body.id);
    if (!adminFound) {
      return response.notFound("Admin not found", res);
    }

    let updateDetails = {};

    if (req.body.name) {
      updateDetails.name = req.body.name;
    }
    const adminUpdated = await models.Admin.findByIdAndUpdate(
      req.body.id,
      updateDetails,
      { new: true }
    );

    return response.success("Admin updated successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const changeAdminPassword = async (req, res) => {
  try {
    const adminFound = await models.Admin.findById(req.body.id);
    if (!adminFound) {
      return response.notFound("Admin not found", res);
    }
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const decryptOldPassword = decrypt(adminFound.password);
    const isOldPwdMatch = decryptOldPassword === oldPassword;
    if (!isOldPwdMatch) {
      return response.badRequest("Invalid Credentials", res);
    }

    if (newPassword !== confirmPassword) {
      return response.badRequest("Passwords do not match", res);
    }

    const hashedPassword = encrypt(newPassword);
    const adminUpdated = await models.Admin.findByIdAndUpdate(
      req.body.id,
      { password: hashedPassword },
      { new: true }
    );

    return response.success("Admin password changed successfully", 1, res);
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};
const authController = {
  registerAdmin,
  loginAdmin,
  updateAdmin,
  changeAdminPassword
};

export default authController;
