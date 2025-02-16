import { Post, StartupTypeCard } from "@/app/components/Post";
import UserProfile from "@/app/components/UserProfile";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID, GET_AUTHOR_POSTS } from "@/sanity/lib/queries";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const posts = await client.fetch(GET_AUTHOR_POSTS, { id });
  const author = await client.fetch(AUTHOR_BY_GITHUB_ID, { id });
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 py-5 lg:px-8 flex justify-start items-start gap-5">
      <main className="font-work-sans flex-1">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <Post post={post} key={post?._id} />
            ))
          ) : (
            <li className="col-span-1 md:col-span-2 xl:col-span-3 text-lg font-medium">
              Sorry! you have not posted yet...
            </li>
          )}
        </ul>
      </main>
      <aside className="max-w-[375px] w-full sticky top-5 z-10 bg-white rounded-lg overflow-hidden border border-gray-100">
        <UserProfile user={author} />
      </aside>
    </div>
  );
};

export default page;
