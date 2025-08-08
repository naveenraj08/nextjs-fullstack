"use server";

import { signIn } from "@/auth";


export async function githubSignIn() {
    await signIn("github");
}

export async function googleSignIn() {
    await signIn("google");
}
