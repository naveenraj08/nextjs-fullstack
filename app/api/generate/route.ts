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
        You are a professional blog content generator.

        Your task is to generate a full SEO-optimized blog post based on the given topic, keyword, or content snippet. Your response must strictly follow this JSON structure:

        {
          "title": "",                // SEO-optimized, catchy blog post title
          "metaDescription": "",      // Concise, engaging summary (150–160 characters)
          "tags": "",                 // 1 relevant tag or keyword
          "media": {
            "type": "url",            // Always return a image URL (not a prompt )
            "value": ""               // Generate an AI image URL based on the blog title (visually descriptive)
          },
          "content": ""               // Full blog post content (600–1200 words), in markdown format
        }

        Input:
        ${body.content}

        Instructions:
        - The 'title' must be keyword-rich and attention-grabbing.
        - The 'metaDescription' should clearly describe the blog and boost click-through rates.
        - 'tags' should be relevant keywords that improve discoverability.
        - For 'media', generate a AI Image based on the title — make it creative and descriptive.
        - The 'content' must include:
          - A powerful introduction
          - Multiple sections with markdown headings (###)
          - Practical examples or insights
          - A conclusion with a strong call-to-action (CTA)
        - Tone: informative and engaging.

        ⚠️ Return **only the JSON object**, no extra text.
        `
      );
      return NextResponse.json(result.response.text(), { status: 200 });
    }
    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
