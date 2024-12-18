import { z } from "zod";

export const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    technologies: z
      .array(z.string())
      .min(1, "At least one technology is required"),
    clientCode: z.string().url("Client code must be a valid URL"),
    serverCode: z.string().url("Server code must be a valid URL"),
    liveLink: z.string().url("Live link must be a valid URL"),
    date: z.string(),
    type: z.string(),
    challenges: z.string(),
    features: z.string(),
  }),
});

export const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    technologies: z
      .array(z.string())
      .min(1, "At least one technology is required")
      .optional(),
    clientCode: z.string().url("Client code must be a valid URL").optional(),
    serverCode: z.string().url("Server code must be a valid URL").optional(),
    liveLink: z.string().url("Live link must be a valid URL").optional(),
    date: z.string().optional(),
    type: z.string().optional(),
    challenges: z.string().optional(),
    features: z.string().optional(),
  }),
});

export const projectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
