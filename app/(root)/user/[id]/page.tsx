import { auth } from "@/auth";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const session = await auth();

  console.log(session?.user);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
    </div>
  );
};

export default page;
