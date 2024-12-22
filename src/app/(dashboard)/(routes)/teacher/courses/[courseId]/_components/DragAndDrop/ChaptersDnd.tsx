"use client";

import { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";

import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import Chapters from "./Chapters";
import { DndChapterType } from "@/main.types";
import { arrayMove } from "@dnd-kit/sortable";
import { Loader2 } from "lucide-react";

interface ChaptersDndProps {
  courseId: string | undefined;
}

const ChaptersDnd = ({ courseId }: ChaptersDndProps) => {
  const [chapters, setChapters] = useState<DndChapterType[]>([]);
  const [isPending, setIsPending] = useState(false);

  const getAllChapters = async () => {
    try {
      const response = await fetch(`/api/chapters/${courseId}`);
      const data = await response.json();
      if (data.success) {
        const chaptersForDnd = data.chapters.map((item: Chapter) => {
          return {
            ...item,
            id: item.position,
          };
        });
        setChapters(chaptersForDnd);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChapterPosition = (id: number) => {
    return chapters.findIndex((item) => item.id === id);
  };
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    const originalPosition = getChapterPosition(active.id as number);
    const newPosition = getChapterPosition(over?.id as number);
    const reorderedList = arrayMove(chapters, originalPosition, newPosition);
    setIsPending(true);
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list: reorderedList,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setChapters(() => reorderedList);
      } else {
        console.error("API Error:", data.message);
      }
      setIsPending(false);
    } catch (error) {
      console.error("An error occurred while updating chapters:", error);
      setIsPending(false);
    }
  };

  useEffect(() => {
    getAllChapters();
  }, []);

  return (
    <div className="relative w-full h-full">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        {isPending && (
          <div className="absolute inset-0 w-full h-full bg-sky-500/50 flex items-center justify-center z-20 rounded-md">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}
        {chapters.length === 0 ? (
          <div className="text-base text-slate-600 font-semibold">
            No Chapters Available
          </div>
        ) : (
          <Chapters chapters={chapters} />
        )}
      </DndContext>
    </div>
  );
};

export default ChaptersDnd;
