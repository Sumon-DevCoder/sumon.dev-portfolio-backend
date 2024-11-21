import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { userSchemaValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const router = Router();

// register
router.post(
  "/signup",
  validateRequest(userSchemaValidation.createUserValidationSchema),
  AuthControllers.registerUser
);

// login
router.post(
  "/login",
  validateRequest(AuthValidation.loginUserSchemaValidation),
  AuthControllers.loginUser
);

// forget password
router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);

// reset password
router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword
);

export const AuthRoutes = router;
