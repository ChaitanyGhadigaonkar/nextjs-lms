import { getAllChapters } from "@/db/teacher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  try {
    const { chapterId } = await params;

    const chapters = await getAllChapters(chapterId);

    if (!chapters) {
      return NextResponse.json({
        message: "No Chapters Found.",
        success: false,
        chapters: [],
      });
    }

    return NextResponse.json({
      chapters: chapters,
      message: "Fetched Chapters Successfully.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to find chapters.",
      success: false,
    });
  }
}
