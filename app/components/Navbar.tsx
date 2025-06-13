"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileMenuModal from "./ProfileMenuModal";
import { useState } from "react";
import { CircleUserRound } from "lucide-react";

const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <nav className="w-full p-3 shadow-md    rounded-b-3xl navbar bg-neutral-900 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto   text-white font-semibold">
        {/* Logo & Navigation Links */}
        <div className="flex items-center justify-between space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Header/Rectangle 1938.png" // ✅ هذا هو المسار الصحيح
              alt="Logo Part 1"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/Header/Rectangle 1939.png"
              alt="Logo Part 2"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <CircleUserRound
            onClick={() => setIsOpenModal(!isOpenModal)}
            color="white"
            size={30}
            className="cursor-pointer rounded-sm"
          />
          {isOpenModal && (
            <div className="absolute right-0 mt-2 z-50">
              <ProfileMenuModal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
