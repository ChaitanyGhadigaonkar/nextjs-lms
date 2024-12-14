"use client";
import { useState, useTransition } from "react";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UpdateCourseDescriptionAction } from "@/actions/teacherAction";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const descriptionFormSchema = z.object({
  description: z.string().max(100, "title must be at least 50 character long."),
});
type CourseDescriptionFormProps = {
  description: string | null | undefined;
};

const CourseDescriptionForm = ({ description }: CourseDescriptionFormProps) => {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof descriptionFormSchema>>({
    resolver: zodResolver(descriptionFormSchema),
    defaultValues: {
      description: description || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof descriptionFormSchema>) => {
    setTransition(async () => {
      const res = await UpdateCourseDescriptionAction(
        params.courseId as string,
        values.description
      );
      if (res.success) {
        toast.toast({
          description: "Course Updated Successfully.",
        });
      } else {
        toast.toast({
          description: res.message,
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
        <h4 className="text-base font-medium ">Course Description</h4>

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
              <p className="text-sm">Edit description</p>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-base py-2">
          {!description ? (
            <span className="text-sm font-medium">No Description</span>
          ) : (
            description
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g, Learn complete Web Development with this amazing course."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {" "}
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

export default CourseDescriptionForm;
