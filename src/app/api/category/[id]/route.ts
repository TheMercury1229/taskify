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
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }
  const param = await params;
  const paramId = await param.id;
  const category = await db.query.categories.findMany({
    where: eq(categories.userId, Number(paramId)),
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
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
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
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }
  await db.delete(categories).where(eq(categories.id, Number(params.id)));
  return NextResponse.json({ message: "Category deleted", success: true });
}
