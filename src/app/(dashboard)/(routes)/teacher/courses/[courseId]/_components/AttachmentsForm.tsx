"use client";
import { useState } from "react";
import { CirclePlus, ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import UploadFile from "@/components/UploadFile";
import { useParams, useRouter } from "next/navigation";
import { UpdateCourseImageAction } from "@/actions/teacherAction";
import { useToast } from "@/hooks/use-toast";
import { Attachment } from "@prisma/client";

type AttachmentsFormProps = {
  image: string | null | undefined;
  attachments: Attachment[] | null | undefined;
};
const AttachmentsForm = ({ image }: AttachmentsFormProps) => {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-2 bg-blue-50 px-4 py-2 my-2 rounded-md md:gap-4">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-base font-medium ">Course Attachments</h4>

        <Button
          variant={"ghost"}
          className="flex items-center justify-center gap-2"
          onClick={() => toggleEditing()}
        >
          {isEditing ? (
            <p className="text-sm">Cancel</p>
          ) : (
            <>
              <CirclePlus size={16} />
              Add an attachment
            </>
          )}
        </Button>
      </div>

      {!isEditing && image && (
        <div>
          <p>No Attachments Yet</p>
        </div>
      )}
      {!isEditing && !image && (
        <div>
          <p>No Attachments Yet</p>
        </div>
      )}
      {isEditing && (
        <UploadFile
          accept="*"
          setUploadedFileUrl={setImageUrl}
          onFileUpload={async (image) => {
            const data = await UpdateCourseImageAction(
              params.courseId as string,
              image
            );
            if (data.success) {
              toast.toast({
                description: "Course Updated Successfully.",
              });
            } else {
              toast.toast({
                description: "Failed To update Course Image",
              });
            }
            router.refresh();
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default AttachmentsForm;
