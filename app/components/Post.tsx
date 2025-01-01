import Image from "next/image";
import Link from "next/link";
import { formateDate } from "../lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";

export const Post = ({ post }: { post: StartupTypeCard }) => {
  return (
    <li>
      <div className="w-full p-4 bg-white border border-gray-100 rounded-post-card shadow-post-card duration-300 ease-in-out group">
        <div className="w-full overflow-hidden block">
          <Image
            src={post?.image}
            alt={post?.title}
            className="w-full rounded-md transition-all duration-300 ease-in-out group-hover:scale-105"
            width="540"
            height="540"
          />
        </div>

        <div className="py-4 space-y-2 text-left">
          <h2 className="text-xl font-semibold">{post?.title}</h2>
          <p className="text-gray-600">{post?.description}</p>

          <div className="actions flex justify-between items-center gap-5 pt-4">
              <p className="text-gray-400 text-sm">
                {formateDate(post?._createdAt)}
              </p>
              <p className="text-gray-600 text-sm inline-flex items-center gap-1">
                <EyeIcon className="size-5"/>
                <span>{post?.views}</span>
              </p>
          </div>
        </div>
      </div>
    </li>
  );
};
