import db from "@/db/index";
import { users } from "@/db/schema";
import { generateToken } from "@/lib/generateToken";
import { signInSchema } from "@/zod-schema/authSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = signInSchema.parse(body);

    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 400 }
      );
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 400 }
      );
    }

    // Generate JWT
    const token = await generateToken(user);
    return NextResponse.json(
      { message: "Login successful", success: true, token },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in login route", error.stack);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
