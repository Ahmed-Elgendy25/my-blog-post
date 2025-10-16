import { z } from "zod";

// Make sure File is available in the browser context
declare global {
  interface Window {
    File: typeof File;
  }
}

export const SignupSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  linkedinProfile: z.string().optional(),
  instagramProfile: z.string().optional(),
  twitterProfile: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password is required"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
  role: z.array(z.string()).min(1, "At least one role is required"),
  profileImage: z.any().optional(), // Changed from z.instanceof(File) to z.any() to avoid issues
});

export type SignupFormFields = z.infer<typeof SignupSchema>;
