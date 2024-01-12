"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import { app, db } from "@/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ToasterSuccess from "@/app/_components/ToasterSuccess";
import ToasterComponent from "@/app/_components/ToasterComponent";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

function Upload() {
  function generateUniqueRandomString(length: number): string {
    const alphanumericChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      result += alphanumericChars.charAt(randomIndex);
    }

    return result;
  }

  const { user } = useUser();
  const [progress, setProgress] = useState<any>();
  const storage = getStorage(app);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = generateUniqueRandomString(6);
  const uploadFile = async (file: any) => {
    try {
      setLoading(true);
      const imageRef = ref(storage, "files/" + file?.name);

      const uploadTask = uploadBytesResumable(imageRef, file, file.type);
      uploadTask.on("state_changed", async (snapshort: any) => {
        const progress =
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
      });

      const fileSnapShot = await uploadTask;

      const fileUrl = await getDownloadURL(fileSnapShot.ref);
      const newDocRef = doc(db, "Files", id);
      const dataToUpload = {
        id: id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: fileUrl,
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        password: "RandoMPassword",
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`,
      };
      const dataAdded = await setDoc(newDocRef, dataToUpload);
      ToasterSuccess("File uploaded successfully", 5000);
      router.push("/file-preview/" + id);
    } catch (err) {
      ToasterComponent("Error while uploading the file", 5000);
    } finally {
      setLoading(false);
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
      <div className="w-full h-full items-center mt-15">
        <UploadForm
          uploadBtnHandler={(file: any) => uploadFile(file)}
          progress={progress}
        />
      </div>
      {loading && (
        <div className="flex justify-center mt-4">
          <ClipLoader color="#4F46E5" loading={loading} size={45} />
        </div>
      )}
    </div>
  );
}

export default Upload;
