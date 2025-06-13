import Navbar from "@/app/components/Navbar";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="overflow-auto min-h-screen">{children}</main>
    </div>
  );
};

export default ProfileLayout;
