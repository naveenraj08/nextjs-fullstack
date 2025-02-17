import { auth, signIn, signOut } from "@/auth";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { PowerIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NavBar = async () => {
  const session = await auth();

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-100 group">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between gap-5">
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href={"/"}>
                <Image
                  className="dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={120}
                  height={30}
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="fixed w-full h-full transition-all duration-500 ease-in-out -left-full top-0 z-50 bg-white p-5 text-left sm:h-auto sm:w-auto sm:static sm:p-0 group-data-[open]:left-0">
              <DisclosureButton className="group absolute right-0 top-0  inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:hidden">
                <span className="sr-only">Open main menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </DisclosureButton>
              <div className="mt-10 space-y-3 sm:mt-0 sm:space-y-0">
                <Link
                  href={"/startup/create"}
                  className="relative inline-block rounded-lg bg-blue-500 text-white px-5 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Post
                </Link>
              </div>
            </div>
            <div>
              {session?.user ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button
                    type="submit"
                    className="relative rounded-full p-2 text-gray-600 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
                    title="Log out"
                  >
                    <span className="sr-only">Log out</span>
                    <PowerIcon className="size-6" />
                  </button>
                </form>
              ) : (
                <div className="inline-flex items-center space-x-4">
                  <form
                    action={async () => {
                      "use server";
                      await signIn("github");
                    }}
                  >
                    <button
                      type="submit"
                      className="relative rounded-full p-2 text-gray-600 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
                      title="Login with Github"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g>
                          <path
                            d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z"
                            fill="#000000"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </form>

                  <form
                    action={async () => {
                      "use server";
                      await signIn("google");
                    }}
                  >
                    <button
                      type="submit"
                      className="relative rounded-full p-2 text-gray-600 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
                      title="Login with Google"
                    >
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="24"
                        height="24"
                      >
                        <g>
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          ></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </g>
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};
