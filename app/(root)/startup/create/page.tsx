import { AlertLogin } from "@/app/components/AlertLogin";
import { PostForm } from "@/app/components/PostForm";
import { auth } from "@/auth";
import React from "react";
import { Metadata } from "next";
import UserResgistration from "@/app/components/UserResgistration";

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

  if (!session) {
    return <UserResgistration />;
  }

  return <PostForm />;
};

export default page;
