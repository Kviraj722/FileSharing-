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
}
function TableComp() {
  const { user } = useUser();
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const filesCollection = collection(db, "Files");
        const q = query(
          filesCollection,
          where("email", "==", user?.primaryEmailAddress?.emailAddress)
        );
        const querySnapshot = await getDocs(q);

        const files: FileData[] = [];
        querySnapshot.forEach((doc) => {
          files.push(doc.data() as FileData);
        });

        setFileData(files);
      } catch (error) {
        console.error("Error fetching file data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
                  <td className="whitespace-nowrap px-4 py-2">
                    <Link
                      href={file?.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded bg-black-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-600  transition-transform"
                    >
                      View
                    </Link>
                  </td>
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
