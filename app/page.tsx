"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Ui/Loading/Loading";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUserData = () => {
      try {
        const userDataString = Cookies.get("loggedInUser");
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const roleUser = Cookies.get("role");
        const roleData = roleUser ? JSON.parse(roleUser) === "admin" : null;

        if (userData && roleData) {
          router.push("/pages/pagesofsidebar/Home");
        } else {
          router.push("/authpage");
        }
      } catch (error) {
        console.error("Error accessing cookies:", error);
        router.push("/authpage");
      }
    };

    checkUserData();
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center w-full p-4">
      <Loading />
    </div>
  );
}
