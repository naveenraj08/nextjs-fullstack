"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "../lib/validation";
import { Send } from "lucide-react";
import { z } from "zod";
import { createPitch } from "../lib/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const PostForm = () => {
  const [pitch, setPitch] = useState("");
  const [optimizeTitle, setOptimizeTitle] = useState("");
  const [optimizedTitle, setOptimizedTitle] = useState();
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const titleRef = useRef(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.includes("application")) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      image: formData.get("image") as File, // Use uploaded image URL,
      pitch,
    };

    try {
      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        router.push(`/startup/${result?.slug?.current}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return {
          ...prevState,
          ...formValues,
          error: "Validation failed",
          status: "ERROR",
        };
      }

      return {
        ...prevState,
        ...formValues,
        error: "An Unexpected error has occurred",
      };
    }
  };

  useEffect(() => {
    const title = optimizedTitle && optimizedTitle[0];
    const seo_optimized_titles = Array.isArray(title?.seo_optimized_titles)
      ? title.seo_optimized_titles
      : title?.seo_optimized_titles
        ? [title.seo_optimized_titles]
        : title?.seo_optimized_title
          ? [title.seo_optimized_title]
          : [];

    console.log(seo_optimized_titles);
    if (title !== undefined) {
      titleRef.current.value = seo_optimized_titles[0];
      setOptimizeTitle(seo_optimized_titles);
      titleRef.current?.focus();
    }
  }, [optimizedTitle]);

  const fetchData = async () => {
    try {
      const response =
        await fetch(`/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'seotitle', content: optimizeTitle }),
        });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setOptimizedTitle(JSON.parse(responseData));
    } catch (error) {
      console.error("Error posting data:", error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    title: "",
    description: "",
    category: "",
    image: null,
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
          ref={titleRef}
          onChange={(e) => setOptimizeTitle(e.target.value)}
          defaultValue={state.title}
          className="input-text block w-full mt-2 rounded-md border-0 h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          id="title"
        />
        <button
          type="button"
          className="text-xs mt-2 pl-2 pr-4 inline-flex items-center justify-start text-primary p-2 transition hover:bg-gray-100 rounded-md focus:ring-2 gap-2 focus:ring-offset-0 focus:ring-primary"
          onClick={fetchData}
          title="Optimize title"
        >
          <span>
            <svg
              stroke="#DFB722"
              fill="#DFB722"
              strokeWidth="1"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              ></path>
            </svg>
          </span>
          <span>Find better with AI</span>
        </button>
        {errors.title && (
          <p className="mt-2 text-red-600 inline-block rounded-md text-xs">
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
          defaultValue={state.description}
          className="input-text block w-full mt-2 rounded-md border-0  h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          id="description"
        />

        {errors.description && (
          <p className="mt-2 text-red-600 inline-block rounded-md text-xs">
            {errors.description}
          </p>
        )}
      </div>

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
          defaultValue={state.category}
          className="input-text block w-full mt-2 rounded-md border-0  h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          id="category"
        />

        {errors.category && (
          <p className="mt-2 text-red-600 inline-block rounded-md text-xs">
            {errors.category}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="image"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Upload image
        </label>
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          name="image"
          defaultValue={state.image}
          id="image"
          className="input-text block w-full mt-2 rounded-md border-0  h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        />
        {errors.image && (
          <p className="mt-2 text-red-600 inline-block rounded-md text-xs">
            {errors.image}
          </p>
        )}
        {preview && (
          <Image
            src={preview}
            alt={`Preview`}
            className="mt-5 rounded-md"
            width={510}
            height={120}
          />
        )}
      </div>
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
          <p className="mt-2 text-red-600 inline-block rounded-md text-xs">
            {errors.pitch}
          </p>
        )}
      </div>

      { }

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
