import db from "@/db";
import { categories } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });

  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }

  // ✅ Extract category ID manually from the request URL
  const id = await params;
  const categoryId = await id.id;
  if (!categoryId || isNaN(Number(categoryId))) {
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
  }

  const category = await db.query.categories.findFirst({
    where: eq(categories.id, Number(categoryId)),
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });

  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }

  const id = await params;
  const categoryId = await id.id;
  if (!categoryId) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const updatedCategory = await db
    .update(categories)
    .set({ name })
    .where(eq(categories.id, Number(categoryId)))
    .returning();

  if (!updatedCategory.length) {
    return NextResponse.json(
      { error: "Category not found", success: false },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, category: updatedCategory[0] });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });

  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }

  const id = await params;
  const categoryId = await id.id;
  if (!categoryId) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  // ✅ Check if category exists before deleting
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, Number(categoryId)),
  });

  if (!category) {
    return NextResponse.json(
      { error: "Category not found", success: false },
      { status: 404 }
    );
  }

  await db.delete(categories).where(eq(categories.id, Number(categoryId)));

  return NextResponse.json({ success: true, message: "Category deleted" });
}
