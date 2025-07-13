import { chatSession } from "@/app/prompts/generative";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = body.action;



  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  switch (action) {
    case 'seotitle': {
      const result = await chatSession.sendMessage(
        `
        You are given some post content or metadata. It may be a string, an object, or an array. Your task is:
        1. Extract the best possible title or heading.
        2. Optimize it for SEO.
        3. Generate 1 catchy title for a blog post.

        Input:
        ${body.content}
        `
      );
      return NextResponse.json(result.response.text(), { status: 200 });
    }
    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
