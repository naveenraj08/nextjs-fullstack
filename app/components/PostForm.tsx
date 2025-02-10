"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "../lib/validation";

export const PostForm = () => {
  const [pitch, setPitch] = useState("**Hello world!!!**");
  const [errors, seterrors] = useState({});

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      console.log(formValues);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={() => {}}
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
          title="Startup Title"
          className="mt-2 text-sm text-gray-800"
          id="title"
        />
        {errors?.title && (
          <p className="mt-2 text-red-500 text-sm">{errors?.title}</p>
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
          title="Startup Description"
          className="mt-2 text-sm text-gray-800"
          id="description"
        />

        {errors?.description && (
          <p className="mt-2 text-red-500 text-sm">{errors?.description}</p>
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
          title="Category"
          className="mt-2 text-sm text-gray-800"
          id="category"
        />

        {errors?.category && (
          <p className="mt-2 text-red-500 text-sm">{errors?.category}</p>
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
        <Input title="Link" className="mt-2 text-sm text-gray-800" id="link" />

        {errors?.image && (
          <p className="mt-2 text-red-500 text-sm">{errors?.image}</p>
        )}
      </div>

      {}
      <div>
        <label
          htmlFor="title"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Title
        </label>
        <MDEditor
          value={pitch}
          height="200px"
          preview="edit"
          onChange={(value) => setPitch(value ?? "")}
        />

        {errors?.pitch && (
          <p className="mt-2 text-red-500 text-sm">{errors?.pitch}</p>
        )}
      </div>

      {}

      <div className="text-center py-5">
        <button
          type="submit"
          className="relative rounded-lg bg-black text-white px-5 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Create
        </button>
      </div>
    </form>
  );
};
