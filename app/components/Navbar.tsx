"use client";
import Link from "next/link";
import Image from "next/image";
import ProfileMenuModal from "./ProfileMenuModal";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
interface IUser {
  profile_image: string;
}
const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  // Get user from cookie safely
  const userDataString = Cookies.get("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const IdUser = userData?.id;

  // fetch user info from server
  const getUserById = async (): Promise<IUser> => {
    if (!IdUser) throw new Error("No User ID Provided");
    const { data } = await axiosInstance.get(`users/${IdUser}`);
    return data;
  };

  const { data } = useQuery({
    queryKey: ["oneUser", IdUser],
    queryFn: getUserById,
    enabled: !!IdUser,
  });
  return (
    <nav className="w-full p-3 shadow-md rounded-b-3xl navbar bg-neutral-900 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto text-white font-semibold">
        <div className="flex items-center justify-between space-x-6">
          <Link
            href="/pages/pagesofsidebar/Home"
            className="flex items-center space-x-2"
          >
            <Image
              src="/Header/Rectangle 1938.png"
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

          <div
            onClick={() => setIsOpenModal(!isOpenModal)}
            className="cursor-pointer rounded-full overflow-hidden w-[40px] h-[40px] flex items-center justify-center"
          >
            {data?.profile_image ? (
              <Image
                src={`https://codemap-production.up.railway.app/${data.profile_image.replace(
                  /\\/g,
                  "/"
                )}`}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-white"
              />
            ) : (
              <CircleUserRound
                color="black"
                size={30}
                className="cursor-pointer rounded-sm"
              />
            )}
          </div>

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
