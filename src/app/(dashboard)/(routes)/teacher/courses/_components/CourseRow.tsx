import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Decimal } from "@prisma/client/runtime/library";
import { Ellipsis } from "lucide-react";

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

          <DropdownMenuContent>
            <DropdownMenuLabel>Edit</DropdownMenuLabel>
            <DropdownMenuLabel>Delete</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default CourseRow;
