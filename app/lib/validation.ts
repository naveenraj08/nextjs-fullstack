import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100),
  description: z.string().min(10, "Description is too short").max(500),
  category: z.string().min(3, "Category is required").max(20),
  image: z
    .any()
    .optional()
    .refine((file) => file.size < 2 * 1024 * 1024, "Image must be less than 2MB") // 2MB limit
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, and WEBP images are allowed"
    ),
  pitch: z.string().min(10, "Pitch must have at least 10 characters"),
});
