import React, { ReactNode } from "react";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";

interface LayoutProp {
  children: ReactNode;
}
function layout({ children }: LayoutProp) {
  return (
    <div>
      <div className="hidden h-full md:w-64 flex-col md:flex fixed inset-y-0 z-50">
        <SideNav />
        {/* <div>Home</div> */}
      </div>
      <div className="md:ml-64">
        <TopHeader />
        {children}
      </div>
    </div>
  );
}

export default layout;
