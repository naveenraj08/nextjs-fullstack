import { AlertLogin } from "@/app/components/AlertLogin";
import { auth } from "@/auth";
import React from "react";
import { Metadata } from "next";
import UserResgistration from "@/app/components/UserResgistration";
import { AskAiForm } from "@/app/components/AskAiForm";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create a New Post",
  description: "Write and publish a new post on our platform.",
  keywords: ["blog", "post", "create post", "publish", "content writing"],
  openGraph: {
    title: "Create a New Post",
    description: "Write and publish a new post on our platform.",
    url: "https://yourwebsite.com/create-post",
    siteName: "Your Website",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a New Post",
    description: "Write and publish a new post on our platform.",
  },
};

const page = async () => {
  const session = await auth();

  console.log("Session data:", session);

  if (!session) {
    redirect("/user/login");
  }

  return (
    <div className="space-y-10 min-h-[calc(100vh-110px)] flex flex-col items-center justify-center">
      <AskAiForm />
    </div>  
  );
};

export default page;
