import bcrypt from "bcrypt";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { sendEmail } from "../../utiils/sendEmail";

// register
const register = async (payload: TUser): Promise<any> => {
  // user checking
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "Already registered");
  }

  // create user
  const newUser = await User.create(payload);
  return newUser;
};

// login
const login = async (payload: TLoginUser) => {
  // checking user
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new Error("Email not registered!");
  }

  // checking user status
  if (user.status === "blocked") {
    throw new Error("User is Blocked");
  }

  // checking isMatchPassword
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched!");
  }

  // return user information using jwt
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  const { password, status, ...userInfo } = user.toObject();

  return {
    accessToken,
    refreshToken,
    userInfo,
  };
};

// forget password
const forgetPassword = async (_id: string) => {
  // user checking
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  // checking user status
  if (user.status === "blocked") {
    throw new Error("User is Blocked");
  }

  // return user information using jwt
  const jwtPayload = {
    _id: user?._id,
    email: user.email,
    role: user.role,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10m",
  });

  const resetUILink = `${config.reset_pass_ui_link}?_id=${user?._id}&token=${resetToken}`;
  sendEmail(user?.email, resetUILink);
};

// reset password
const resetPassword = async (
  payload: { _id: string; newPassword: string },
  token: string
) => {
  console.log(payload);

  // user checking
  const user = await User.findById(payload?._id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  // checking user status
  if (user.status === "blocked") {
    throw new Error("User is Blocked");
  }

  // verify user token
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (payload?._id !== decoded?._id) {
    throw new AppError(httpStatus.FORBIDDEN, "Your are forbidden");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  // update password
  const result = await User.findByIdAndUpdate(
    {
      _id: decoded?._id,
      role: decoded?.role,
    },
    {
      password: newHashedPassword,
    }
  );

  console.log(result);
};

export const AuthServices = {
  forgetPassword,
  resetPassword,
  register,
  login,
};
