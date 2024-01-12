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

      </div>
    </div>
  );
}

export default ImagePriview;
