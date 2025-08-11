"use server";

import { signIn } from "@/auth";
import { redirect } from "next/dist/server/api-utils";


export async function githubSignIn() {
    await signIn("github");
}

export async function googleSignIn() {
    await signIn("google");
}


export async function emailSignIn(formData: FormData) {
    const userData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const res = await signIn("credentials", {
        ...userData,
        redirect: false,
        redirectTo: "/startup/create"
    });

    if (res?.error) {
        return { error: res.error };
    }

    return { success: true };
}