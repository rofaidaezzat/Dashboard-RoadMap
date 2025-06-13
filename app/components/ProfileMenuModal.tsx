import Link from "next/link";
import { axiosInstance } from "../config/axios.config";
import { CircleUserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "../redux/features/accessTokenSlice";

type IProfileMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileMenuModal = ({ isOpen, onClose }: IProfileMenuModalProps) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const onLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("accessToken");
      dispatch(clearAccessToken());
      setTimeout(() => {
        location.replace("/");
      }, 1500);
    } catch (err) {
      console.error("Logout failed", err);
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("accessToken");
      location.replace("/authpage");
      dispatch(clearAccessToken());
    }
  };
  return (
    <div className="relative inline-block text-left">
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="absolute top-full space-y-1   right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 text-black p-2">
        <Link
          href="/pages/InfoAdmine/profile"
          className="w-full border-2 border-gray-400 text-left flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          <CircleUserRound />
          My profile
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
