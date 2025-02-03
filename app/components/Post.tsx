import Image from "next/image";
import Link from "next/link";
import { formateDate, formateName } from "../lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const Post = ({ post }: { post: StartupTypeCard }) => {
  const {
    image,
    title,
    _createdAt,
    views,
    author,
    _id,
    description,
  } = post;

  return (
    <li className="w-full p-4 bg-white flex flex-col items-start justify-start space-y-5 border border-gray-100 rounded-post-card shadow-post-card duration-300 ease-in-out group">
        <div className="w-full rounded-xl overflow-hidden block">
          <Link href={`/startup/${_id}`} className="block ">
            <Image
              src={image}
              alt={title}
              className="w-full transition-all duration-300 ease-in-out group-hover:scale-105 min-h-[230px] object-cover"
              width="360"
              height="230"
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
            <Link href={`/startup/${_id}`} className="text-xl font-semibold">
              {title}
            </Link>
          </h2>
          <p className="text-sm text-gray-600 text-left mt-2 line-clamp-2">{description}</p>
        </div>

        <div className="text-left pt-5 flex-1 flex items-end">
          <Link
            href={`/user/${author?._id}`} title={author?.name}
            className="text-sm text-gray-600 inline-flex items-center"
          >
            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 font-medium text-gray-800">
              {formateName(author?.name ?? '')}
            </span>
          </Link>
        </div>
    </li>
  );
};
