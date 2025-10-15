import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const contentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),

  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .min(10, "Subtitle must be at least 10 characters")
    .max(500, "Subtitle must be less than 500 characters"),

  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(
      /^\d+\s*(min|mins|minute|minutes|hr|hrs|hour|hours|sec|secs|second|seconds)$/i,
      "Duration must be in format like '5 min', '2 hours', or '30 seconds'",
    ),

  thumbnail: z
    .instanceof(File, { message: "Thumbnail image is required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Image must be less than 10MB",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, .gif and .webp formats are supported",
    ),

  content: z
    .string()
    .min(1, "Content is required")
    .min(50, "Content must be at least 50 characters"),
});

export type ContentFormData = z.infer<typeof contentSchema>;
