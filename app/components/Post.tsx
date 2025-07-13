import Image from "next/image";
import Link from "next/link";
import { formateDate, formateName } from "../lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const Post = ({ post }: { post: StartupTypeCard }) => {
  const { image, title, _createdAt, views, author, description, slug } = post;

  return (
    <li className="w-full p-4 bg-white flex flex-col h-full items-start justify-start space-y-5 border border-gray-100 rounded-post-card duration-300 ease-in-out">
      <div className="w-full rounded-xl overflow-hidden block">
        <Link href={`/startup/${slug?.current}`} className="block ">
          <Image
            src={image ? image : "/post-placeholder.png"}
            alt={title}
            className="max-h-[230px] w-full min-h-[230px] object-cover"
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

      <div className="flex-1">
        <h2 className="text-xl text-left font-semibold">
          <Link
            href={`/startup/${slug?.current}`}
            className="text-xl font-semibold"
          >
            {title}
          </Link>
        </h2>
      </div>
    </li>
  );
};
