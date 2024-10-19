import { Button } from "@/components/ui/button";
import Link from "next/link";

const courses = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button variant={"default"} className="mr-auto" asChild>
        <Link href={"/teacher/courses/create"}>create</Link>
      </Button>
    </div>
  );
};

export default courses;
