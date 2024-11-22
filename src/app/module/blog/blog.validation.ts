import { z } from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
    date: z
      .string()
      .refine(
        (val) => !isNaN(Date.parse(val)),
        "Date must be a valid date string."
      ),
    img: z.string().url("Image must be a valid URL."),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title must be at least 1 character long.")
      .optional(),
    description: z
      .string()
      .min(1, "Description must be at least 1 character long.")
      .optional(),
    date: z
      .string()
      .refine(
        (val) => !isNaN(Date.parse(val)),
        "Date must be a valid date string."
      )
      .optional(),
    img: z.string().url("Image must be a valid URL.").optional(),
  }),
});

export const blogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
