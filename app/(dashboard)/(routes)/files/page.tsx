"use client";
import React, { useEffect } from "react";
import TableComp from "./_components/TableComp";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function Files() {
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      const { user } = useUser();
      // console.log("User =>", user?.primaryEmailAddress?.emailAddress);
      return user?.primaryEmailAddress?.emailAddress;
    } catch (error) {}
  };
  return (
    <div>
      <div className="m-5 hover:text-indigo-600 transition ">
        {/* <Link  ></Link> */}
        <Link href={"/upload"} className="flex gap-3">
          <ArrowLeft /> Go to upload
        </Link>
      </div>
      <div className="flex justify-center items-center flex-1 w-full mt-5">
        <TableComp />
      </div>
    </div>
  );
}

export default Files;
