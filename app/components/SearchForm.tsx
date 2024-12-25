import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Form from 'next/form'
import React from 'react'
import { SearchFormReset } from './SearchFormReset';

export const SearchForm = () => {

  const searchQuery = 'Test';

  return (
    <Form action="/search" scroll={false} className='search-form flex gap-5 max-w-md w-full relative'>
      <input defaultValue={searchQuery} name="query" placeholder='Search blog...' className="px-6 py-4 pr-16 input-text block w-full rounded-full text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
      { searchQuery &&  <SearchFormReset /> }
      <button type="submit" className='absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full transition-all bg-gray-900 text-white focus:ring-4 focus:ring-gray-400'>
        <span className='sr-only'>search blog</span>
        <MagnifyingGlassIcon className='size-5'/>
      </button>
    </Form>
  )
}
