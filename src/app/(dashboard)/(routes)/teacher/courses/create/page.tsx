import { getServerSession } from "next-auth";
import CreateCourseForm from "./_components/CreateCourseForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

const CreateCoursePage = async () => {
  const user = await getServerSession(authOptions);

  console.log(user?.user);
  return (
    <div className="flex flex-col max-w-5xl p-2 py-6 items-center gap-4">
      <div className="">
        <h1 className="font-semibold text-xl md:text-2xl">Name your course</h1>
        <p className="text-sm">
          what would you like to name your course? Don't worry you can change
          this later.
        </p>
        <CreateCourseForm />
      </div>
    </div>
  );
};

export default CreateCoursePage;
