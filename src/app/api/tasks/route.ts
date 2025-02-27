import db from "@/db";
import { tasks } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error, success: false }, { status });

  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }

  const userTasks = await db.query.tasks.findMany({
    where: eq(tasks.userId, decoded.id),
  });

  return NextResponse.json(userTasks);
}

export async function POST(req: NextRequest) {
  const { decoded, error, status: st } = verifyToken(req);
  if (error)
    return NextResponse.json({ error, success: false }, { status: st });

  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }

  const {
    title,
    description,
    dueDate,
    priority,
    status,
    projectId,
    categoryId,
  } = await req.json();

  const parsedDueDate = dueDate ? new Date(dueDate) : null;

  const newTask = await db
    .insert(tasks)
    .values({
      userId: Number(decoded.id),
      title,
      description,
      dueDate: parsedDueDate,
      priority,
      status,
      projectId,
      categoryId,
    })
    .returning();

  return NextResponse.json(newTask, { status: 201 });
}
