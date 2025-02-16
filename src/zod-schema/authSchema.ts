import * as z from "zod";

export const signUpSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string(),
});

export const signInSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
