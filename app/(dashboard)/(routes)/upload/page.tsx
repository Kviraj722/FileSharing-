import React from "react";
import UploadForm from "./_components/UploadForm";

function Upload() {
  return (
    <div className="p-5 px-8 md:px-28 ">
      <div className="flex justify-center items-center">
        <h1
          className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
        bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          Start uploading file and Share it.
        </h1>
      </div>
      <div className="w-full h-full items-center mt-20">
        <UploadForm />
      </div>
    </div>
  );
}

export default Upload;
