import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_EMAIL } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";


export async function POST(req: NextRequest) {
    try {
        const userData = await req.json();
        const { name, email, password } = userData;
        const hash = await bcrypt.hash(password, 10);
        const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_EMAIL, { email });

        if (existingUser.length < 1) {
            const newAuthor = await writeClient.create({
                _type: "author",
                _id: `author-${Date.now().toString(36)}`,
                id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
                name,
                email,
                password: hash
            });
            return NextResponse.json({ message: "Success" }, { status: 200 });
        }
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }
    catch (err) {
        return NextResponse.json({ error: "Something went wrong.." }, { status: 400 })
    }
} 