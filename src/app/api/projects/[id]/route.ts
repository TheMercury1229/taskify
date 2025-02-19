import db from "@/db";
import { projects } from "@/db/schema";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  const proj = await params;
  const projId = await proj.id;
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, Number(projId)),
  });
  if (!project)
    return NextResponse.json(
      { error: "Project not found", success: false },
      { status: 404 }
    );

  return NextResponse.json(project);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { name } = await req.json();
  const proh = await params;
  const projId = await proh.id;
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, Number(projId)),
  });
  if (!project)
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (typeof decoded !== "string") {
    throw new Error("Invalid token");
  }
  if (decoded !== JSON.stringify(project.userId)) {
    return NextResponse.json(
      { error: "Unauthorized", success: false },
      { status: 403 }
    );
  }

  const updatedProject = await db
    .update(projects)
    .set({ name })
    .where(eq(projects.id, Number(projId)))
    .returning();
  return NextResponse.json(updatedProject[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const proh = await params;
  const projId = await proh.id;
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, Number(projId)),
  });
  if (!project)
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const { decoded, error, status } = verifyToken(req);
  if (error) return NextResponse.json({ error }, { status });
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 400 }
    );
  }
  await db.delete(projects).where(eq(projects.id, Number(projId)));
  return NextResponse.json({ message: "Project deleted", success: true });
}
