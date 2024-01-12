import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

function FilePreview({ file, removeFile }: any) {
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="flex items-center gap-2 justify-between boarder rounded-md  boarder-indigo-400">
      <div className="flex items-center">
        <div className="pl-1">
          <Image
            src={fileUrl}
            width={30}
            height={30}
            alt="file"
            style={
              {
                // borderRadius: "50%",
                // overflow: "hidden",
                // maxHeight: "50",
                // minHeight: "50",
                // minWidth: "50"
              }
            }
          />
        </div>
        <div>
          <h2 className="flex justify-center">{file.name}</h2>

          <h2 className="text-[12px] text-gray-400">
            {file?.type} / {(file.size / 1024 / 1024).toFixed(2)}.MB
          </h2>
        </div>
      </div>
      <X className="text-red-500 cursor-pointer" onClick={() => removeFile()} />
    </div>
  );
}

export default FilePreview;
