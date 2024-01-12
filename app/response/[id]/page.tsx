"use client";
import ToasterComponent from "@/app/_components/ToasterComponent";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FileItem from "./_components/FileItem";
import { ClipLoader } from "react-spinners";

function FileViewResponse({ params }: any) {
  useEffect(() => {
    params.id && getFileInfo();
  }, []);
  const [fileData, setFileData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const getFileInfo = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Files", params.id);
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.exists()) {
        setFileData(docSnapShot.data());
      } else {
        ToasterComponent("File not exists", 3000);
      }
    } catch (error) {
      ToasterComponent(
        "Something wrong went here, please try again later",
        3000
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center w-full items-center h-screen">
      {loading ? (
        <div className="flex w-screen h-screen justify-center items-center">
          <ClipLoader loading={loading} color="#4F46E5" size={45} />
        </div>
      ) : (
        <div className="">
          <FileItem fileData={fileData} />
        </div>
      )}
    </div>
  );
}

export default FileViewResponse;
