import Image from "next/image";
import Link from "next/link";
import { formateDate } from "../lib/utils";

export const Post = ({ post }: { post: StartupTypeCard }) => {
  return (
    <li>
     <div className="w-full p-4 bg-white border border-gray-100 rounded-lg shadow-md duration-300 ease-in-out">
        <Image src={post?.image} alt={post?.title} className="w-full rounded-lg" width="540" height="540" />
        <div className="p-4">
            <h2 className="text-xl font-semibold">{post?.title}</h2>
            <p className="text-gray-600">
                {post?.description}
            </p>
        </div>
    </div>
    </li>
  );
};
