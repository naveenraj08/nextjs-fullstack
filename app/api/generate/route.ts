import { chatSession } from "@/app/prompts/generative";
import { NextResponse } from "next/server";

// Handle POST requests
export async function POST(req, res) {
  try {
    const resQ = await req.json();

    const result = await chatSession.sendMessage(
      `Provide the One Optimize the title: ${resQ}`
    );
    console.log(result.response.text());
    return NextResponse.json(result.response.text(), { status: 200 }); // Successful response
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    ); // Internal Server Error
  }
}
