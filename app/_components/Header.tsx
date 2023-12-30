import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between flex justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-indigo-900 sm:text-3xl">
              Welcome Back, Buddy!!
            </h1>

            <p className="mt-1.5 text-sm text-indigo-100">
              Let's share a new file with your friend! 🎉
            </p>
          </div>
          <div>
            <Link
              className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              href="/upload"
            >
              <span className="text-sm font-medium"> Get started </span>
              {/* <svg
              className="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg> */}
            </Link>
            {/* register button */}
            {/* <Link
              href="#"
              className="inline-flex items-center gap-2 rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
            >
              <span className="text-sm font-medium"> Register </span>

              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
