"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "../lib/validation";
import { Send } from "lucide-react";
import { z } from "zod";
import { createPitch } from "../lib/actions";
import { useRouter } from "next/navigation";

export const PostForm = () => {
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      return {
        ...prevState,
        error: "An Unexpected error has occurred",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="post-form space-y-5 mx-auto max-w-xl px-2 sm:px-6 py-5 lg:px-8 bg-white rounded-md border border-gray-100"
    >
      <h1 className="my-5 text-center text-xl font-semibold text-gray-900">
        Create Post
      </h1>
      <div>
        <label
          htmlFor="title"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Title
        </label>
        <Input
          name="title"
          title="Startup Title"
          className="input-text block w-full mt-2 rounded-md border-0 h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          id="title"
        />
        {errors.title && (
          <p className="mt-2 text-red-600 inline-block bg-red-50 px-4 py-1 rounded-md text-xs">
            {errors.title}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Description
        </label>
        <Textarea
          name="description"
          title="Startup Description"
          className="input-text block w-full mt-2 rounded-md border-0  h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          id="description"
        />

        {errors.description && (
          <p className="mt-2 text-red-600 inline-block bg-red-50 px-4 py-1 rounded-md text-xs">
            {errors.description}
          </p>
        )}
      </div>

      {}
      <div>
        <label
          htmlFor="category"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Category
        </label>
        <Input
          name="category"
          title="Category"
          className="input-text block w-full mt-2 rounded-md border-0  h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          id="category"
        />

        {errors.category && (
          <p className="mt-2 text-red-600 inline-block bg-red-50 px-4 py-1 rounded-md text-xs">
            {errors.category}
          </p>
        )}
      </div>

      {}
      <div>
        <label
          htmlFor="link"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Image URL
        </label>
        <Input
          title="Link"
          name="image"
          className="input-text block w-full mt-2 rounded-md border-0  h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          id="link"
        />

        {errors.link && (
          <p className="mt-2 text-red-600 inline-block bg-red-50 px-4 py-1 rounded-md text-xs">
            {errors.link}
          </p>
        )}
      </div>

      {}
      <div>
        <label
          htmlFor="message"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Message
        </label>
        <MDEditor
          value={pitch}
          height="200px"
          preview="edit"
          className="mt-2"
          id="message"
          onChange={(value) => setPitch(value ?? "")}
        />

        {errors.pitch && (
          <p className="mt-2 text-red-600 inline-block bg-red-50 px-4 py-1 rounded-md text-xs">
            {errors.pitch}
          </p>
        )}
      </div>

      {}

      <div className="text-center py-5">
        <button
          type="submit"
          disabled={isPending}
          className="relative rounded-lg bg-black text-white h-11 px-10 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <span
            className={`inline-flex items-center transition duration-200 ${isPending ? "opacity-0" : "opacity-100"}`}
          >
            Create
            <Send className="size-4 ml-2" />
          </span>
          <span
            className={`absolute flex justify-center items-center top-0 left-0 w-full h-full transition duration-200 ${isPending ? "opacity-100 z-10" : "opacity-0 -z-10"}`}
          >
            <span className="w-6 h-6 inline-block border-2 border-white border-r-transparent rounded-full animate-spin"></span>
          </span>
        </button>
      </div>
    </form>
  );
};
