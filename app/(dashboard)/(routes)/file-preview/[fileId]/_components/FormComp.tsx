import React, { useState } from "react";
import ToasterComponent from "@/app/_components/ToasterComponent";
import ToasterSuccess from "@/app/_components/ToasterSuccess";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { update } from "firebase/database";
import { ClipLoader } from "react-spinners";

function FormComp({ fileData, id }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(fileData.shortUrl);
    ToasterSuccess("Short URL copied to clipboard!", 2000);
  };

  const handlePasswordToggle = () => {
    setIsPasswordEnabled(!isPasswordEnabled);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      if (password === "") {
        ToasterComponent("Please enter password", 3000);
        return;
      }
      setLoading(true);
      const docRef = doc(db, "Files", id);
      await updateDoc(docRef, {
        password: password,
      });
      ToasterSuccess("Password updated.", 3000);
    } catch (e) {
      ToasterComponent("Error while updating the password", 2000);
      console.log(e);
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  const handleEmailShare = () => {
    ToasterComponent("Share button clicked!", 2000);
  };

  return (
    <div>
      <h1 className="pb-2 text-white">Short URL</h1>
      <div
        className="flex cursor-pointer border-2 border-dashed justify-between gap-3 p-2 border-b-indigo-400"
        onClick={copyToClipBoard}
      >
        <div className="text-white">{fileData.shortUrl}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-copy text-white"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={isPasswordEnabled}
          onChange={handlePasswordToggle}
          className="mr-2"
        />
        <h2 className="text-white">Enable password</h2>
      </div>

      {isPasswordEnabled && (
        <div className="flex  justify-evenly items-center mt-4">
          <input
            type={`${isPasswordEnabled ? "text" : "password"}`} // need to change this.
            value={password}
            onChange={handlePasswordChange}
            className="bg-gray-500 text-white p-2 w-3/4 rounded"
          />

          {loading ? (
            <ClipLoader color="#4F46E5" loading={loading} size={25} />
          ) : (
            <div>
              <button
                className=" bg-indigo-600 p-2 rounded text-white font-medium transition hover:scale-105 "
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
      <h2 className="text-white mt-4">Share with your friend via email!</h2>
      <div className="mt-2">
        <input
          type="email"
          className="p-2 rounded w-full bg-gray-500 text-white"
        />
      </div>
      <button
        className="block w-full rounded bg-indigo-600 p-4 font-medium transition hover:scale-105 mt-4 text-white"
        onClick={handleEmailShare}
      >
        Share button
      </button>
    </div>
  );
}

export default FormComp;
