"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import { app } from "@/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ToasterSuccess from "@/app/_components/ToasterSuccess";
import ToasterComponent from "@/app/_components/ToasterComponent";

function Upload() {
  const [progress, setProgress] = useState<any>();
  const storage = getStorage(app);
  const uploadFile = (file: any) => {
    try {
      const metaData = {
        contentType: file.type,
      };
      const imageRef = ref(storage, "files/" + file?.name);
      const uploadTask = uploadBytesResumable(imageRef, file, file.type);
      uploadTask.on("state_changed", (snapshort: any) => {
        const progress =
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
        console.log("Upload is =>", progress, "%done");
        setProgress(progress);
        console.log("File uploaded successfully");
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("URL =>", url);
        });
      });

      ToasterSuccess("File uploaded successfully", 5000);
    } catch (err) {
      console.log("Error while uploading  =>>>>>>>>>>>>>>>>>>>>", err);
      ToasterComponent("Error while uploading the file", 5000);
    } finally {
      // setFile(undefined)
    }
  };
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
        <UploadForm
          uploadBtnHandler={(file: any) => uploadFile(file)}
          progress={progress}
        />
      </div>
    </div>
  );
}

export default Upload;
