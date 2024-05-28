import { RequestHandler } from "express";
import TokenModel from "src/model/authToken";
import userModel from "src/model/carOwner";
import mechanicModel from "src/model/mechanic";
import { generateToken, sendErrorRes } from "src/utils/helper";
import {
  sendForgetPasswordToken,
  sendResetPasswordMail,
  sendVerification,
} from "src/utils/mail";
import jwt from "jsonwebtoken";
import ForgetPasswordTokenModel from "src/model/passwordResetToken";


export const create: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  if (!role) {
    return sendErrorRes(res, "Role is required", 400);
  }

  const token = generateToken();

  let user;
  if (role === "carOwner") {
    const emailExist = await userModel.findOne({ email });
    if (emailExist) return sendErrorRes(res, "Email already exist", 400);
    user = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    });
    await TokenModel.create({ owner: user._id, token });
  } else if (role === "mechanic") {
    const emailExist = await mechanicModel.findOne({ email });
    if (emailExist) return sendErrorRes(res, "Email already exist", 400);
    user = await mechanicModel.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    });
    await TokenModel.create({ owner: user._id, token });
  } else {
    return sendErrorRes(res, "Role is required", 400);
  }

  res.status(201).json({ user });
  sendVerification(user.email, token);
};

export const verifyAuthToken: RequestHandler = async (req, res) => {
  const { token, owner } = req.body;

  // Find the token document
  const tokenDoc = await TokenModel.findOne({ owner });
  if (!tokenDoc) return sendErrorRes(res, "Invalid token", 422);

  // Attempt to find the user by the owner ID stored in the token document
  let user = await userModel.findById(owner);

  // If not found in UserModel, check in MechanicModel
  if (!user) {
    user = await mechanicModel.findById(owner);
  }

  // If still not found, return an error
  if (!user) return sendErrorRes(res, "Invalid token", 400);

  // Compare the provided token with the stored token
  const matchToken = await tokenDoc.compareToken(token);
  if (!matchToken) return sendErrorRes(res, "Token does not match", 400);
  user.verified = true;
  await user.save();
  await TokenModel.findOneAndDelete({ owner: user._id });

  // If everything is fine, return success response
  res.status(200).json({ message: "Token verified" });
};

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    user = await mechanicModel.findOne({ email });
  }
  if (!user) return sendErrorRes(res, "Email/Password mismatch!", 403);
  const matchPassword = await user.comparePassword(password);
  if (!matchPassword) return sendErrorRes(res, "Email/Password mismatch", 403);
  // const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET as string, {expiresIn: "1h"})
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string
  );
  if (!user.tokens) user.tokens = [refreshToken];
  else user.tokens.push(refreshToken);
  await user.save();
  res.json({
    profile: {
      id: user._id,
      email: user.email,
      role: user.role,
      verified: user.verified,
    },
    tokens: { refresh: refreshToken, access: accessToken },
  });
  // const refreshToken = jwt.sign(payload, JWT_SECRET);
};


export const generateForgetPasswordToken: RequestHandler = async (req, res) => {
  const { email } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    user = await mechanicModel.findOne({ email });
  }
  if (!user) return sendErrorRes(res, "User record not found!", 404);
  const token = generateToken();
  await ForgetPasswordTokenModel.create({ owner: user._id, token });
  sendForgetPasswordToken(user.email, token);
  res.json({ message: "Token sent to email!" });
};

export const verifyForgetPasswordToken: RequestHandler = async (req, res) => {
  const { owner, token } = req.body;
  const tokenDoc = await ForgetPasswordTokenModel.findOne({ owner });
  if (!tokenDoc) sendErrorRes(res, "Unauthorized, Invalid Token!", 401);
  let user = await userModel.findById(owner);
  if (!user) {
    user = await mechanicModel.findById(owner);
  }
  if (!user) sendErrorRes(res, "Invalid User!", 422);
  const matchToken = await tokenDoc?.compareToken(token);
  if (!matchToken)
    sendErrorRes(res, "Unauthorized, Token does not match!", 401);
  res.json({ message: "Token verified!" });
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { id, password } = req.body;

  let user = await userModel.findById(id);
  if (!user) {
    user = await mechanicModel.findById(id);
  }

  // If user is still not found, return an error
  if (!user) {
    return sendErrorRes(res, "Invalid User!", 422);
  }

  // Check if the new password is the same as the old password
  const passwordMatched = await user.comparePassword(password);
  if (passwordMatched) {
    return sendErrorRes(
      res,
      "New password cannot be the same as the old password!",
      422
    );
  }

  // Update the user's password and save the user
  user.password = password;
  await user.save();

  // Send a password reset confirmation email
  await sendResetPasswordMail(user.email, user.firstName);

  // Send a success response
  res.json({ message: "Password reset successfully!" });
};


export const updateUserProfile: RequestHandler = async (req, res) => {
  const {
    businessAddress,
    businessName,
    bussinessPermit,
    associationIdNumber,
    nationality,
    associationIdCard,
    companyImage,
    state,
    homeAddress,
    workshopAddress,
    address,
    firstName,
    lastName
  } = req.body;

  // First, try to update the user
  let user = await userModel.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName },
    { new: true } // This option returns the updated document
  );

  // If user is not found, try updating the mechanic
  if (!user) {
    user = await mechanicModel.findByIdAndUpdate(
      req.user.id,
      {
        businessAddress,
        businessName,
        bussinessPermit,
        associationIdNumber,
        nationality,
        associationIdCard,
        companyImage,
        state,
        homeAddress,
        workshopAddress,
        address,
      },
      { new: true } // This option returns the updated document
    );
  }
  // If neither user nor mechanic is found, return an error response
  if (!user) return sendErrorRes(res, "User record not found!", 404);

  // Return a success response with the updated user profile
  res.json({ message: "Profile updated successfully!" });
}

export const sendProfile: RequestHandler = async (req, res) => {
  res.json({
    profile: req.user,
  });
}
