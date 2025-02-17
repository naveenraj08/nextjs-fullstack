import Image from "next/image";
import Link from "next/link";
import { formateDate } from "../lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const UserPosts = ({ post }: { post: StartupTypeCard }) => {
  const { image, title, _createdAt, views, _id } = post;

  return (
    <li className="w-full p-4 bg-white flex flex-col items-start justify-start space-y-3 border border-gray-200 rounded-md duration-300 ease-in-out group">
      <div className="w-full rounded-md overflow-hidden block">
        <Link href={`/startup/${_id}`} className="block ">
          <Image
            src={image}
            alt={title}
            className="max-h-[140px] w-full min-h-[140px] object-cover"
            width="180"
            height="180"
          />
        </Link>
      </div>

      <div className="actions flex justify-start items-center gap-5 text-sm">
        <p className="text-gray-400 text-xs">{formateDate(_createdAt)}</p>
        <p className="text-gray-400 text-xs inline-flex items-center gap-1">
          <EyeIcon className="size-4" />
          <span>{views}</span>
        </p>
      </div>
      <div>
        <h2 className="text-left leading-normal">
          <Link href={`/startup/${_id}`} className="text-sm font-semibold">
            {title}
          </Link>
        </h2>
      </div>
    </li>
  );
};
