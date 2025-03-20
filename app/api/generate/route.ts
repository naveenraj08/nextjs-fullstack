import { chatSession } from "@/app/prompts/generative";
import { NextResponse } from "next/server";

// Handle POST requests
export async function POST(req, res) {
  try {
    const postTitle = await req.json();

    if (!postTitle) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 }); // Bad Request
    }
    const result = await chatSession.sendMessage(
      `Optimize the SEO for the title ${postTitle} and generate a catchy title for the post.`
    );
    return NextResponse.json(result.response.text(), { status: 200 }); // Successful response
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    ); // Internal Server Error
  }
}
