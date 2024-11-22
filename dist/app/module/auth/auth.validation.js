"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.resetPasswordValidationSchema = exports.forgetPasswordValidationSchema = exports.loginUserSchemaValidation = void 0;
const zod_1 = require("zod");
exports.loginUserSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
// foget password validation
exports.forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z
            .string({
            required_error: "User ID is required",
        })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
    }),
});
// reset password validation
exports.resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z
            .string({
            required_error: "User ID is required",
        })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
        newPassword: zod_1.z.string({
            required_error: "user password is required",
        }),
    }),
});
exports.AuthValidation = {
    loginUserSchemaValidation: exports.loginUserSchemaValidation,
    resetPasswordValidationSchema: exports.resetPasswordValidationSchema,
    forgetPasswordValidationSchema: exports.forgetPasswordValidationSchema,
};
