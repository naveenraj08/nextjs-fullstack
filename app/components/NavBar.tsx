import { auth, signIn, signOut } from "@/auth";
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/dist/server/api-utils";

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
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={120}
                height={30}
                priority
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-2 text-gray-600 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {session && session?.user ? (
                  <>
                    <MenuItem>
                      <Link href={`/user/${session?.id}`}  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        {session?.user?.name}
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <Link
                        href="/startup/create"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        <span>Create</span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <form
                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        action={async () => {
                          "use server";
                          await signOut({ options: { redirectTo: "/" } });
                        }}
                      >
                        <button type="submit">Logout</button>
                      </form>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <form
                     className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      action={async () => {
                        "use server";
                        await signIn({ provider: "github" });
                      }}
                    >
                      <button type="submit">Login</button>
                    </form>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};
