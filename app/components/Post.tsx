import Image from "next/image";
import Link from "next/link";
import { formateDate, formateName } from "../lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";

export const Post = ({ post }: { post: StartupTypeCard }) => {
  const {
    image,
    title,
    _createdAt,
    views,
    author: { _id: authorId, name },
    _id,
    description,
    category,
  } = post;

  return (
    <li>
      <div className="w-full p-4 bg-white space-y-5 border border-gray-100 rounded-post-card shadow-post-card duration-300 ease-in-out group">
        <div className="w-full rounded-md  overflow-hidden block">
          <Link href={`/post/${_id}`} className="block">
            <Image
              src={image}
              alt={title}
              className="w-full transition-all duration-300 ease-in-out group-hover:scale-105"
              width="540"
              height="540"
            />
          </Link>
        </div>

        <div className="actions flex justify-start items-center gap-5">
          <p className="text-gray-400 text-sm">{formateDate(_createdAt)}</p>
          <p className="text-gray-400 text-sm inline-flex items-center gap-1">
            <EyeIcon className="size-5" />
            <span>{views}</span>
          </p>
        </div>

        <div>
          <h2 className="text-xl text-left font-semibold">
            <Link href={`/details/${_id}`} className="text-xl font-semibold">
              {title}
            </Link>
          </h2>
          <p className="text-sm text-gray-600 text-left mt-2 line-clamp-2">{description}</p>
        </div>

        <div className="text-left pt-5">
          <Link
            href={`user/${authorId}`} title={name}
            className="text-sm text-gray-600 inline-flex items-center gap-2"
          >
            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 font-medium text-gray-800">
              {formateName(name)}
            </span>
          </Link>
        </div>
      </div>
    </li>
  );
};
