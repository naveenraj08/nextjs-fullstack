"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formateDate } from "../lib/utils";

interface Post {
  title: string;
  image: string;
  _createdAt: string;
  slug: { current: string };
}

export const RecentPosts = ({ post }: { post: Post }) => {
  const { title, poster, _createdAt, slug } = post;
  return (
    <li>
      <Link
        href={`/startup/${slug?.current}`}
        className="p-3 rounded-md flex items-center gap-4 w-full text-sm transition duration-200 hover:bg-gray-100"
      >
        <span>
          <Image
            src={poster?.asset?.url ? poster?.asset?.url : "/post-placeholder.png"}
            alt={title}
            className="w-12 h-12 rounded-md max-w-[48px] max-h-[48px] object-cover object-center"
            width="40"
            height="48"
          />
        </span>
        <span className="block">
          {title}
          <span className="text-xs inline-flex items-center gap-1 mt-2 text-[#7D838F] w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 relative bottom-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {formateDate(_createdAt)}
          </span>
        </span>
      </Link>
    </li>
  );
};
