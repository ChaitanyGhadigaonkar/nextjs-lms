import React from "react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ChapterComponent from "./Chapter";
import { DndChapterType } from "@/main.types";

interface ChaptersProps {
  chapters: DndChapterType[];
}
const Chapters: React.FC<ChaptersProps> = ({ chapters }) => {
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
