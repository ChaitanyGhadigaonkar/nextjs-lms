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
