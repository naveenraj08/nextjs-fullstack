import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import React from 'react'

const UserResgistration = () => {
    return (
        <div className="flex bg-white max-w-md rounded-md mx-auto">
            <div className="flex flex-1 flex-col justify-center p-5 lg:p-10 lg:flex-none w-full">
                <div className="mx-auto w-full">
                    <div className="mt-5">
                        <h1 className="mb-5 font-semibold text-lg">Sign In</h1>
                        <div>
                            <form action="#" method="POST" className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="post-form-title font-medium text-xs text-gray-500"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        name="username"
                                        title="Username"
                                        className="input-text block w-full mt-2 rounded-md border-0 h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        id="username"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="user-form-password font-medium text-xs text-gray-500"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="password"
                                        title="password"
                                        className="input-text block w-full mt-2 rounded-md border-0 h-11 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        id="password"
                                    />
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-[#EA4335] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ea44358e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA4335]">Sign in</button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center items-center gap-4">
                                <form
                                    action={async () => {
                                        "use server";
                                        await signIn("github");
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="relative rounded-full p-2 inline-flex justify-start items-center text-sm gap-2 text-gray-600 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
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
                                        <span>Github</span>
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
                                        className="relative rounded-full p-2 inline-flex justify-start items-center text-sm gap-2 text-gray-600 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
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
                                        <span>Google</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserResgistration