"use client";

import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function SideNav() {
  const [activeTab, setActiveTab] = useState(0);
  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];

  return (
    <div>
      <div className="p-5 flex justify-center">
        <Image src="/logo.svg" width={65} height={65} alt="Logo" />
      </div>

      <div className="flex mt-5 flex-col float-left space-y-1 w-full">
        {menuList.map((item: any, index: any) => (
          <button
            className={`flex gap-2 p-4 px-5 hover:bg-indigo-600
            
            transition duration-300 ease-in-out
            hover:text-black w-56 text-white ${
              activeTab === index ? "bg-indigo-600" : ""
            }`}
            onClick={() => setActiveTab(index)}
            key={item.id}
          >
            <item.icon />
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
