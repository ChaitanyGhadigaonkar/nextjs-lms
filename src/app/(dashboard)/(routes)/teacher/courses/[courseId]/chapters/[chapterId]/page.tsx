import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { LayoutDashboard, Trash } from "lucide-react";
import SectionHeader from "../../../../_components/SectionHeader";
import ChapterTitleForm from "./_components/ChapterTitleForm";

const Chapters = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const chapter = await db.chapter.findUnique({
    where: {
      chapterId: params.chapterId,
      courseId: params.courseId,
    },
  });

  const completedSectionCount = async () => {
    let count = 0;
    if (chapter) {
      if (chapter?.title?.length >= 0) {
        count++;
      }

      if (chapter?.description && chapter?.description?.length >= 0) {
        count++;
      }
      if (chapter?.video) {
        count++;
      }
      return count;
    }
  };

  const completedFields = await completedSectionCount();
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center md:flex-row md:justify-between">
        <div className="top">
          <h1 className="text-md font-semibold md:font-bold md:text-2xl md:mb-1">
            Chapter Setup
          </h1>
          <p className="text-sm text-slate-700">
            Complete all fields ({completedFields}/3)
          </p>
        </div>
        <div className="flex align-center gap-2 ml-auto md:justify-center">
          <Button variant={"ghost"}>
            <p>Unpublish</p>
          </Button>
          <Button variant={"default"} className="py-4">
            <Trash size={18} />
          </Button>
        </div>
      </div>
      <div className="flex-1 flex my-4 flex-col gap-2 md:flex-row">
        {/* left */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-2">
            <SectionHeader
              title="Customize your chapter"
              icon={LayoutDashboard}
            />
            <ChapterTitleForm title={chapter?.title} />
          </div>
        </div>
        {/* right  */}
        <div className="flex-1 px-2"></div>
      </div>
    </div>
  );
};

export default Chapters;
