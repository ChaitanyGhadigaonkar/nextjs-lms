"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateCourseSchema from "@/app/schema/CreateCourseSchema";
import { useRouter } from "next/navigation";
import { CreateCourseAction } from "@/actions/teacherAction";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const CreateCourseForm = () => {
  const router = useRouter();
  const toast = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof CreateCourseSchema>) => {
    startTransition(async () => {
      const res = await CreateCourseAction(values.name);

      if (res.success) {
        toast.toast({
          description: "Course Created Successfully.",
        });
        const course = res.data?.course;
        router.push(`/teacher/courses/${course?.courseId}`);
      } else {
        toast.toast({
          description: res.message,
        });
      }
    });
  };
  return (
    // <FormProvider {...form}>
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-2 flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter course name" {...field} />
              </FormControl>
              <FormDescription>
                what will you teach in this course?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"default"}
          className="mr-auto flex justify-center w-20 "
          disabled={isPending}
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
        </Button>
      </form>
    </FormProvider>
    // </FormProvider>
  );
};

export default CreateCourseForm;
