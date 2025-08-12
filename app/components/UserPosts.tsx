import Image from "next/image";
import Link from "next/link";
import { formateDate } from "../lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Author, Startup } from "@/sanity/types";
import { Card, CardContent } from "@/components/ui/card";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const UserPosts = ({ post }: { post: StartupTypeCard }) => {
  const { image, title, poster, _createdAt, views, _id } = post;

  return (
    <li className="w-full">
      <Card className="w-full mx-auto bg-white max-w-sm !py-0">
        <CardContent className="!p-4">
          <div className="w-full rounded-md overflow-hidden block">
            <Link href={`/startup/${_id}`} className="block ">
              <Image
                src={poster?.asset?.url ? poster?.asset?.url : "/post-placeholder.png"}
                alt={title}
                className="max-h-[140px] w-full min-h-[140px] object-cover"
                width="180"
                height="180"
              />
            </Link>
          </div>

          <div className="actions flex justify-start items-center gap-5 text-sm my-2">
            <p className="text-gray-400 text-xs">{formateDate(_createdAt)}</p>
            <p className="text-gray-400 text-xs inline-flex items-center gap-1">
              <EyeIcon className="size-4" />
              <span>{views}</span>
            </p>
          </div>
          <div>
            <h2 className="text-left leading-[1]">
              <Link href={`/startup/${_id}`} className="text-sm font-semibold line-clamp-2">
                {title}
              </Link>
            </h2>
          </div>
        </CardContent>
      </Card>
    </li>
  );
};
