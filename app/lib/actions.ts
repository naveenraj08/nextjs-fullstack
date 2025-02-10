"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();
    console.log("Session:", session);

    if (!session) return parseServerActionResponse({
        error: "Not Signed in",
        status: "ERROR"
    });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch'),
    );

    if (!title) {
        return parseServerActionResponse({
            error: "Title is required",
            status: "ERROR"
        });
    }

    const slug = slugify(title as string, { lower: true, strict: true });

    const startup = {
        _type: 'startup',
        title,
        description,
        category,
        image: link,
        slug: {
            _type: "slug", // Fixed _type
            current: slug
        },
        author: {
            _type: 'reference',
            _ref: session?.id
        },
        pitch,
    };

    console.log("Startup object:", startup);

    try {
        console.log("Sanity writeClient:", writeClient);

        const result = await writeClient.create(startup);

        console.log("Sanity create result:", result);

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        });

    } catch (error: any) {
        console.error("Sanity Create Error:", error.message, error.stack);
        return parseServerActionResponse({
            error: error.message || JSON.stringify(error),
            status: "ERROR"
        });
    }
};
