"use client"
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

function HeroSection() {
  const [loading, setLoading] = useState(false);
  const handleGetStartedClick = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/upload";
    }, 2000);
  };
  return (
    <div>
      <section className="bg-black-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Empower Your Collaboration
              <span className="sm:block">
                with Effortless File Sharing Solutions.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Discover a new era of collaborative efficiency with our file
              sharing application.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {/* <Link
                className="block w-full rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto"
                href="/upload"
              >
                Get Started
              </Link> */}

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

              {/* <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
