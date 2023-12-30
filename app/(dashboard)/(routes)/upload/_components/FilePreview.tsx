import Image from "next/image";
import React from "react";

function FilePreview({ file }: any) {
  return (
    <div>
      <Image src={file} width={50} height={50} alt="file" />
      <div>
        <h2>{file.name}</h2>
      </div>
    </div>
  );
}

export default FilePreview;
