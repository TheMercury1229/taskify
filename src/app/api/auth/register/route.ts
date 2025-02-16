import db from "@/db/index";
import { signUpSchema } from "@/zod-schema/authSchema";
import { users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password, name } = signUpSchema.parse(body);

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }

    // Hash password & create user
    const hashPass = await bcrypt.hash(password, 10);
    await db.insert(users).values({ email, passwordHash: hashPass, name });

    return NextResponse.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in register route", error.stack);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
