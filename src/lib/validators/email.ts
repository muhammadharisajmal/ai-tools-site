import { z } from "zod";

export const EmailCategories = [
  "STUDY_TIPS",
  "WEEKLY_SUMMARY",
  "PRODUCT_UPDATES",
  "AI_ANNOUNCEMENTS",
  "CUSTOM",
] as const;

export const RecipientTypes = [
  "ALL_USERS",
  "VERIFIED_USERS",
  "STUDENTS_ROLE",
  "ADMINS_ROLE",
  "STUDY_TIPS_SUBSCRIBERS",
  "WEEKLY_SUMMARY_SUBSCRIBERS",
  "PRODUCT_UPDATES_SUBSCRIBERS",
  "AI_ANNOUNCEMENTS",
  "CUSTOM",
] as const;

export const SendEmailSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(150, "Subject cannot exceed 150 characters."),

  body: z
    .string()
    .trim()
    .min(10, "Email body must be at least 10 characters."),

  category: z.enum(EmailCategories),

  recipientType: z.enum(RecipientTypes),

  customEmails: z.array(z.string().email()).optional(),
});

export type SendEmailInput = z.infer<typeof SendEmailSchema>;