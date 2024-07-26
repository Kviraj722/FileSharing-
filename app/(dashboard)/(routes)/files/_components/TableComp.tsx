"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

interface FileData {
  fileName: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
  decryptedUrl?: string;
}
const decryptData = async (
  key: CryptoKey,
  iv: Uint8Array,
  data: ArrayBuffer
): Promise<ArrayBuffer> => {
  return crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
};

function TableComp() {
  const { user } = useUser();
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (response.ok) {
        const filesData = await response.json();
        // Decrypt the files
        const decryptedFiles = await Promise.all(
          filesData.map(async (file: any) => {
            const encryptedData = new Uint8Array(
              atob(file.encryptedData)
                .split("")
                .map((char) => char.charCodeAt(0))
            );
            const iv = new Uint8Array(file.iv);
            const rawKey = new Uint8Array(file.encryptionKey);

            // Import the raw key to CryptoKey
            const encryptionKey = await crypto.subtle.importKey(
              "raw",
              rawKey,
              { name: "AES-GCM" },
              false,
              ["decrypt"]
            );

            const decryptedData = await decryptData(
              encryptionKey,
              iv,
              encryptedData.buffer
            );
            const decryptedBlob = new Blob([decryptedData], {
              type: file.fileType,
            });
            const decryptedUrl = URL.createObjectURL(decryptedBlob);

            return {
              ...file,
              decryptedUrl,
            };
          })
        );

        setFileData(decryptedFiles);
      } else {
        console.error("Error fetching file data:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching file data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const email: any = user?.primaryEmailAddress?.emailAddress;
    fetchData(email);
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#4F46E5" loading={loading} size={45} />
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-black text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white text-left">
                  File Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white text-left">
                  File Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white text-left">
                  File Size
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white text-left">
                  View
                </th>
              </tr>
            </thead>

            <tbody className="divide-y gap-7 divide-gray-200">
              {fileData.map((file: any, index: any) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                    {file?.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-white">
                    {file?.fileType}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-white">
                    {file?.fileSize}
                  </td>
                  {file.decryptedUrl ? (
                    <Link
                      href={file.decryptedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded bg-black-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-600 transition-transform"
                    >
                      Download
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TableComp;
