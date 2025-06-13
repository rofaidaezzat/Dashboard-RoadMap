// app/pages/layout.tsx (أو wherever your private pages are)
import Sidebar from "@/app/components/ComponentsLayout/SideBar";
import Navbar from "@/app/components/Navbar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex  h-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4 overflow-auto min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
