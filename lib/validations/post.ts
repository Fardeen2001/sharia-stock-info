import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().min(1),
  content: z.string().min(1),
  image: z.string().url(),
});

export type PostFormValues = z.infer<typeof postSchema>;