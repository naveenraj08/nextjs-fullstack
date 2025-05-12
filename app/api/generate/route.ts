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
        `Optimize the SEO for the title ${body.content} and generate 1 catchy title for the post.`
      );
      return NextResponse.json(result.response.text(), { status: 200 });
    }

    case 'shorturl': {
      const resultUrl = await chatSession.sendMessage(
        `${body.content}, generate 1 shortened version of the slug for the post.`
      );
      return NextResponse.json(resultUrl.response.text(), { status: 200 });
    }
    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
