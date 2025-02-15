"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";
import { client } from "@/sanity/lib/client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  console.log(session)

  if (!session || !session.user?.id) {
    return parseServerActionResponse({
      error: "Not signed in or invalid session",
      status: "ERROR",
    });
  }

  // Fetch the user document from Sanity
  const userId = session.user.id;
  const user = await client.withConfig({ useCdn: false }).fetch(
    `*[_type == "author" && id == $id][0]`, // Query to find user
    { id: userId }
  );

  if (!user) {
    return parseServerActionResponse({
      error: "User not found in Sanity",
      status: "ERROR",
    });
  }

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
        _ref: user._id,
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
