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
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }
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

  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }

  const { id } = params;
  const updates = await req.json();

  // ✅ Ensure dueDate is a valid Date before updating
  const parsedDueDate = updates.dueDate ? new Date(updates.dueDate) : null;

  // ✅ Ensure only valid fields are updated
  const updateData = {
    ...(updates.title && { title: updates.title }),
    ...(updates.description && { description: updates.description }),
    ...(updates.priority !== undefined && { priority: updates.priority }),
    ...(updates.status && { status: updates.status }),
    dueDate: parsedDueDate,
  };

  const updatedTask = await db
    .update(tasks)
    .set(updateData)
    .where(eq(tasks.id, Number(id)))
    .returning();

  return NextResponse.json(updatedTask[0]);
}

export async function DELETE(
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
  if (error) return NextResponse.json({ error, success: false }, { status });
  await db.delete(tasks).where(eq(tasks.id, Number(param.id)));
  return NextResponse.json({ message: "Task deleted" });
}
