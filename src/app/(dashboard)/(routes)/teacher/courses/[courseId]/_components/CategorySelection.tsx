"use client";
import { useState, useTransition } from "react";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateCourseCategoryAction } from "@/actions/teacherAction";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants";

const categoryFormSchema = z.object({
  category: z.enum(
    [
      "accounting",
      "computer science",
      "engineering",
      "filming",
      "fitness",
      "music",
      "photography",
    ],
    {
      message: "please select a category",
    }
  ),
});
type CategorySelectionType = {
  category: string | null | undefined;
};
const CategorySelection = ({ category }: CategorySelectionType) => {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();

  const [isPending, setTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
  });

  const handleSubmit = (values: z.infer<typeof categoryFormSchema>) => {
    setTransition(async () => {
      const res = await UpdateCourseCategoryAction(
        params.courseId as string,
        values.category
      );
      if (res.success) {
        toast.toast({
          description: "Course Update Successfully.",
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
        <h4 className="text-base font-medium ">Course Category</h4>

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
              <p className="text-sm">Edit category</p>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-base py-2">{category ? category : "No category"}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((item) => (
                        <SelectItem value={item.key} key={item.key}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategorySelection;
