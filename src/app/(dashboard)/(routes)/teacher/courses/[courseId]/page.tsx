import { LayoutDashboard, ListChecks, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import db from "@/db/db";

import SectionHeader from "../../_components/SectionHeader";
import CourseDetailsLeft from "./_components/CourseDetailsLeft";
import CourseDetailsRight from "./_components/CourseDetailsRight";
import { useState } from "react";

const CourseOverViewPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const courseDetails = await db.course.findFirst({
    where: {
      courseId: params.courseId as string,
    },
  });
  const completedSectionCount = async () => {
    let count = 0;
    if (courseDetails) {
      if (courseDetails?.title?.length >= 0) {
        count++;
      }

      if (
        courseDetails?.description &&
        courseDetails?.description?.length >= 0
      ) {
        count++;
      }
      if (courseDetails?.image && courseDetails?.image?.length >= 0) {
        count++;
      }
      if (courseDetails?.category && courseDetails?.category?.length >= 0) {
        count++;
      }
      const chapters = await db.chapter.findMany({
        where: {
          courseId: courseDetails?.courseId,
        },
      });
      if (chapters.length > 0) {
        count++;
      }
      if (courseDetails?.price && Number(courseDetails?.price) > 0) {
        count++;
      }
      return count;
    }
  };

  const completedFields = await completedSectionCount();
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center md:flex-row md:justify-between">
        <div className="top">
          <h1 className="text-md font-semibold md:font-bold md:text-2xl md:mb-1">
            Course Setup
          </h1>
          <p className="text-sm text-slate-700">
            Complete all fields ({completedFields}/6)
          </p>
        </div>
        <div className="flex align-center gap-2 ml-auto md:justify-center">
          <Button variant={"ghost"}>
            <p>Unpublish</p>
          </Button>
          <Button variant={"default"} className="py-4">
            <Trash size={18} />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex my-4 flex-col gap-2 md:flex-row">
        {/* left */}
        <div className="flex flex-1 flex-col gap-2">
          <CourseDetailsLeft course={courseDetails} />
        </div>
        {/* right  */}
        <div className="flex-1 px-2">
          <CourseDetailsRight course={courseDetails} />
        </div>
      </div>
    </div>
  );
};

export default CourseOverViewPage;
