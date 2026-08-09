import { resend } from "@/lib/resend";
import { canReceiveEmail } from "@/lib/email-permissions";

const FROM_EMAIL = "AI Study Hub <onboarding@resend.dev>";

export async function sendStudyTipsEmail(
  email: string,
  subject: string,
  html: string
) {
  const allowed = await canReceiveEmail(email, "studyTipsEmails");

  if (!allowed) {
    return {
      success: false,
      message: "Study Tips emails are disabled.",
    };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject,
    html,
  });
}

export async function sendWeeklySummaryEmail(
  email: string,
  subject: string,
  html: string
) {
  const allowed = await canReceiveEmail(email, "weeklySummaryEmails");

  if (!allowed) {
    return {
      success: false,
      message: "Weekly Summary emails are disabled.",
    };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject,
    html,
  });
}

export async function sendProductUpdateEmail(
  email: string,
  subject: string,
  html: string
) {
  const allowed = await canReceiveEmail(email, "productUpdatesEmails");

  if (!allowed) {
    return {
      success: false,
      message: "Product Update emails are disabled.",
    };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject,
    html,
  });
}

export async function sendAIAnnouncementEmail(
  email: string,
  subject: string,
  html: string
) {
  const allowed = await canReceiveEmail(email, "aiAnnouncementsEmails");

  if (!allowed) {
    return {
      success: false,
      message: "AI Announcement emails are disabled.",
    };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject,
    html,
  });
}