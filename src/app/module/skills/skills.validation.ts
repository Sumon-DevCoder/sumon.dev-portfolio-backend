import { z } from "zod";

export const createSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    level: z
      .number()
      .min(1, "Level must be at least 1")
      .max(100, "Level must be at most 100"),
    img: z.string().url("Image URL must be valid"),
  }),
});

export const updateSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    level: z
      .number()
      .min(1, "Level must be at least 1")
      .max(5, "Level must be at most 5")
      .optional(),
    img: z.string().url("Image URL must be valid").optional(),
  }),
});

export const skillsValidation = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
};
