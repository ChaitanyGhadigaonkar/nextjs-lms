"use client";
import { useState } from "react";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import ChaptersDnd from "./ChaptersDnd";
import AddChapterForm from "./AddChapterForm";

interface ChaptersSectionProps {
  courseId: string | undefined;
}

const ChaptersSection = ({ courseId }: ChaptersSectionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-2 bg-blue-50 px-4 py-2 my-2 rounded-md md:gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">Course Chapters</h3>

        <Button
          variant={"ghost"}
          className="flex items-center gap-2"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <p className="text-sm">Cancel</p>
          ) : (
            <>
              <CirclePlus size={16} />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <AddChapterForm courseId={courseId} setIsEditing={setIsEditing} />
      ) : (
        <ChaptersDnd courseId={courseId} />
      )}
      <div>
        <p className="text-xs">Drag and Drop to reorder chapters</p>
      </div>
    </div>
  );
};

export default ChaptersSection;
