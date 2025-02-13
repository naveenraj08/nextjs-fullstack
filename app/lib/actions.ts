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
    const existingAuthor = await writeClient.fetch(
      `*[_type == "author" && email == $email][0]`,
      { email: session?.user.email }
    );

    let authorId = existingAuthor?._id;

    // If author doesn't exist, create a new one
    if (!authorId) {
      const newAuthor = await writeClient.create({
        _type: "author",
        name: session?.user.name,
        email: session?.user.email,
      });

      authorId = newAuthor._id;
    }

    console.log(authorId);

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
        _ref: authorId,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    console.log(result);

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
