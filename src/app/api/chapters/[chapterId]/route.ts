import { getAllChapters } from "@/db/teacher";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: Promise<{ chapterId: string }> }
) {}
