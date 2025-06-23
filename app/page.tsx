"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Ui/Loading/Loading";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "./redux/features/accessTokenSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.remove("accessToken");
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("persist:accessToken");
    }
    dispatch(clearAccessToken());
    router.push("/authpage");
  }, [router, dispatch]);

  return (
    <div className="min-h-screen flex justify-center items-center w-full p-4">
      <Loading />
    </div>
  );
}
