import React, { ReactNode } from "react";
import SideNav from "./_components/SideNav";

interface LayoutProp {
  children: ReactNode;
}
function layout({ children }: any) {
  return (
    <div>
      <div className="hidden h-full md:w-64 flex-col fixed inset-y-0 z-50">
        <SideNav />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default layout;
