import { Course } from "@prisma/client";

import ChaptersSection from "./ChaptersSection";
import PriceSection from "./PriceSection";
import AttachmentsSection from "./AttachmentsSection";

type CourseDetailsRightProps = {
  course: Course | null;
};

const CourseDetailsRight = ({ course }: CourseDetailsRightProps) => {
  return (
    <div className="flex flex-col gap-1">
      <ChaptersSection courseId={course?.courseId} />
      <PriceSection price={Number(course?.price)} />
      <AttachmentsSection course={course} />
    </div>
  );
};

export default CourseDetailsRight;
