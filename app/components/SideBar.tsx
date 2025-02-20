import { client } from "@/sanity/lib/client";
import { GET_RECENT_POST } from "@/sanity/lib/queries";
import React from "react";
import { RecentPosts } from "./RecentPosts";
import Link from "next/link";

const SideBar = async () => {
  const fromTimeStampInMilliSec = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  );
  const fromTimeStamp = fromTimeStampInMilliSec.toISOString();

  const posts = await client.fetch(GET_RECENT_POST, { fromTimeStamp });

  return (
    <>
      <div className="text-lg text-blue-600 font-semibold p-5 pb-0">
        Recent Posts
      </div>
      <ul className="block p-2">
        {posts.length > 0 ? (
          posts.map((post: any) => <RecentPosts post={post} key={post?._id} />)
        ) : (
          <li className="text-sm font-medium">
            Sorry! No Post for this week? how about creating one
            <Link
              href={"/startup/create"}
              className="relative inline-block rounded-lg bg-blue-500 text-white px-5 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Post
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default SideBar;
