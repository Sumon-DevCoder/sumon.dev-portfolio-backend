"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidation = exports.updateProjectValidationSchema = exports.createProjectValidationSchema = void 0;
const zod_1 = require("zod");
exports.createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        technologies: zod_1.z
            .array(zod_1.z.string())
            .min(1, "At least one technology is required"),
        clientCode: zod_1.z.string().url("Client code must be a valid URL"),
        serverCode: zod_1.z.string().url("Server code must be a valid URL"),
        liveLink: zod_1.z.string().url("Live link must be a valid URL"),
        date: zod_1.z.string(),
        type: zod_1.z.string(),
        challenges: zod_1.z.string(),
        features: zod_1.z.string(),
    }),
});
exports.updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        technologies: zod_1.z
            .array(zod_1.z.string())
            .min(1, "At least one technology is required")
            .optional(),
        clientCode: zod_1.z.string().url("Client code must be a valid URL").optional(),
        serverCode: zod_1.z.string().url("Server code must be a valid URL").optional(),
        liveLink: zod_1.z.string().url("Live link must be a valid URL").optional(),
        date: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        challenges: zod_1.z.string().optional(),
        features: zod_1.z.string().optional(),
    }),
});
exports.projectValidation = {
    createProjectValidationSchema: exports.createProjectValidationSchema,
    updateProjectValidationSchema: exports.updateProjectValidationSchema,
};
