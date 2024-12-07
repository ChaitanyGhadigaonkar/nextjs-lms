"use client";
import { DeleteCourseAction } from "@/actions/teacherAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Decimal } from "@prisma/client/runtime/library";
import { Ellipsis, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const CourseRow = ({
  course,
}: {
  course: {
    title: string;
    image: string | null;
    courseId: string;
    description: string | null;
    price: Decimal | null;
    published: boolean;
    attachmentId: string | null;
    creatorId: string;
  };
}) => {
  const router = useRouter();
  return (
    <TableRow>
      <TableCell className="text-ellipsis w-10 md:w-auto overflow-hidden md:text-left md:pl-4 font-medium">
        {course.title}
      </TableCell>
      <TableCell className="md:pl-4 font-medium">
        {course.price === null ? "Not Set" : Number(course.price)}
      </TableCell>
      <TableCell className="md:pl-4">
        {course.published ? (
          <Badge>published</Badge>
        ) : (
          <Badge> Not Published</Badge>
        )}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col items-center justify-center">
            <DropdownMenuLabel>
              <Button
                className="w-20"
                onClick={() => {
                  router.push(`/teacher/courses/${course.courseId}`);
                }}
              >
                Edit
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <Button
                variant={"destructive"}
                className="w-20"
                onClick={async () => {
                  await DeleteCourseAction(course.courseId);
                  router.refresh();
                }}
              >
                Delete
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default CourseRow;
