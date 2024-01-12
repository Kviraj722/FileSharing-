import ToasterComponent from "@/app/_components/ToasterComponent";
import React, { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
function FileItem({ fileData }: any) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (formData: any) => {
    setLoading(true);
    const password = formData.get("password");
    if (fileData.password === password) {
      // window.open(fileData.fileUrl);
      const download = await fetch(fileData.fileUrl);
      const uri = URL.createObjectURL(await download.blob());
      let downloadLink = document.createElement("a");
      downloadLink.href = uri;
      downloadLink.download = fileData.fileName;
      downloadLink.click();
      URL.revokeObjectURL(uri);
    } else {
      ToasterComponent("Incorrect password", 3000);
    }
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <ClipLoader loading={loading} size={50} color="#4F46E5"/>
      ) : (
        <div>
          <h3 className="mt-4 text-lg font-bold text-white sm:text-xl">
            <div>{`File size: ${fileData.fileSize} `}</div>
            <div>{`File type: ${fileData.fileType} `}</div>
          </h3>

          <p className="mt-2 max-w-sm text-gray-700">
            {`${fileData.userName} has shared a file with you. Please enter a password to download the file.`}
          </p>

          <form action={handleSubmit}>
            <div className="mt-2">
              <input
                type="text"
                name="password"
                placeholder="Enter your password"
                className="p-2 rounded w-full bg-gray-500 text-white"
              />
            </div>

            <button
              className="block w-full rounded bg-indigo-600 p-4 font-medium transition hover:scale-105 mt-2 text-white"
              type="submit"
            >
              Download
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FileItem;
