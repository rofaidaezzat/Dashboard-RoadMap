"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Ui/Loading/Loading";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove("accessToken");
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("persist:accessToken");
    }
    router.push("/authpage");
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center w-full p-4">
      <Loading />
    </div>
  );
}
