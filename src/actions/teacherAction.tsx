"use server";
import db from "@/db/db";
import { getSession } from "@/app/api/auth/[...nextauth]/auth";

export const CreateCourseAction = async (title: string) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }

    const course = await db.course.create({
      data: {
        creatorId: session.user.id,
        title: title,
      },
    });

    return {
      success: true,
      data: { course },
      message: "Course Created Successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create course." };
  }
};
