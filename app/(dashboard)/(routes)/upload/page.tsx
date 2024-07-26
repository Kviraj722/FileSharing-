"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import ToasterSuccess from "@/app/_components/ToasterSuccess";
import ToasterComponent from "@/app/_components/ToasterComponent";

import { useUser } from "@clerk/nextjs";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

// Function to generate a random encryption key
const generateEncryptionKey = async (): Promise<CryptoKey> => {
  return crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
    "decrypt",
  ]);
};
const encryptData = async (
  key: CryptoKey,
  data: ArrayBuffer
): Promise<{ iv: Uint8Array; encryptedData: ArrayBuffer }> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  return { iv, encryptedData };
};

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

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = generateUniqueRandomString(6);
  const uploadFile = async (file: any) => {
    try {
      setLoading(true);
      // Generate encryption key
      const encryptionKey = await generateEncryptionKey();
      console.log("ENCRYPTION KEY ", encryptionKey);
      // Encrypt file data
      const fileBuffer = await file.arrayBuffer();
      const { iv, encryptedData } = await encryptData(
        encryptionKey,
        fileBuffer
      );
      console.log(" iv, encryptedData ", iv, encryptedData);
      // Convert encrypted data to base64
      const encryptedBase64 = btoa(
        String.fromCharCode(...new Uint8Array(encryptedData))
      );

      // Export encryption key to raw format
      const rawEncryptionKey = await crypto.subtle.exportKey(
        "raw",
        encryptionKey
      );

      const dataToUpload = {
        id: id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        encryptedData: encryptedBase64,
        iv: Array.from(iv),
        encryptionKey: Array.from(new Uint8Array(rawEncryptionKey)),
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        password: "",
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`,
      };
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpload),
      });

      if (response.ok) {
        ToasterSuccess("File uploaded and data stored successfully", 5000);
        router.push("/files");
      } else {
        const errorData = await response.json();
        ToasterComponent("Error while uploading the file", 5000);
      }
    } catch (err) {
      console.log("Error -> ", err);
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
