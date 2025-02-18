import db from "@/db";
import { categories } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });

  // Ensure `decoded` is an object and contains the user ID
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }
  const userCategories = await db.query.categories.findMany({
    where: eq(categories.userId, decoded.id),
  });

  return NextResponse.json(userCategories);
}

export async function POST(req: NextRequest) {
  const { decoded, error, status } = verifyToken(req);
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }
  const { name } = await req.json();

  const newCategory = await db
    .insert(categories)
    .values({ userId: decoded.id, name })
    .returning();

  return NextResponse.json(newCategory, { status: 201 });
}
