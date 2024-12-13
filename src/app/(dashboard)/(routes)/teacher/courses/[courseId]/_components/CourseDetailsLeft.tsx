"use client";
import { LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";

import SectionHeader from "../../../_components/SectionHeader";
import CourseTitleForm from "./CourseTitleForm";
import CourseDescriptionForm from "./CourseDescriptionForm";
import CourseImageForm from "./CouseImageForm";
import CategorySelection from "./CategorySelection";
import { Course } from "@prisma/client";

interface CourseDetailsLeftProps {
  course: Course | null;
}
const CourseDetailsLeft = ({ course }: CourseDetailsLeftProps) => {
  return (
    <div className="flex flex-col ">
      <SectionHeader title="Customize your course" icon={LayoutDashboard} />
      <div className="flex flex-col">
        {/* title */}

        <CourseTitleForm title={course?.title} />
        <CourseDescriptionForm description={course?.description} />
        <CourseImageForm image={course?.image} />
        <CategorySelection />
      </div>
    </div>
  );
};

export default CourseDetailsLeft;
