"use client";

import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function SideNav() {
  const [activeTab, setActiveTab] = useState<any>();
  // console.log(activeTab);
const pathname = usePathname()
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
  useEffect(()=>{
    menuList.forEach((item,index)=>{
      if(item.path === pathname){
        setActiveTab(index)
      }
    })
  },[pathname])
  const route = useRouter()
  const handleClick = () => {
    route.push("/")
  }
  return (
    <div>
      <div className="p-5 flex justify-center hover:cursor-pointer" onClick={handleClick}>
        <Image src="/logo.svg" width={65} height={65} alt="Logo" />
      </div>

      <div className="flex mt-5 flex-col float-left space-y-1 w-full">
        {/* {menuList
        
        .map((item: any, index: any) => (
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
        ))} */}
        {menuList.map((item: any, index: any) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`flex gap-2 p-4 px-5 hover:bg-indigo-600
              transition duration-300 ease-in-out
              hover:text-black w-56 text-white ${
                activeTab === index ? "bg-indigo-600" : ""
              }`}
              onClick={() => {
                setActiveTab(index);
                // router.push(`${item.path}`);
              }}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
