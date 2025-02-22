import { formateDate, formateName } from "@/app/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Views from "@/app/components/Views";
import RenderContent from "@/app/components/PreviewContent";

export const experimental_ppr = true;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });

  if (!post)
    return { title: "Not Found", description: "This page does not exist" };

  return {
    title: post?.title || "Blog Post",
    description:
      post?.description?.substring(0, 150) || "Read this interesting post.",
    openGraph: {
      title: post?.title,
      description: post?.description?.substring(0, 150),
      images: [
        {
          url: post?.image, // Sanity image URL
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
    },
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });
  console.log(post);

  if (!post) return notFound();

  return (
    <section className="bg-white border border-gray-100 dark:bg-gray-900 rounded-t-lg rounded-b-lg overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        className="w-full h-[370px] object-cover"
        width="1200"
        height="370"
      />
      <div className="p-5 lg:px-10">
        <div className="flex justify-between items-start gap-5">
          <div className="mb-8 inline-flex items-center gap-3 ">
            <Link
              href={`/user/${post?.author?._id}`}
              title={post?.author?.name}
              className="text-gray-800 font-medium"
            >
              <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 text-gray-800">
                {formateName(post?.author?.name ?? "")}
              </span>
            </Link>
            <p className="text-gray-800 inline-flex flex-col">
              <Link
                href={`/user/${post?.author?._id}`}
                title={post?.author?.name}
                className="text-gray-800 font-semibold"
              >
                {post?.author?.name}
              </Link>
              <span className=" text-xs text-gray-500 block">
                {formateDate(post?._createdAt)}
              </span>
            </p>
          </div>
          <div>
            <Views id={post?._id} />
          </div>
        </div>

        <h1 className="mb-5 text-xl max-w-4xl font-black tracking-tight leading-6 text-gray-900 md:text-2xl lg:text-4xl">
          {post.title}
        </h1>
        <p className="px-4 cursor-pointer inline-block py-1 font-medium text-sm bg-blue-50 text-blue-600 rounded-lg">
          #{post?.category}
        </p>
        <div className="mt-10">
          <RenderContent content={post?.pitch} />
        </div>
      </div>
    </section>
  );
};

export default Page;
