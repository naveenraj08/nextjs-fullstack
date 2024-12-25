'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";

export const SearchFormReset = () => {

    const resetForm = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if(form) form.reset();
    }


    return (
        <button type="button" title="Reset form" onClick={resetForm} className="absolute right-14 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full transition-all bg-gray-900 text-white focus:ring-4 focus:ring-gray-400">
            <span className="sr-only">Reset search form</span>
            <XMarkIcon className="size-5" />
        </button>
    )
}