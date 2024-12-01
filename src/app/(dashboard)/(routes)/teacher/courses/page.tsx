import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import CourseListingTable from "./_components/CourseListingTable";
import { getTeacherCourses } from "@/db/teacher";

const courses = async () => {
  const courses = await getTeacherCourses();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between w-full my-2">
        <Input
          name="search"
          className="w-40 md:w-72 "
          placeholder="Filter Courses..."
        />
        <Button variant={"default"} className="" asChild>
          <Link href={"/teacher/courses/create"} className="flex gap-1">
            <CirclePlus size={"1rem"} />
            Create New
          </Link>
        </Button>
      </div>
      <div className="px-2 overflow-x-scroll md:overflow-x-hidden">
        <CourseListingTable courses={courses} />
      </div>
    </div>
  );
};

export default courses;
