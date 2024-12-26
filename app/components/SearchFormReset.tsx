"use client"

import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const SearchFormReset = () => {

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if(form) form.reset();
    }

    return (
        <button type="button" title="Reset form" onClick={reset} className="absolute right-14 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full transition-all bg-gray-900 text-white focus:ring-4 focus:ring-gray-400">
            <Link href="/" className="search-btn">
                <span className="sr-only">Reset search form</span>
                <XMarkIcon className="size-5" />
            </Link>
        </button>
    )
}