import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100),
  description: z.string().min(10, "Description is too short").max(500),
  category: z.string().min(3, "Category is required").max(20),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size < 2 * 1024 * 1024, // only validate if file exists
      "Image must be less than 2MB"
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/webp"].includes(file.type), // only validate if file exists
      "Only JPG, PNG, and WEBP images are allowed"
    ),
  pitch: z.string().min(10, "Pitch must have at least 10 characters"),
});



export const validateUserKeyword = z.string().regex(/^[A-Za-z][A-Za-z0-9 ]*$/, {
  message: "Must start with a letter and contain only letters, numbers, or spaces",
});


export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"
    )
});


export const validateUser = (userData: any) => {
  const result = userSchema.safeParse(userData);

  if (!result.success) {
    // Collect all validation errors
    const errors = result.error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    return { success: false, errors };
  }

  return { success: true, data: result.data };
};