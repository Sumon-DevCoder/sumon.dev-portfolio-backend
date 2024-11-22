"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_codes_1 = __importDefault(require("http-status-codes-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../utiils/sendEmail");
// register
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // user checking
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(http_status_codes_codes_1.default.CONFLICT, "Already registered");
    }
    // create user
    const newUser = yield user_model_1.User.create(payload);
    return newUser;
});
// login
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking user
    const user = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new Error("Email not registered!");
    }
    // checking user status
    if (user.status === "blocked") {
        throw new Error("User is Blocked");
    }
    // checking isMatchPassword
    const passwordMatch = yield (0, auth_utils_1.isPasswordMatched)(payload.password, user.password);
    if (!passwordMatch) {
        throw new Error("Password not matched!");
    }
    // return user information using jwt
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
    const _a = user.toObject(), { password, status } = _a, userInfo = __rest(_a, ["password", "status"]);
    return {
        accessToken,
        refreshToken,
        userInfo,
    };
});
// forget password
const forgetPassword = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // user checking
    const user = yield user_model_1.User.findById(_id);
    if (!user) {
        throw new AppError_1.default(http_status_codes_codes_1.default.NOT_FOUND, "User does not exists!");
    }
    // checking user status
    if (user.status === "blocked") {
        throw new Error("User is Blocked");
    }
    // return user information using jwt
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        email: user.email,
        role: user.role,
    };
    const resetToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "10m",
    });
    const resetUILink = `${config_1.default.reset_pass_ui_link}?_id=${user === null || user === void 0 ? void 0 : user._id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, resetUILink);
});
// reset password
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    // user checking
    const user = yield user_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload._id);
    if (!user) {
        throw new AppError_1.default(http_status_codes_codes_1.default.NOT_FOUND, "User does not exists!");
    }
    // checking user status
    if (user.status === "blocked") {
        throw new Error("User is Blocked");
    }
    // verify user token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    if ((payload === null || payload === void 0 ? void 0 : payload._id) !== (decoded === null || decoded === void 0 ? void 0 : decoded._id)) {
        throw new AppError_1.default(http_status_codes_codes_1.default.FORBIDDEN, "Your are forbidden");
    }
    // hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    // update password
    const result = yield user_model_1.User.findByIdAndUpdate({
        _id: decoded === null || decoded === void 0 ? void 0 : decoded._id,
        role: decoded === null || decoded === void 0 ? void 0 : decoded.role,
    }, {
        password: newHashedPassword,
    });
    console.log(result);
});
exports.AuthServices = {
    forgetPassword,
    resetPassword,
    register,
    login,
};
