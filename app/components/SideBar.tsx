import { client } from "@/sanity/lib/client";
import { GET_RECENT_POST } from "@/sanity/lib/queries";
import React from "react";
import { RecentPosts } from "./RecentPosts";

interface Post {
  _id: string;
  title: string;
  image: string;
  _createdAt: string;
  slug: { current: string };
}

const SideBar = async () => {
  const fromTimeStampInMilliSec = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  );
  const fromTimeStamp = fromTimeStampInMilliSec.toISOString();

  const posts = await client.fetch(GET_RECENT_POST, { fromTimeStamp });

  return (
    <>
      {posts.length > 0 ? (
        <>
          <div className="text-lg text-[#EA4335] font-semibold p-5 pb-0">
            Recent Posts
          </div>
          <ul className="block p-2">
            {posts.map((post: Post) => (
              <RecentPosts post={post} key={post?._id} />
            ))}
          </ul>
        </>
      ) : (
        <div className="text-lg p-5 text-center font-bold">
          Sorry!{" "}
          <span className="font-normal text-gray-600 text-sm mt-2 block">
            We don&apos;t have posts for this week.
          </span>
        </div>
      )}
    </>
  );
};

export default SideBar;
