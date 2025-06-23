"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Ui/Loading/Loading";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      // تحقق من صلاحية التوكن عبر API (يجب أن يكون لديك endpoint مناسب)
      fetch("/api/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            router.push("/pages/InfoAdmine/profile");
          } else {
            Cookies.remove("accessToken");
            router.push("/authpage");
          }
        })
        .catch(() => {
          Cookies.remove("accessToken");
          router.push("/authpage");
        });
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
