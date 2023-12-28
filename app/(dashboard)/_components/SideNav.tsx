"use client";

import { File, Shield, Upload } from "lucide-react";
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
      name: "Files",
      icon: Shield,
      path: "/upgrade",
    },
  ];

  return (
    <div> Hello I am in sideNav
      <div className="flex flex-col float-left">
        {menuList.map((item: any, index: any) => (
          <button
            className={`flex gap-2 p-4 px-0 hover:bg-gray-100 w-full text-gray-500 ${
              activeTab === index ? "bg-gray-100" : ""
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
