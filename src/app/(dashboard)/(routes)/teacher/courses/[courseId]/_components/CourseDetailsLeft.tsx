"use client";
import { LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";

import SectionHeader from "../../../_components/SectionHeader";
import CourseTitleForm from "./CourseTitleForm";
import CourseDescriptionForm from "./CourseDescriptionForm";
import CourseImageForm from "./CouseImageForm";
import CategorySelection from "./CategorySelection";

const CourseDetailsLeft = () => {
  return (
    <div className="flex flex-col ">
      <SectionHeader title="Customize your course" icon={LayoutDashboard} />
      <div className="flex flex-col">
        {/* title */}

        <CourseTitleForm />
        <CourseDescriptionForm />
        <CourseImageForm />
        <CategorySelection />
      </div>
    </div>
  );
};

export default CourseDetailsLeft;
