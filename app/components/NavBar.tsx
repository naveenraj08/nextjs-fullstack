import { auth, signIn, signOut } from "@/auth";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { BellIcon, PowerIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NavBar = async () => {
  const session = await auth();

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
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
          <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-2 text-gray-600 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            <div>
              {session?.user ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut({ options: { redirectTo: "/" } });
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
                <form
                  action={async () => {
                    "use server";
                    await signIn({ provider: "github" });
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
              )}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};
