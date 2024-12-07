"use client";
import { LayoutDashboard, ListChecks, Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import SectionHeader from "../../_components/SectionHeader";
import CourseDetailsLeft from "./_components/CourseDetailsLeft";

const CourseOverViewPage = () => {
  const params = useParams();
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center md:flex-row md:justify-between">
        <div className="top">
          <h1 className="text-md font-semibold md:font-bold md:text-2xl md:mb-1">
            Course Setup
          </h1>
          <p className="text-sm text-slate-700">Complete all fields (0/6)</p>
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
          <CourseDetailsLeft />
        </div>
        {/* right  */}
        <div className="flex-1">
          <SectionHeader title="Course Chapters" icon={ListChecks} />
        </div>
      </div>
    </div>
  );
};

export default CourseOverViewPage;
