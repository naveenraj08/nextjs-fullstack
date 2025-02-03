import { formateDate, formateName } from "@/app/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });

  if (!post) return notFound();

  return (
    <section className="bg-white dark:bg-gray-900 py-5">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 space-y-5">
        <Image
          src={post.image}
          alt={post.title}
          className="w-full h-[540px] object-cover rounded-xl"
          width="1200"
          height="540"
        />
        <div className="block space-y-3">
          <Link
            href={`/user/${post?.author?._id}`}
            title={post?.author?.name}
            className="text-gray-800 inline-flex items-center gap-3 font-medium"
          >
            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 text-gray-800">
              {formateName(post?.author?.name ?? "")}
            </span>
            <span>{post?.author?.name}</span>
          </Link>
          <p className="text-gray-400 text-sm">
            {formateDate(post?._createdAt)}
          </p>
        </div>

        <h1 className="mb-4 text-xl max-w-4xl font-bold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl">
          {post.title}
        </h1>
      </div>
    </section>
  );
};

export default Page;
