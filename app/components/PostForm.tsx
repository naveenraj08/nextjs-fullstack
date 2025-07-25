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
import { title } from "process";

type TypeTextOptions = {
  ref?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  setState?: React.Dispatch<React.SetStateAction<string>>;
  speed?: number;
};


export const PostForm = ({ userRequest, showPlaceholder }: { userRequest: string }) => {
  const [pitch, setPitch] = useState("");
  const [postData, setPostData] = useState<any>({});

  const [showForm, setShowForm] = useState<boolean>(false);

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const taglineRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (userRequest) {

      fetchData(userRequest);
    }
  }, [userRequest]);

  useEffect(() => {

    if (postData !== null) {
      const { title, description, tags, media, content } = postData;
      if (titleRef.current && descriptionRef.current && taglineRef.current) {

        (async () => {
          await typeText(title, { ref: titleRef, speed: 1200 });
          await typeText(description, { ref: descriptionRef, speed: 1000 });
          await typeText(tags, { ref: taglineRef, speed: 800 });
          await typeText(content, { setState: setPitch, speed: 4000 });
        })();
      }
    }
  }, [postData]);


  const typeText = (
    text: string,
    { ref = null, setState = null, duration = 3000 }: TypeTextOptions = {}
  ): Promise<void> => {
    return new Promise((resolve) => {
      const totalChars = text.length;
      const startTime = performance.now();

      if (setState) setState('');
      if (ref?.current) ref.current.value = '';

      const type = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const charsToShow = Math.floor(totalChars * progress);

        const currentText = text.slice(0, charsToShow);

        if (setState) setState(currentText);
        if (ref?.current) ref.current.value = currentText;

        if (progress < 1) {
          requestAnimationFrame(type);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(type);
    });
  };

  const fetchData = async (userRequestTitle: string) => {
    try {
      const response =
        await fetch(`/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'getPost', content: userRequestTitle }),
        });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      const parsedData = JSON.parse(responseData);

      console.log("Parsed Data:", parsedData);
      console.log("Response Data:", responseData);

      setShowForm(true);
      showPlaceholder(false);
      setPostData(parsedData);
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
  if (showForm === true) {
    return (
      <form
        action={formAction}
        className="post-form w-full space-y-5 px-2 sm:px-6 py-5 lg:px-8 bg-white rounded-md border border-gray-100"
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
          <div className="flex items-center justify-start gap-5">
            <Input
              name="title"
              title="Startup Title"
              ref={titleRef}
              defaultValue={state.title}
              className="input-text block w-full mt-2 rounded-md border-0 h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              id="title"
            />
            {errors.title && (
              <p className="mt-2 text-red-600 inline-block rounded-md text-xs">
                {errors.title}
              </p>
            )}
          </div>
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
            ref={descriptionRef}
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
            ref={taglineRef}
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
            ref={fileInputRef}
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
      </ form>
    );
  }
};