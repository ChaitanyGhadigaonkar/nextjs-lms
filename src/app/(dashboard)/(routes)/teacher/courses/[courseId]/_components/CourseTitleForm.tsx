"use client";
import { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateCourseTitleAction } from "@/actions/teacherAction";
import { useToast } from "@/hooks/use-toast";

const titleFormSchema = z.object({
  title: z.string().min(3, "title must be at least 3 character long."),
});

type CourseTitleFormType = {
  title: string | undefined;
};

const CourseTitleForm = ({ title }: CourseTitleFormType) => {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof titleFormSchema>>({
    resolver: zodResolver(titleFormSchema),
    defaultValues: {
      title: title ? title : "",
    },
  });

  const handleSubmit = (values: z.infer<typeof titleFormSchema>) => {
    startTransition(async () => {
      const res = await UpdateCourseTitleAction(
        params.courseId as string,
        values.title
      );
      if (res.success) {
        toast.toast({
          description: "Course Updated Successfully.",
        });
      } else {
        toast.toast({
          description: "Failed to update course title.",
        });
      }

      setIsEditing(false);
      router.refresh();
    });
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-2 bg-blue-50 px-4 py-2 my-2 rounded-md md:gap-4">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-base font-medium ">Course Title</h4>

        <Button
          variant={"ghost"}
          className="flex items-center justify-center gap-2"
          onClick={() => toggleEditing()}
        >
          {isEditing ? (
            <p className="text-sm">Cancel</p>
          ) : (
            <>
              <Pencil size={16} />
              <p className="text-sm">Edit title</p>
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-base py-2">{title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="e.g, Web Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "save"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CourseTitleForm;
