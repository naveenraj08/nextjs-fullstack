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

  if (!session || !session.user?.id) {
    return parseServerActionResponse({
      error: "Not signed in or invalid session",
      status: "ERROR",
    });
  }

  // Fetch the user document from Sanity
  const userId = session.user.id.toString();

  const user = await client.withConfig({ useCdn: false }).fetch(
    `*[_type == "author" && id == $id]`, // Query to find user
    { id: userId }
  );

  if (!user) {
    return parseServerActionResponse({
      error: "User not found in Sanity",
      status: "ERROR",
    });
  }

  const formData = Object.fromEntries(form);

  if (!formData.image) {
    return parseServerActionResponse({
      error: "Image file is required",
      status: "ERROR",
    });
  }

  // Convert file to Buffer and upload to Sanity
  const buffer = Buffer.from(await formData.image.arrayBuffer());
  const uploadedImage = await writeClient.assets.upload("image", buffer);

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
      image: uploadedImage.url,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: user.length > 0 ? user[0]._id : null,
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
