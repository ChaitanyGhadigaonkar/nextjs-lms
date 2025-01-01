import { NextRequest, NextResponse } from "next/server";

import db from "@/db/db";
import { getSession } from "@/app/api/auth/[...nextauth]/auth";
import configureCloudinary from "@/lib/cloudinaryConfig";
import { upload } from "@/lib/upload";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 400 }
      );
    }
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
    configureCloudinary();

    const uploadResult: any = await upload(file as File);
    if (uploadResult.success) {
      const updatedCourse = await db.attachment.create({
        data: {
          filename: (file as File).name,
          courseId: courseId,
          fileUrl: uploadResult.result.url,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Course Updated Successfully",
          course: updatedCourse,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to upload file",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
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

    const attachments = await db.attachment.findMany({
      where: {
        courseId,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Course Updated Successfully",
        attachments: attachments,
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
