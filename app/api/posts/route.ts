import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

const PAGE_SIZE = 6;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || null;

    const params = {
        search,
        start: (page - 1) * PAGE_SIZE,
        end: page * PAGE_SIZE,
    };

    const { data } = await sanityFetch({ query: STARTUP_QUERY, params });
    return NextResponse.json(data);
}
