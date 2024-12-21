import { NextRequest, NextResponse } from "next/server";

import db from "@/db/db";

import { getSession } from "../../auth/[...nextauth]/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const session = await getSession();
    if (!session?.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "UnAuthorized",
        },
        { status: 404 }
      );
    }

    const ownCourse = await db?.course.findFirst({
      where: {
        creatorId: session.user.id,
        courseId,
      },
    });

    if (!ownCourse) {
      return NextResponse.json(
        {
          success: false,
          message: "UnAuthorized",
        },
        { status: 404 }
      );
    }

    const { list } = await req.json();
    for (let i = 0; i < list.length; i++) {
      await db.chapter.update({
        where: {
          chapterId: list[i].chapterId,
        },
        data: {
          position: i,
        },
      });
    }

    return NextResponse.json({
      message: "Updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to find chapters.",
      success: false,
    });
  }
}
