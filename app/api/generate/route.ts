import { chatSession } from "@/app/prompts/generative";
import { NextResponse, NextRequest } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = body.action;


  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  switch (action) {
    case 'getPost': {
      const result = await chatSession.sendMessage(
        `
        You are a professional blog content generator.  
        Your task is to generate a fully SEO-optimized blog post based on the given topic, keyword, or content snippet.  
        Your response must return a VALID JSON object without any syntax errors, and nothing else should be included in the output.

        Format:
        {
          "title": "",
          "description": "",
          "tags": "",
          "media": {
            "type": "url",
            "value": ""
          },
          "content": ""
        }

        Input:
        ${body.content}

        Guidelines:
        - Only return a valid JSON object (no markdown code blocks, no commentary).
        - 'title' must be keyword-rich and attention-grabbing.
        - 'description' should be concise (150–160 characters) and engaging.
        - 'tags' must be a single SEO keyword within (10-20) characters.
        - 'media.value' Attractive, beautiful image URL based on the blog title. No prompts, no descriptions — only a valid image URL.
        - 'content' should be 600–1200 words in markdown format.
        - Include:
          - Introduction
          - Multiple sections using ### headings
          - Practical examples
          - Conclusion with a CTA

        Important:
        ⚠️ Do not include any explanation, notes, or non-JSON text. Return valid JSON ONLY with any syntax error.
        `
      );

      let parsedResult;
      try {
        parsedResult = JSON.parse(result.response.text());
      } catch (err) {
        console.error("Failed to parse AI response:", err);
        return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      }
    
      return NextResponse.json(parsedResult, { status: 200 });
    }

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
