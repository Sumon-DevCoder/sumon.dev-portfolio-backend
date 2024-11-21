import { z } from "zod";

export const loginUserSchemaValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

// foget password validation
export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    _id: z
      .string({
        required_error: "User ID is required",
      })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  }),
});

// reset password validation
export const resetPasswordValidationSchema = z.object({
  body: z.object({
    _id: z
      .string({
        required_error: "User ID is required",
      })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
    newPassword: z.string({
      required_error: "user password is required",
    }),
  }),
});

export const AuthValidation = {
  loginUserSchemaValidation,
  resetPasswordValidationSchema,
  forgetPasswordValidationSchema,
};
