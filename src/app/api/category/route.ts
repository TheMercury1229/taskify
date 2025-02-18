import db from "@/db";
import { categories } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  const decodedParsed = JSON.parse(decoded);
  const userCategories = await db.query.categories.findMany({
    where: eq(categories.userId, decodedParsed.id),
  });

  return NextResponse.json(userCategories);
}

export async function POST(req: NextRequest) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  const decodedParsed = JSON.parse(decoded);
  const { name } = await req.json();

  const newCategory = await db
    .insert(categories)
    .values({ userId: decodedParsed.id, name })
    .returning();

  return NextResponse.json(newCategory, { status: 201 });
}
