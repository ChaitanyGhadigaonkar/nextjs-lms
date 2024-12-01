import { z } from "zod";

const CreateCourseSchema = z.object({
  name: z
    .string()
    .min(3, "course name length should be greater than 3")
    .max(40, "course name is too long."),
});
export default CreateCourseSchema;
