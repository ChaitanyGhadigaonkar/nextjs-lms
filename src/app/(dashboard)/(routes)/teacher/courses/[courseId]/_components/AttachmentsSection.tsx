import { File } from "lucide-react";
import SectionHeader from "../../../_components/SectionHeader";

import AttachmentsForm from "./AttachmentsForm";
import { Course } from "@prisma/client";

interface AttachmentSectionProps {
  course: Course | null;
}
const AttachmentsSection = ({ course }: AttachmentSectionProps) => {
  return (
    <div className="flex flex-col">
      <SectionHeader title="Attachments" icon={File} />
      <AttachmentsForm />
    </div>
  );
};

export default AttachmentsSection;
