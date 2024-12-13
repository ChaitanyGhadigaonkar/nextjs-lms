"use server";
import db from "@/db/db";
import { getSession } from "@/app/api/auth/[...nextauth]/auth";

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
