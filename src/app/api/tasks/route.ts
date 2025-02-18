import db from "@/db";
import { tasks } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error, success: false }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  const decodedParsed = JSON.parse(decoded);
  const userTasks = await db.query.tasks.findMany({
    where: eq(tasks.userId, decodedParsed.id),
  });
  return NextResponse.json(userTasks);
}

export async function POST(req: NextRequest) {
  const { decoded, error, status: st } = verifyToken(req);
  if (error)
    return NextResponse.json({ error, success: false }, { status: st });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
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
  const decodedParsed = JSON.parse(decoded);
  const newTask = await db
    .insert(tasks)
    .values({
      userId: Number(decodedParsed.id),
      title,
      description,
      dueDate,
      priority,
      status,
      projectId,
      categoryId,
    })
    .returning();

  return NextResponse.json(newTask, { status: 201 });
}
