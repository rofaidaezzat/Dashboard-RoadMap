import Link from "next/link";
import { axiosInstance } from "../config/axios.config";
import { CircleUserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "../redux/features/accessTokenSlice";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import Image from "./Ui/Image";

type IProfileMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface IUser {
  profile_image: string;
}

const ProfileMenuModal = ({ isOpen, onClose }: IProfileMenuModalProps) => {
  const dispatch = useDispatch();

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

  // return null if not open or no user
  if (!isOpen || !userData) return null;

  const onLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      // remove all cookies
      Cookies.remove("loggedInUser");
      Cookies.remove("accessToken");
      Cookies.remove("First-name");
      Cookies.remove("last-name");
      Cookies.remove("email");
      Cookies.remove("role");
      Cookies.remove("id");

      dispatch(clearAccessToken());
      location.replace("/"); // or /authpage if needed
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="absolute top-full space-y-1 right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 text-black p-2">
        <Link
          href="/pages/InfoAdmine/profile"
          className="w-full border-2 border-gray-400 text-left flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          {data?.profile_image ? (
            <Image
              imageurl={`https://b684-102-189-220-226.ngrok-free.app/${data.profile_image.replace(
                /\\/g,
                "/"
              )}`}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-white"
            />
          ) : (
            <CircleUserRound
              color="black"
              size={30}
              className="cursor-pointer rounded-sm"
            />
          )}
          <span className="font-medium text-sm">My Profile</span>
        </Link>

        <button
          className="w-full text-left flex items-center gap-2 p-2 bg-red-700 text-white rounded-md hover:bg-red-600"
          onClick={onLogout}
        >
          <span className="text-lg">↩️</span> Log Out
        </button>

        <div className="text-center text-xs text-gray-400 pt-2">© CODEMAP</div>
      </div>
    </div>
  );
};

export default ProfileMenuModal;
