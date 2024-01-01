import React, { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import ToasterSuccess from "@/app/_components/ToasterSuccess";
import ToasterComponent from "@/app/_components/ToasterComponent";

function UploadForm({ uploadBtnHandler, progress }: any) {
  interface File {
    name?: string;
    lastModified?: number;
    size: number;
    type?: string;
    webkitRelativePath?: string;
    target?: string;
  }

  const [file, setFile] = useState<File | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const onFileSelect = (file: any) => {
    console.log("File =>", file);
    if (file && file.size > 2000000) {
      console.log("Size is greater then 2 mb");
      setErrorMsg("Maximum file upload size is 2MB");
      return;
    }
    console.log("FIle =>", file);
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFileTypes.includes(file.type)) {
      ToasterComponent("Please select valid file.", 5000);
      return;
    }
    setErrorMsg(undefined);
    setFile(file);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMsg(undefined);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMsg]);

  const handleUpload = async () => {
    setUploading(true);
    try {
      await uploadBtnHandler(file);
      setUploadComplete(true);

      setTimeout(() => {
        setFile(undefined);
        setUploadComplete(false);
      }, 3000);
    } catch (error) {
      ToasterComponent("Something went wrong during file upload", 3000);
    } finally {
      setUploading(false);
    }

    // uploadBtnHandler(file);
    // setUploadComplete(true);
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full mt-8 mb-1 md:mb-16 lg:mb-20 xl:mb-24">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-800 border-dashed rounded-lg cursor-pointer bg-black dark:border-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500"
        >
          <div className="flex flex-col items-center justify-center">
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
            <p className="text-sm text-indigo-500 dark:text-indigo-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-indigo-500 dark:text-indigo-400">
              SVG, PNG, JPG, or GIF (MAX.2MB)
            </p>
          </div>
          <input
            // onChange={(event: File) => onFileSelect(event?.target?.files[0])}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onFileSelect(event.target.files?.[0])
            }
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
      {errorMsg ? <AlertMessage msg={errorMsg} /> : null}

      <div className="flex justify-center ">
        {file && !uploadComplete && !uploading && (
          <FilePreview file={file} removeFile={() => setFile(undefined)} />
        )}
      </div>

      <div className="flex justify-center">
        {!uploadComplete && !uploading && (
          <button
            disabled={!file}
            className="disabled:bg-gray-700 p-2 text-white w-full md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-full  bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </div>
      {/* {progress > 0 && <ProgressBar progress={progress} />} */}
      {/* {uploading && <ProgressBar progress={progress} />} */}
      {/* {uploadComplete && (
        <div className="flex justify-center mt-3">
          <div className="bg-indigo-600 text-black h-6 rounded-full w-full text-center">
            Upload Completed
          </div>
        </div>
      )} */}
    </div>
  );
}

export default UploadForm;
