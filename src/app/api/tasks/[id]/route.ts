import db from "@/db";
import { tasks } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error, success: false }, { status });

  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, Number(params.id)),
  });
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return NextResponse.json(task);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error, success: false }, { status });
  const updates = await req.json();
  const updatedTask = await db
    .update(tasks)
    .set(updates)
    .where(eq(tasks.id, Number(params.id)))
    .returning();
  return NextResponse.json(updatedTask[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error, success: false }, { status });
  await db.delete(tasks).where(eq(tasks.id, Number(params.id)));
  return NextResponse.json({ message: "Task deleted" });
}
