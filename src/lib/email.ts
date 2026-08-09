import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from,
}: SendEmailOptions) {
  try {
    const response = await resend.emails.send({
      from: from || "AI Study Hub <noreply@aistudyhub.org>",
      to,
      subject,
      html,
    });

    if (response.error) {
      console.error("❌ Resend Error:", response.error);
      throw new Error(response.error.message);
    }

    console.log("✅ Email sent successfully via Resend.");
    return response;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
}