import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopHeader() {
  return (
    <div className="flex p-5 border-b items-center justify-between md:justify-end">
      <AlignJustify className="md:hidden" />
      <Image
        src="/logo.svg"
        alt="logo"
        width={65}
        height={65}
        className="md:hidden"
      />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default TopHeader;
