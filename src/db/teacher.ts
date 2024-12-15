import db from "./db";
import { getSession } from "@/app/api/auth/[...nextauth]/auth";

export const getTeacherCourses = async () => {
  const session = await getSession();
  const id = session?.user?.id;
  return db.course.findMany({
    where: {
      creatorId: id,
    },
  });
};
export const getAllChapters = async (courseId: string) => {
  const session = await getSession();
  return db.chapter.findMany({
    where: {
      courseId: courseId,
    },
  });
};
