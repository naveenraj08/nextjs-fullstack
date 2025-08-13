"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse, shortenSlug } from "./utils";
import { client } from "@/sanity/lib/client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session || !session.user?.id) {
    return parseServerActionResponse({
      error: "Not signed in or invalid session",
      status: "ERROR",
    });
  }

  const userId = session.user.id.toString();

  const user = await client.withConfig({ useCdn: false }).fetch(
    `*[_type == "author" && id == $id]`,
    { id: userId }
  );

  if (!user || user.length === 0) {
    return parseServerActionResponse({
      error: "User not found in Sanity",
      status: "ERROR",
    });
  }

  const formData = Object.fromEntries(form);

  const title = formData.title ? String(formData.title) : "";
  if (!title) {
    return parseServerActionResponse({
      error: "Title is required",
      status: "ERROR",
    });
  }

  const slug = slugify(title, { lower: true, strict: true });
  const shortenedSlug = shortenSlug(slug, 50);

  let poster;
  if (formData.image && formData.image instanceof File && formData.image.size > 0) {
    const buffer = Buffer.from(await formData.image.arrayBuffer());
    const uploadedImage = await writeClient.assets.upload("image", buffer);
    poster = {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: uploadedImage._id,
      },
    };
  }

  try {
    const startup = {
      title,
      description: formData.description || "",
      category: formData.category || "",
      ...(poster && { poster }), // only add poster if it exists
      slug: {
        _type: "slug",
        current: shortenedSlug,
      },
      author: {
        _type: "reference",
        _ref: user[0]._id,
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
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
