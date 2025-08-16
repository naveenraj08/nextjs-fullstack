"use server";

import { signIn } from "@/auth";


export async function githubSignIn() {
    await signIn("github", {
        redirectTo: "/startup/create"
    });
}

export async function googleSignIn() {
    await signIn("google", {
        redirectTo: "/startup/create"
    });
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