"use client";

import { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Chapters from "./Chapters";
import { DndChapterType } from "@/main.types";
import { arrayMove } from "@dnd-kit/sortable";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChaptersDndProps {
  courseId: string | undefined;
}

const ChaptersDnd = ({ courseId }: ChaptersDndProps) => {
  const [chapters, setChapters] = useState<DndChapterType[]>([]);
  const [isGetChaptersLoading, setIsGetChaptersLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );

  const getAllChapters = async () => {
    try {
      setIsGetChaptersLoading(true);
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
      setIsGetChaptersLoading(false);
    } catch (error) {
      console.log(error);
      setIsGetChaptersLoading(false);
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
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        {isPending && (
          <div className="absolute inset-0 w-full h-full bg-sky-500/50 flex items-center justify-center z-20 rounded-md">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}
        {!isGetChaptersLoading && chapters.length === 0 ? (
          <div className="text-base text-slate-600 font-semibold">
            No Chapters Available
          </div>
        ) : (
          <>
            {isGetChaptersLoading ? (
              <div className="flex flex-col gap-2">
                {[0, 1, 2, 3].map((item) => (
                  <ChapterSkeleton key={item} />
                ))}
              </div>
            ) : (
              <Chapters chapters={chapters} />
            )}
          </>
        )}
      </DndContext>
    </div>
  );
};

const ChapterSkeleton = () => {
  return (
    <div className="flex items-center justify-between space-x-4 px-2 py-0.5">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-36" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
};

export default ChaptersDnd;
