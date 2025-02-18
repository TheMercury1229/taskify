import db from "@/db";
import { categories } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  const decodedParsed = JSON.parse(decoded);
  const category = await db.query.categories.findMany({
    where: eq(categories.userId, Number(params.id)),
  });

  if (!category.length)
    return NextResponse.json(
      { error: "Category not found", success: false },
      { status: 404 }
    );

  return NextResponse.json(category[0]);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  const { name } = await req.json();
  const updatedCategory = await db
    .update(categories)
    .set({ name })
    .where(eq(categories.id, Number(params.id)))
    .returning();
  return NextResponse.json(updatedCategory[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  await db.delete(categories).where(eq(categories.id, Number(params.id)));
  return NextResponse.json({ message: "Category deleted", success: true });
}
