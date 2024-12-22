import React from "react";
import { DndChapterType } from "@/main.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterPropsType {
  chapter: DndChapterType;
}
const ChapterComponent: React.FC<ChapterPropsType> = ({ chapter }) => {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({
      id: chapter.id,
    });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      className="border border-slate-300 rounded-sm px-2 py-2 w-full flex justify-between items-center mb-2 shadow-sm touch-none"
    >
      <div className="flex gap-2 items-center">
        <GripVertical className="text-blue-500 w-5 h-5" />
        <p className="text-sm font-semibold"> {chapter.title}</p>
      </div>
      <div className="flex gap-1">
        <Badge>Free</Badge>
        <Badge className="bg-blue-600 hover:bg-blue-500">UnPublished</Badge>
      </div>
    </div>
  );
};

export default ChapterComponent;
