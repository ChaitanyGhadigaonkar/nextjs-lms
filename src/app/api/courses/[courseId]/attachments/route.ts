import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";

import { getSession } from "@/app/api/auth/[...nextauth]/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { attachment } = await req.json();
    const { courseId } = await params;

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const isOwn = await db.course.findFirst({
      where: {
        courseId,
      },
    });

    if (!isOwn) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }
    const updatedCourse = await db.attachment.create({
      data: {
        filename: "",
        courseId: courseId,
        fileUrl: attachment,
      },
    });
    NextResponse.json(
      {
        success: true,
        message: "Course Updated Successfully",
        course: updatedCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
