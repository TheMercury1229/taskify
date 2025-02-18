import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(req: NextRequest) {
  try {
    const { decoded, error, status } = verifyToken(req);
    if (error) return NextResponse.json({ error }, { status });
    if (typeof decoded !== "string") {
      throw new Error("Invalid token");
    }
    const decodedParsed = JSON.parse(decoded);
    const userProjects = await db.query.projects.findMany({
      where: eq(projects.userId, parseInt(decodedParsed.id)),
    });

    return NextResponse.json(userProjects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { decoded, error, status } = verifyToken(req);
    if (error) return NextResponse.json({ error }, { status });
    if (typeof decoded !== "string") {
      throw new Error("Invalid token");
    }
    const userId = JSON.parse(decoded).id;
    const { name } = await req.json();

    const newProject = await db
      .insert(projects)
      .values({ userId, name })
      .returning();

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
