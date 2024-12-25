import Link from "next/link";
import { SearchForm } from "../components/SearchForm";

export default function Home() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto text-center lg:py-16 lg:px-12">
          <Link
            href="#"
            className="inline-flex justify-between items-center ring-1 ring-gray-200 p-2 px-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full"
            role="alert"
          >
            <span className="text-sm font-medium">Announcement goes here! 👏</span>
          </Link>
          <h1 className="mb-4 text-5xl max-w-4xl mx-auto font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl">
            Unlock a World of Insight & Inspiration
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl">
            Discover stories, tutorials, and expert advice crafted to empower
            your journey.
          </p>
          <div className="flex flex-col mt-8 lg:mt-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <SearchForm />
          </div>
        </div>
      </section>
    </div>
  );
}
