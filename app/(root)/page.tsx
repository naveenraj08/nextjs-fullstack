import Link from "next/link";
import { SearchForm } from "../components/SearchForm";
import { Post } from "../components/Post";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 1,
        name: 'Naveen Raj'
      },
      _id: 1,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Curabitur nec purus et lorem viverra tincidunt. Aliquam erat volutpat. In hac habitasse platea dictumst. Etiam malesuada augue eget lorem varius, sed pharetra arcu hendrerit. Proin ac tristique ligula. Morbi tincidunt libero sed erat varius, id faucibus ipsum lobortis.",
      image:
        "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Robots",
      title: "We Robots",
    },
  ];

  return (
    <div className="divide-y divide-gray-100">
      <section className="bg-white dark:bg-gray-900">
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
          <h1 className="mb-4 text-5xl max-w-4xl mx-auto font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl">
            Unlock a World of Insight & Inspiration
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
          <p className="text-2xl text-gray-800 text-left font-semibold mb-6 pb-5">
            {query ? `"Search results for ${query}"` : "Recommended Post"}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post) => <Post post={post} key={post?._id} />)
            ) : (
              <li className="col-span-1 md:col-span-2 xl:col-span-3 text-lg font-medium">
                Sorry! No posts found...
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
