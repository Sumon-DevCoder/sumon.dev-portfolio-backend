"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// register
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.userSchemaValidation.createUserValidationSchema), auth_controller_1.AuthControllers.registerUser);
// login
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginUserSchemaValidation), auth_controller_1.AuthControllers.loginUser);
// forget password
router.post("/forget-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controller_1.AuthControllers.forgetPassword);
// reset password
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.resetPasswordValidationSchema), auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
