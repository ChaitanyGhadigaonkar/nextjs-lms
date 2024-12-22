import React from "react";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ChapterComponent from "./Chapter";
import { DndChapterType } from "@/main.types";
import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

interface ChaptersProps {
  chapters: DndChapterType[];
}
const Chapters: React.FC<ChaptersProps> = ({ chapters }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div>
      <SortableContext strategy={verticalListSortingStrategy} items={chapters}>
        {chapters.map((chapter) => (
          <ChapterComponent chapter={chapter} key={chapter.chapterId} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Chapters;
