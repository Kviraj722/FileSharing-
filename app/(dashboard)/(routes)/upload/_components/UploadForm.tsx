import React from "react";

function UploadForm() {
  return (
    <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-24">
      <div className="flex flex-col items-center justify-center w-full mt-8 mb-12 md:mb-16 lg:mb-20 xl:mb-24">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-800 border-dashed rounded-lg cursor-pointer bg-black dark:border-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-indigo-500 dark:text-indigo-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-indigo-500 dark:text-indigo-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-indigo-500 dark:text-indigo-400">
              SVG, PNG, JPG, or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      <div className="flex justify-center md:mt-8 lg:mt-12 xl:mt-16">
        <button className="p-2 text-white w-full md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-full  bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700">
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadForm;
