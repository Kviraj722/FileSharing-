// import Link from "next/link";
"use client";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

function Header() {
  // const handleGetStartedClick
  const [loading, setLoading] = useState(false);

  const handleGetStartedClick = () => {
    setLoading(true);

    // Simulate an asynchronous operation, e.g., fetching data or redirecting
    setTimeout(() => {
      // Perform the actual redirection
      window.location.href = "/upload";
    }, 2000); // Adjust the timeout duration as needed
  };
  return (
    <>
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
              {loading ? (
                <div className="">
                  <ClipLoader color="#4F46E5" loading={loading} size={40} />
                </div>
              ) : (
                <button
                  className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                  onClick={handleGetStartedClick}
                  disabled={loading}
                >
                  <span className="text-sm font-medium"> Get started </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
