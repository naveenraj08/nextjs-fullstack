"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export const PostForm = () => {

  const [pitch, setPitch] = useState("**Hello world!!!**");

  return (
    <form
      action={() => {}}
      className="post-form space-y-5 mx-auto max-w-lg px-2 sm:px-6 py-5 lg:px-8 bg-white rounded-md border border-gray-100"
    >
      <h1 className="my-5 text-center text-xl font-semibold text-gray-900">Create Post</h1>
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
      </div>
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
      </div>
      <div>
        <label
          htmlFor="link"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Image URL
        </label>
        <Input title="Link" className="mt-2 text-sm text-gray-800" id="link" />
      </div>
      <div>
        <label
          htmlFor="title"
          className="post-form-title font-medium text-xs text-gray-500"
        >
          Title
        </label>
        <MDEditor value={pitch} onChange={setPitch} />
      </div>
    </form>
  );
};
