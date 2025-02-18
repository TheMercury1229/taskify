import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const verifyToken = (req: NextRequest) => {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return { error: "Unauthorized", status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return { decoded, error: null };
  } catch (error) {
    return { error: "Invalid Token", status: 403 };
  }
};
