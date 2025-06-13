"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Ui/Loading/Loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userDataString = localStorage.getItem("loggedInUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const roleUser = localStorage.getItem("role");
    const roleData = roleUser ? JSON.parse(roleUser) === "admin" : null;

    if (userData && roleData) {
      router.push("/pages/pagesofsidebar/Home");
    } else {
      router.push("/authpage");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center w-full p-4">
      <Loading />
    </div>
  );
}
