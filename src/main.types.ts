import { Chapter } from "@prisma/client";

export interface DndChapterType extends Chapter {
  id: number;
}
