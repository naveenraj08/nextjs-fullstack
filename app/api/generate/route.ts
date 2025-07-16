import { chatSession } from "@/app/prompts/generative";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = body.action;


  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  switch (action) {
    case 'title': {
      const title = await chatSession.sendMessage(
        `
        You are a professional blog content generator.
        Your task is to generate an SEO-optimized, catchy blog post **title** based on the given topic, keyword, or content snippet.

        Input:
        ${body.content}

        Instructions:
        - The 'title' must be keyword-rich and attention-grabbing.
        - It should be concise, ideally between 50–60 characters.
        - Avoid clickbait; focus on clarity and relevance.
        - Tone: informative and engaging.
        - Your response must strictly follow this JSON structure.
        - Return **only the JSON object**. Do not include any extra text or explanation.

        Respond with:
        {
          "title": ""
        }

        `
      );

      const parsedResponse = JSON.parse(await title.response.text());
      return NextResponse.json(parsedResponse, { status: 200 });
    }

    case 'metaDescription': {
      const metaDescription = await chatSession.sendMessage(
        `
        You are a professional SEO content generator.
        Your task is to generate a concise, engaging, and SEO-optimized **meta description** (between 150–160 characters) for the given blog content.

        Input:
        ${body.content}

        Guidelines:
        - The description must summarize the core idea of the blog post.
        - Use natural, compelling language that encourages clicks.
        - Keep it within 150–160 characters.
        - Your response must strictly follow this JSON structure.
        - Return **only the JSON object**. Do not include any extra text or explanation.

        Respond with:
        {
          "metaDescription": "",
        }

        `
      );

      let parsedResponse = JSON.parse(await metaDescription.response.text());
      return NextResponse.json(parsedResponse, { status: 200 });
    }

    case 'metaTags': {
      const metaTags = await chatSession.sendMessage(
        `
        You are a professional SEO content generator.
        Your task is to generate **1 relevant tag or keyword** that improves discoverability.

        Input:
        ${body.content}

        Guidelines:
        - Your response must strictly follow this JSON structure.
        - Return **only the JSON object**. Do not include any extra text or explanation.

        Respond with:
        {
          "metaTags": "",
        }

        `
      );

      let parsedResponse = JSON.parse(await metaTags.response.text());
      return NextResponse.json(parsedResponse, { status: 200 });
    }

    // case 'media': {
    //   const media = await chatSession.sendMessage(
    //     `
    //     You are a professional media creator.
    //     A visually stunning representation of the '${body.content}', with glowing, interconnected nodes forming a dynamic, abstract network. Focus on energy flow, speed, and efficiency. Digital illustration, vibrant blues and greens, futuristic.

    //     Guidelines:
    //     - Your response must strictly follow this JSON structure.
    //     - Return **only the JSON object**. Do not include any extra text or explanation.

    //     Respond with:
    //     {
    //       "media": {
    //         "type": "url",
    //         "value": ""
    //       }
    //     }

    //     `
    //   );

    //   let parsedResponse = JSON.parse(await media.response.text());
    //   return NextResponse.json(parsedResponse, { status: 200 });
    // }

    case 'content': {
      const contentResponse = await chatSession.sendMessage(
        `
        You are a professional blog content generator.
        Your task is to write a full **SEO-optimized blog post** (600–1200 words) in markdown format based on the given input.

        Input:
        ${body.content}

        Guidelines:
        - Include a powerful introduction.
        - Use multiple sections with markdown headings (###).
        - Provide practical examples or insights.
        - Add **AI-generated images** wherever relevant inside the content to improve visual engagement. Use proper markdown image syntax: ![alt text](image-url).
        - Ensure all images are descriptive, relevant, and creatively represent the section topic.
        - End with a strong conclusion and call-to-action (CTA).
        - Maintain an informative and engaging tone.
        - Your response must strictly follow this JSON structure.
        - Return **only the JSON object**. Do not include any extra text or explanation.

        Respond with:
        {
          "content": ""
        }

        `
      );
      let parsedResponse = JSON.parse(await contentResponse.response.text());
      return NextResponse.json(parsedResponse, { status: 200 });
    }

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
