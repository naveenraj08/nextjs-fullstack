import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100),
  description: z.string().min(10, "Description is too short").max(500),
  category: z.string().min(3, "Category is required").max(20),
  image: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10, "Pitch must have at least 10 characters"),
});
