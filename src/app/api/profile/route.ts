import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface UpdateProfileRequestBody {
  name?: string;
}

export async function PATCH(req: Request) {
  try {
    // 1. Read session and verify authentication
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please log in.",
        },
        { status: 401 }
      );
    }

    // 2. Read body
    const body: UpdateProfileRequestBody = await req.json();
    const { name } = body;

    // 3. Validate name input
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required.",
        },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must be between 2 and 50 characters long.",
        },
        { status: 400 }
      );
    }

    // 4. Update ONLY User.name using session.user.id
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: trimmedName,
      },
    });

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PROFILE_PATCH_API_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while updating profile.",
      },
      { status: 500 }
    );
  }
}