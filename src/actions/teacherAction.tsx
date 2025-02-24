"use server";
import db from "@/db/db";
import { getSession } from "@/app/api/auth/[...nextauth]/auth";
import { Prisma } from "@prisma/client";

export const CreateCourseAction = async (title: string) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }

    const isExists = await db.course.findFirst({
      where: {
        title,
      },
    });

    if (isExists) {
      throw new Error("Course Title Already Taken.");
    }
    console.log(session.user.id);
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
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Create Course." };
  }
};

export const DeleteCourseAction = async (courseId: string) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }
    console.log(session.user.id + "at delete course");
    const deleteCourse = await db.course.delete({
      where: {
        courseId,
      },
    });
    return {
      success: true,
      data: { deleteCourse },
      message: "Course Created Successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create course." };
  }
};

export const UpdateCourseTitleAction = async (
  courseId: string,
  title: string
) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }

    const updatedCourse = await db.course.update({
      where: {
        courseId,
      },
      data: {
        title,
      },
    });
    return {
      success: true,
      data: { updatedCourse },
      message: "Course Updated Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Create Course." };
  }
};
export const UpdateCourseDescriptionAction = async (
  courseId: string,
  description: string
) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }

    const updatedCourse = await db.course.update({
      where: {
        courseId,
      },
      data: {
        description,
      },
    });
    return {
      success: true,
      data: { updatedCourse },
      message: "Course updated Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Create Course." };
  }
};
export const UpdateCourseImageAction = async (
  courseId: string,
  image: string
) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }
    const updatedCourse = await db.course.update({
      where: {
        courseId,
      },
      data: {
        image,
      },
    });
    return {
      success: true,
      data: { updatedCourse },
      message: "Course updated Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Create Course." };
  }
};
export const UpdateCourseCategoryAction = async (
  courseId: string,
  category: string
) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }
    const updatedCourse = await db.course.update({
      where: {
        courseId,
      },
      data: {
        category,
      },
    });
    return {
      success: true,
      data: { updatedCourse },
      message: "Course updated Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Create Course." };
  }
};

export const UpdateCoursePriceAction = async (
  courseId: string,
  price: string
) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }

    const updatedCourse = await db.course.update({
      where: {
        courseId,
      },
      data: {
        price: new Prisma.Decimal(price),
      },
    });
    return {
      success: true,
      data: { updatedCourse },
      message: "Course Updated Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Create Course." };
  }
};

// chapters

export const createChapter = async (courseId: string, chapterName: string) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }
    const chapters = await db.chapter.findMany({
      where: {
        courseId,
      },
    });
    const chapter = await db.chapter.create({
      data: {
        courseId: courseId,
        title: chapterName,
        position: chapters.length,
      },
    });
    return {
      success: true,
      data: { chapter },
      message: "Chapter created Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Create Chapter." };
  }
};

// attachments
export const deleteAttachments = async (
  courseId: string,
  attachmentId: string
) => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("Session Not Found");
    }
    const isOwn = await db.course.findFirst({
      where: {
        courseId,
        creatorId: session.user.id,
      },
    });
    if (!isOwn) {
      return { success: false, message: "UnAuthorized." };
    }
    const attachment = await db.attachment.delete({
      where: {
        courseId: courseId,
        attachmentId,
      },
    });
    return {
      success: true,
      data: { attachment },
      message: "Attachment deleted Successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed To Delete Attachment." };
  }
};
