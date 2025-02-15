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
import { UpdateCoursePriceAction } from "@/actions/teacherAction";
import { useToast } from "@/hooks/use-toast";
import { Decimal } from "@prisma/client/runtime/library";
import { getIntlPrice } from "@/lib/utils";

const priceFormSchema = z.object({
  price: z.string(),
});

type CoursePriceFormType = {
  price: number | undefined | null;
};

const CoursePriceForm = ({ price }: CoursePriceFormType) => {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof priceFormSchema>>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      price: price ? String(price) : "",
    },
  });

  const handleSubmit = (values: z.infer<typeof priceFormSchema>) => {
    startTransition(async () => {
      const res = await UpdateCoursePriceAction(
        params.courseId as string,
        values.price
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
        <h4 className="text-base font-medium ">Course Price</h4>

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
              <p className="text-sm">Edit Price</p>
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-base py-2">
          {price && Number(price) > 0 ? getIntlPrice(Number(price)) : "Not Set"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" step={"0.01"} {...field} />
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

export default CoursePriceForm;
