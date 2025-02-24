"use client";
import { UpdateChapterTitleAction } from "@/actions/chapter";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MODE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { totalmem } from "os";
import {
  FC,
  startTransition,
  useCallback,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const titleFormSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(3, "title is too short")
    .max(20, "title is too long"),
});

type ChapterTitleFormProps = { title: string | undefined };
const ChapterTitleForm: FC<ChapterTitleFormProps> = ({ title }) => {
  const [mode, setMode] = useState<MODE>(MODE.VIEW);

  const { courseId, chapterId } = useParams<{
    courseId: string;
    chapterId: string;
  }>();

  const router = useRouter();
  const toast = useToast();

  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof titleFormSchema>>({
    resolver: zodResolver(titleFormSchema),
    defaultValues: {
      title: title,
    },
  });

  const handleSumbit = useCallback(
    (values: z.infer<typeof titleFormSchema>) => {
      startTransition(async () => {
        if (form.formState.isDirty) {
          const res = await UpdateChapterTitleAction({
            title: values.title,
            courseId,
            chapterId,
          });
          if (res.success) {
            toast.toast({ description: res.message });
          } else {
            toast.toast({ description: "Failed to update chapter." });
          }
          setMode(MODE.VIEW);
          router.refresh();
        }
      });
    },
    []
  );

  const changeMode = useCallback((input: MODE) => {
    setMode(input);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 bg-blue-50 px-4 py-2 my-2 rounded-md md:gap-4">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-base font-medium ">Course Title</h4>

        <Button
          variant={"ghost"}
          className="flex items-center justify-center gap-2"
          onClick={() => {
            if (mode === MODE.VIEW) {
              changeMode(MODE.EDIT);
            } else {
              changeMode(MODE.VIEW);
            }
          }}
        >
          {mode === MODE.EDIT ? (
            <p className="text-sm">Cancel</p>
          ) : (
            <>
              <Pencil size={16} />
              <p className="text-sm">Edit title</p>
            </>
          )}
        </Button>
      </div>

      {mode === MODE.VIEW && <p className="text-base py-2">{title}</p>}

      {mode !== MODE.VIEW && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSumbit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Introduction" />
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
export default ChapterTitleForm;
