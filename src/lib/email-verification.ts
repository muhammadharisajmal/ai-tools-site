import { prisma } from "@/lib/prisma";

export async function createEmailVerificationToken(email: string) {
  // Delete any previous verification tokens for this email
  await prisma.emailVerificationToken.deleteMany({
    where: {
      email,
    },
  });

  // Generate secure random token using standard Web API (Edge compatible)
  const token = crypto.randomUUID();

  // Token expires in 24 hours
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Save token
  await prisma.emailVerificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return token;
}