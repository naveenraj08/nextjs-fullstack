"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const formData = Object.fromEntries(form);
  const title = formData.title ? String(formData.title) : "";

  if (!title)
    return parseServerActionResponse({
      error: "Title is required",
      status: "ERROR",
    });

  const slug = slugify(title, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
