"use client";

import { Dispatch, SetStateAction, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createChapter } from "@/actions/teacherAction";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AddChapterFormProps {
  courseId: string | undefined;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const createChapterSchema = z.object({
  name: z
    .string()
    .min(3, "Chapter name is too short.")
    .max(50, "Chapter name is too long."),
});

const AddChapterForm = ({ courseId, setIsEditing }: AddChapterFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const addChapterForm = useForm<z.infer<typeof createChapterSchema>>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof createChapterSchema>) {
    startTransition(async () => {
      const res = await createChapter(courseId as string, values.name);

      if (res.success) {
        setIsEditing(false);
      } else {
      }
      toast({ description: res.message });
    });
  }

  return (
    <div>
      <Form {...addChapterForm}>
        <form
          onSubmit={addChapterForm.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <FormField
            control={addChapterForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter chapter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddChapterForm;
