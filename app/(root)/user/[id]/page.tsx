import { Post, StartupTypeCard } from "@/app/components/Post";
import UserProfile from "@/app/components/UserProfile";
import { auth } from "@/auth";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY });

  const session = await auth();

  console.log(session?.user);

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
              Sorry! No posts found...
            </li>
          )}
        </ul>
      </main>
      <aside className="max-w-[375px] w-full sticky top-5 z-10 bg-white rounded-lg overflow-hidden border border-gray-100">
        <UserProfile user={session?.user} />
      </aside>
    </div>
  );
};

export default page;
