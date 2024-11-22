"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillsValidation = exports.updateSkillValidationSchema = exports.createSkillValidationSchema = void 0;
const zod_1 = require("zod");
exports.createSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        level: zod_1.z
            .number()
            .min(1, "Level must be at least 1")
            .max(100, "Level must be at most 100"),
        img: zod_1.z.string().url("Image URL must be valid"),
    }),
});
exports.updateSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        level: zod_1.z
            .number()
            .min(1, "Level must be at least 1")
            .max(100, "Level must be at most 5")
            .optional(),
        img: zod_1.z.string().url("Image URL must be valid").optional(),
    }),
});
exports.skillsValidation = {
    createSkillValidationSchema: exports.createSkillValidationSchema,
    updateSkillValidationSchema: exports.updateSkillValidationSchema,
};
