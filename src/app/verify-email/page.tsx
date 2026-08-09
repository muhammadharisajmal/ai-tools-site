import Link from "next/link";

interface Props {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const success = params.success === "true";
  const error = params.error;

  let title = "";
  let description = "";

  if (success) {
    title = "Email Verified 🎉";
    description =
      "Your account has been verified successfully. You can now login.";
  } else {
    switch (error) {
      case "missing-token":
        title = "Missing Verification Token";
        description =
          "Verification link is incomplete.";
        break;

      case "invalid-token":
        title = "Invalid Verification Link";
        description =
          "This verification link is invalid.";
        break;

      case "expired":
        title = "Verification Link Expired";
        description =
          "Your verification link has expired.";
        break;

      default:
        title = "Verification Failed";
        description =
          "Something went wrong while verifying your account.";
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-4 text-slate-300">
          {description}
        </p>

        {success ? (
          <Link
            href="/login"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </Link>
        ) : (
          <Link
            href="/login"
            className="mt-8 inline-block rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-600"
          >
            Back to Login
          </Link>
        )}

      </div>
    </main>
  );
}