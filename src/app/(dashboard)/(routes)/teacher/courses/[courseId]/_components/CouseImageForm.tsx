"use client";
import { useState } from "react";
import { ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import UploadFile from "@/components/UploadFile";
import { useParams, useRouter } from "next/navigation";
import { UpdateCourseImageAction } from "@/actions/teacherAction";
import { useToast } from "@/hooks/use-toast";

type CourseImageFormType = {
  image: string | null | undefined;
};
const CourseImageForm = ({ image }: CourseImageFormType) => {
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
        <h4 className="text-base font-medium ">Course Image</h4>

        <Button
          variant={"ghost"}
          className="flex items-center justify-center gap-2"
          onClick={() => toggleEditing()}
        >
          {isEditing ? (
            <p className="text-sm">Cancel</p>
          ) : (
            <>
              <Pencil size={16} />
              <p className="text-sm">Edit image</p>
            </>
          )}
        </Button>
      </div>

      {!isEditing && image && (
        <Image
          priority={true}
          className="text-base py-2 w-full h-56 rounded-lg"
          src={image}
          width={300}
          height={250}
          alt="course image"
        />
      )}
      {!isEditing && !image && (
        <div className="w-full h-56 rounded-lg bg-gray-200 flex items-center justify-center">
          <ImageIcon className="w-8 h-8" />
        </div>
      )}
      {isEditing && (
        <UploadFile
          accept="image/*"
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
                description: "Failed  To update Course Image",
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

export default CourseImageForm;
