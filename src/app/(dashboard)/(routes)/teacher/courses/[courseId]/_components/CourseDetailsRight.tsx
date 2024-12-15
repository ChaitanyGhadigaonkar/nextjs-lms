import { Course } from "@prisma/client";

import ChaptersSection from "./ChaptersSection";

type CourseDetailsRightProps = {
  course: Course | null;
};

const CourseDetailsRight = ({ course }: CourseDetailsRightProps) => {
  return (
    <div className="flex flex-col">
      <ChaptersSection courseId={course?.courseId} />
    </div>
  );
};

export default CourseDetailsRight;
