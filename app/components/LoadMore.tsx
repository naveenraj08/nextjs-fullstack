"use client";

import React, { useState } from "react";

export const LoadMore = () => {
  const [isPending, setIsPending] = useState(false);
  const handleLoadMore = () => {
    setIsPending(!isPending);
  };
  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={handleLoadMore}
        className="px-8 py-3 text-sm bg-[#EA4335] text-white rounded-md overflow-hidden relative"
      >
        <span
          className={`inline-flex items-center transition duration-200 ${isPending ? "opacity-0" : "opacity-100"}`}
        >
          Load More
        </span>
        <span
          className={`absolute flex justify-center items-center top-0 bg-[#EA4335] left-0 w-full h-full transition duration-200 ${isPending ? "opacity-100 z-10" : "opacity-0 -z-10"}`}
        >
          <span className="w-6 h-6 inline-block border-2 border-white border-r-transparent rounded-full animate-spin"></span>
        </span>
      </button>
    </div>
  );
};
