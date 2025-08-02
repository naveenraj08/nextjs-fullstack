import Link from "next/link";
import { SearchForm } from "@/app/components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PostListClient } from "@/app/components/PostListClient";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null, start: 0, end: 6 };

  const { data: initialPosts } = await sanityFetch({
    query: STARTUP_QUERY,
    params,
    config: { next: { revalidate: 10 } },
  });
  return (
    <>
      <div className="divide-y divide-gray-100">
        <section className="bg-white">
          <div className=" max-w-7xl mx-auto py-8 px-4 text-center lg:py-16 lg:px-12">
            <Link
              href="#"
              className="inline-flex justify-between items-center ring-1 ring-gray-200 p-2 px-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full"
              role="alert"
            >
              <span className="text-sm font-medium">
                Announcement goes here! 👏
              </span>
            </Link>
            <h1 className="mb-4 max-w-4xl mx-auto font-extrabold tracking-tight leading-none text-gray-900 text-5xl lg:text-7xl">
              Unlock a World of Insight &{" "}
              <span className="text-[#EA4335]">Inspiration</span>
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl">
              Discover stories, tutorials, and expert advice crafted to empower
              your journey.
            </p>
            <div className="flex flex-col mt-8 lg:mt-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <SearchForm query={query} />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto py-8 px-4 text-center lg:py-16 lg:px-12">
            <p className="text-2xl text-left font-semibold mb-6 pb-5">
              {query ? `Search results for "${query}"` : "Recommended Post"}
            </p>

            {initialPosts.length > 0 ? (
              <PostListClient initialPosts={initialPosts} query={query} />
            ) : (
              <p className="text-lg font-medium">Sorry! No posts found...</p>
            )}
          </div>
        </section>
      </div>

      <SanityLive />
    </>
  );
}
