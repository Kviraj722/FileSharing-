"use client";
import ToasterComponent from "@/app/_components/ToasterComponent";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ImagePriview from "./_components/ImagePriview";
import FormComp from "./_components/FormComp";
import Link from "next/link";
import { ArrowLeft, ArrowLeftSquare } from "lucide-react";

function FilePreview({ params }: any) {
  useEffect(() => {
    getFileInfo();
  }, []);
  const [fileData, setFileData] = useState<any>();
  const getFileInfo = async () => {
    try {
      const docRef = doc(db, "Files", params.fileId);
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
    }
  };
  return (
    <div>
      <div className="m-5 hover:text-indigo-600 transition ">
        {/* <Link  ></Link> */}
        <Link href={"/upload"} className="flex gap-3">
          <ArrowLeft /> Go to upload
        </Link>
      </div>
      {/* flex justify-center items-center gap-9  m-10 p-16 */}
      <div className="grid grid-cols-1  mt-5 p-8 md:grid-cols-2">
        <div className="w-full h-full">
          {fileData && <ImagePriview fileData={fileData} />}
        </div>
        <div className="w-full h-full mt-[32.90px]">
          {fileData && <FormComp fileData={fileData} id={params.fileId} />}
        </div>
      </div>
    </div>
  );
}

export default FilePreview;
