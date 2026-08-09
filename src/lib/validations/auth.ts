import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50),

  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const resendVerificationSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),
});

export type ResendVerificationInput =
  z.infer<typeof resendVerificationSchema>;