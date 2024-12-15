"use client";

import { useEffect } from "react";

interface ChaptersDndProps {
  courseId: string | undefined;
}

const ChaptersDnd = ({ courseId }: ChaptersDndProps) => {
  // const getAllChapters = async () => {
  //   const response = await fetch(`/api/chapters/${courseId}`);
  //   const data = await response.json();
  //   console.log(data);
  // };
  // useEffect(() => {
  //   getAllChapters();
  // }, [courseId]);
  return <div className="">Chapters Dnd</div>;
};

export default ChaptersDnd;
