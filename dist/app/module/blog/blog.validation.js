"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required."),
        description: zod_1.z.string().min(1, "Description is required."),
        date: zod_1.z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), "Date must be a valid date string."),
        img: zod_1.z.string().url("Image must be a valid URL."),
    }),
});
exports.updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(1, "Title must be at least 1 character long.")
            .optional(),
        description: zod_1.z
            .string()
            .min(1, "Description must be at least 1 character long.")
            .optional(),
        date: zod_1.z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), "Date must be a valid date string.")
            .optional(),
        img: zod_1.z.string().url("Image must be a valid URL.").optional(),
    }),
});
exports.blogValidation = {
    createBlogSchema: exports.createBlogSchema,
    updateBlogSchema: exports.updateBlogSchema,
};
