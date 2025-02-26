import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js 15 API!" });
}
