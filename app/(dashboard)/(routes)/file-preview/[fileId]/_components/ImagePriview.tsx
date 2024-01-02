import Image from "next/image";
import React from "react";

function ImagePriview({ fileData }: any) {
  return (
    <div>
      <div className="bg-black justify-center  p-6">
        <div className="w-full h-auto flex justify-center">
          <Image
            width={200}
            height={40}
            src={fileData.fileUrl}
            alt="image not available"
          />
        </div>
        <div className="flex justify-center">
          <h3 className="mt-4 text-lg font-medium text-white ">
            {fileData.fileName}
          </h3>

        </div>
        <div className="text-center mt-1.5 text-sm text-gray-700">{fileData.fileSize}.KB</div>

        <form className="mt-4">
          <button className="block w-full rounded bg-indigo-600 p-4 font-medium transition hover:scale-105">
            Share button
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImagePriview;
