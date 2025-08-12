"use client";

import { useEffect, useState } from "react";
import { Post, StartupTypeCard } from "./Post";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 6;

export function PostListClient({
    initialPosts,
    query,
}: {
    initialPosts: StartupTypeCard[];
    query?: string;
}) {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        setLoading(true);
        const res = await fetch(
            `/api/posts?search=${query || ""}&page=${page + 1}`,
        { cache: "no-store" });
        const newPosts = await res.json();

        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
        setHasMore(newPosts.length >= PAGE_SIZE);
        setLoading(false);
    }


    useEffect(() => {
        async function fetchPosts() {
            setPage(1);
            const res = await fetch(`/api/posts?search=${query || ""}&page=1`, { cache: "no-store" });
            const newPosts = await res.json();
            setPosts(newPosts);
            setHasMore(newPosts.length >= PAGE_SIZE);
        }

        fetchPosts();
    }, [query]);

    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {posts.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
            </ul>

            {hasMore && (
                <div className="mt-20">
                    <Button
                        onClick={loadMore}
                        type="button"
                        disabled={loading}
                        className="relative rounded-lg bg-white cursor-pointer h-11 px-10 py-2 text-sm font-semibold"
                    >
                        <span
                            className={`inline-flex items-center transition duration-200 ${loading ? "opacity-0" : "opacity-100"}`}
                        >
                            Load More
                        </span>
                        <span
                            className={`absolute flex justify-center items-center top-0 left-0 w-full h-full transition duration-200 ${loading ? "opacity-100 z-10" : "opacity-0 -z-10"}`}
                        >
                            <span className="w-6 h-6 inline-block border-2 border-black border-r-transparent rounded-full animate-spin"></span>
                        </span>
                    </Button>
                </div>
            )}
        </>
    );
}
