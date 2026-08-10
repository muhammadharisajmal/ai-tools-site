import { createEmailVerificationToken } from "@/lib/email-verification";
import { sendEmail } from "@/lib/email";

export async function sendVerificationEmail(
  email: string,
  name?: string
) {
  const token = await createEmailVerificationToken(email);

  const baseUrl = process.env.NEXTAUTH_URL;

    const verificationLink =
    `${baseUrl}/api/auth/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your AI Study Hub account",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Welcome ${name ?? ""} 👋</h2>

        <p>
          Thank you for creating your AI Study Hub account.
        </p>

        <p>
          Please verify your email address by clicking the button below.
        </p>

        <p style="margin:30px 0">
          <a
            href="${verificationLink}"
            style="
              background:#2563eb;
              color:white;
              text-decoration:none;
              padding:14px 28px;
              border-radius:8px;
              display:inline-block;
            "
          >
            Verify Email
          </a>
        </p>

        <p>
          This verification link expires in
          <strong>24 hours</strong>.
        </p>

        <hr/>

        <p style="font-size:13px;color:#666">
          If you didn't create this account,
          you can safely ignore this email.
        </p>

        <p style="font-size:13px;color:#666">
          AI Study Hub Team
        </p>
      </div>
    `,
  });
}