import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Decimal } from "@prisma/client/runtime/library";
import { ArrowUpDown } from "lucide-react";
import CourseRow from "./CourseRow";

const CourseListingTable = ({
  courses,
}: {
  courses: {
    title: string;
    image: string | null;
    courseId: string;
    description: string | null;
    price: Decimal | null;
    published: boolean;
    attachmentId: string | null;
    creatorId: string;
  }[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="">
          <TableHead className="md:w-22 py-2 pl-4">
            Title
            <Button variant={"ghost"} size={"sm"}>
              <ArrowUpDown size={"1rem"} />
            </Button>
          </TableHead>

          <TableHead className="md:w-22 py-2 pl-4">
            Price
            <Button variant={"ghost"} size={"sm"}>
              <ArrowUpDown size={"1rem"} />
            </Button>
          </TableHead>
          <TableHead className="md:w-22 py-2 pl-4">
            Status
            <Button variant={"ghost"} size={"sm"}>
              <ArrowUpDown size={"1rem"} />
            </Button>
          </TableHead>
          <TableHead className="md:w-22 py-2 pl-4"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <CourseRow key={course.courseId} course={course} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CourseListingTable;
