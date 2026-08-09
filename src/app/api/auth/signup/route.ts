import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth";
import { sendVerificationEmail } from "@/lib/send-verification-email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        // Email/password users are NOT verified initially
        emailVerified: null,
      },
    });

    console.log("=================================");
    console.log("NEW USER CREATED");
    console.log(user);
    console.log("=================================");

    // Send verification email
    console.log("Sending verification email to:", email);

    try {
      await sendVerificationEmail(email, name);
    
      console.log("Verification email sent successfully.");
    } catch (error) {
      console.error("Verification email failed:", error);
    
      return NextResponse.json(
        {
          success: false,
          message:
            "Account was created, but we couldn't send the verification email. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created successfully. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}