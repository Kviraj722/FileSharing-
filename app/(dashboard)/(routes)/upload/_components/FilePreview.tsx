import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

function FilePreview({ file, removeFile }: any) {
  return (
    <div className="flex items-center gap-2 justify-between mt-5 boarder rounded-md p-2 boarder-indigo-400">
      <div className="flex items-center p-2">
        {/* {console.log(file)} */}
        <Image src={file} width={50} height={50} alt="file" />
        <div>
          <h2 className="text-left">{file.name}</h2>
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
