"use server";
import db from "@/db/db";
import { getSession } from "@/app/api/auth/[...nextauth]/auth";


type UpdateChapterActionInput = { title : string, courseId : string, chapterId : string}

export const UpdateChapterTitleAction = async ({title, courseId, chapterId} : UpdateChapterActionInput ) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }

    const isExists = await db.chapter.findFirst({
      where: {
            courseId,
            chapterId
      },
    });

    if (!isExists) {
      throw new Error("Course does not exists.");
    }

    const chapter = await db.chapter.update({
      where: {
        courseId,
        chapterId
      },
      data : {
        title
      }
    });

    return {
      success: true,
      data: { chapter  },
      message: "Chapter Updated Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Update Chapter." };
  }
};