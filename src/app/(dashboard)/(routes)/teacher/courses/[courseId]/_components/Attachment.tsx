"use client";
import { deleteAttachments } from "@/actions/teacherAction";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Attachment } from "@prisma/client";
import { File, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SetStateAction, Dispatch } from "react";

interface AttachmentProps {
  attachment: Attachment;
  setRefetchTrigger: Dispatch<SetStateAction<boolean>>;
}

const AttachmentComponent = ({
  attachment,
  setRefetchTrigger,
}: AttachmentProps) => {
  const params = useParams();
  const toast = useToast();
  const router = useRouter();
  return (
    <div className="flex items-center space-x-2 justify-between bg-sky-300/20 py-1 rounded-md px-2">
      <div className="flex space-x-2">
        <File />
        <Link
          href={`${attachment.fileUrl}`}
          className="text-base text-sky-900 hover:text-sky-600 cursor-pointer"
          target="_blank"
        >
          {attachment.filename}
        </Link>
      </div>
      {/* TODO : Show confirmation modal */}
      <Button
        variant={"ghost"}
        type="button"
        size={"icon"}
        onClick={async () => {
          const result = await deleteAttachments(
            params.courseId as string,
            attachment.attachmentId
          );
          if (result.success) {
            toast.toast({ description: "Attachment Deleted Successfully" });
          } else {
            toast.toast({ description: "Failed To Delete Attachment." });
          }
          setRefetchTrigger(true);
        }}
      >
        <X size={"1rem"} />
      </Button>
    </div>
  );
};

export default AttachmentComponent;
