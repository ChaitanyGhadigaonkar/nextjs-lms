"use client";
import { useEffect, useState, useTransition } from "react";
import { CirclePlus, ImageIcon, Loader2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Attachment } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import AttachmentComponent from "./Attachment";
import { Skeleton } from "@/components/ui/skeleton";

const AttachmentsFormSchema = z.object({
  files: z.array(
    z
      .instanceof(File)
      .refine(
        (file) => file.size < 2 * 1024 * 1024,
        "File size must be less than 2MB"
      )
  ),
});
const AttachmentsForm = () => {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isGetAttachmentsLoading, setIsGetAttachmentsLoading] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof AttachmentsFormSchema>>({
    resolver: zodResolver(AttachmentsFormSchema),
    defaultValues: {
      files: [],
    },
  });
  const { reset } = form;

  const handleSubmit = (values: z.infer<typeof AttachmentsFormSchema>) => {
    setTransition(async () => {
      try {
        // bad way
        for (let i = 0; i < values.files.length; i++) {
          const formData = new FormData();
          formData.append("file", values.files[i]);
          const response = await fetch(
            `/api/courses/${params.courseId}/attachments`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
        }
      } catch (error) {
        toast.toast({
          description: "Failed To Upload.",
        });
      }
      router.refresh();
    });
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsGetAttachmentsLoading(true);
        const response = await fetch(
          `/api/courses/${params.courseId}/attachments`
        );
        const data = await response.json();
        if (data.success) {
          setAttachments(data.attachments);
        }
        setIsGetAttachmentsLoading(false);
      } catch (error) {
        setIsGetAttachmentsLoading(false);
      }
    })();
  }, [refetchTrigger]);

  // https://github.com/shadcn-ui/ui/issues/2997
  useEffect(() => {
    reset({
      files: [],
    });
  }, [reset]);

  return (
    <div className="w-full flex flex-col gap-2 bg-blue-50 px-4 py-2 my-2 rounded-md md:gap-4">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-base font-medium ">Course Attachments</h4>

        <Button
          variant={"ghost"}
          className="flex items-center justify-center gap-2"
          onClick={() => toggleEditing()}
        >
          {isEditing ? (
            <p className="text-sm">Cancel</p>
          ) : (
            <>
              <CirclePlus size={16} />
              Add an attachment
            </>
          )}
        </Button>
      </div>

      {!isGetAttachmentsLoading && !isEditing && attachments.length === 0 && (
        <div>
          <p>No Attachments Yet</p>
        </div>
      )}
      {isGetAttachmentsLoading && !isEditing && (
        <div className="flex flex-col gap-1">
          {[0, 1, 2, 3].map((item) => (
            <AttachmentSkeleton key={item} />
          ))}
        </div>
      )}
      {!isEditing && attachments.length !== 0 && (
        <div className="w-full flex flex-col gap-2">
          {attachments.map((attachment) => (
            <AttachmentComponent
              attachment={attachment}
              key={attachment.attachmentId}
              setRefetchTrigger={setRefetchTrigger}
            />
          ))}
        </div>
      )}
      {isEditing && (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      {...field}
                      value={undefined}
                      onChange={(e) => {
                        const filesArray = Array.from(e.target.files || []);
                        field.onChange(filesArray);
                      }}
                    />
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
        </FormProvider>
      )}
    </div>
  );
};

const AttachmentSkeleton = () => {
  return (
    <div className="flex items-center justify-between space-x-4 px-2 py-0.5">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-36" />
      </div>
      <div className="">
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
};

export default AttachmentsForm;
