import Image from "next/image";
import Link from "next/link";
import { formateDate, formateName } from "../lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Author, Startup } from "@/sanity/types";
import { Card, CardContent } from "@/components/ui/card";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const Post = ({ post }: { post: StartupTypeCard }) => {
  const {
    poster,
    title,
    _createdAt,
    views,
    slug
  } = post;


  return (
    <Card className="w-full max-w-sm bg-white">
      <CardContent>
        <div className="w-full rounded overflow-hidden block">
          <Link href={`/startup/${slug?.current}`} className="block mb-4">
            <Image
              src={poster?.asset?.url ? poster?.asset?.url : "/post-placeholder.png"}
              alt={title}
              className="max-h-[230px] w-full min-h-[230px] object-cover"
              width="360"
              height="230"
            />
          </Link>
        </div>

        <div className="actions flex justify-start items-center gap-5 mb-2">
          <p className="text-gray-500 text-sm">{formateDate(_createdAt)}</p>
          <p className="text-gray-500 text-sm inline-flex items-center gap-1">
            <EyeIcon className="size-5" />
            <span>{views}</span>
          </p>
        </div>

        <div className="flex-1">
          <h2 className="text-xl text-left font-semibold line-clamp-2">
            <Link
              href={`/startup/${slug?.current}`}
              className="text-xl font-semibold"
            >
              {title}
            </Link>
          </h2>
        </div>
      </CardContent>
    </Card>

  );
};
