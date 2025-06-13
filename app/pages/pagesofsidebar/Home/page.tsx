"use client";
import React, { useEffect, useState } from "react";
import Chart from "@/app/components/chart/Chart";
import { axiosInstance } from "@/app/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { User2, ShieldCheck, Route, Mail } from "lucide-react";
import Spinner from "@/app/components/Ui/LoadingSpinner";

interface StatsData {
  regularUsers: number;
  admins: number;
  roadmaps: number;
  contactMessages: number;
}

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fName = localStorage.getItem("First-name")?.replace(/"/g, "") || "";
    const lName = localStorage.getItem("last-name")?.replace(/"/g, "") || "";
    setFirstName(fName);
    setLastName(lName);
  }, []);

  // --------------------fetch data for number of User Admin Roadmap contactMessage ---------------------
  const { data: statsData,isLoading } = useQuery<StatsData>({
    queryKey: ["allData"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("admin/stats");
      return {
        regularUsers:data.counts.regularUsers,
        admins:data.counts.admins,
        roadmaps:data.counts.roadmaps,
        contactMessages:data.counts.contactMessages,
      };
    },
  });
  // ------------------array to map data--------------------------------------
  const statsItems = [
    {
      label: "Regular Users",
      value: statsData?.regularUsers,
      icon: <User2 size={28} className="text-white" />, // white for contrast
      bg: "from-purple-400 to-indigo-500",
    },
    {
      label: "Admins",
      value: statsData?.admins,
      icon: <ShieldCheck size={28} className="text-white" />,
      bg: "from-pink-500 to-purple-500",
    },
    {
      label: "Roadmaps",
      value: statsData?.roadmaps,
      icon: <Route size={28} className="text-white" />,
      bg: "from-green-400 to-emerald-500",
    },
    {
      label: "Contact Messages",
      value: statsData?.contactMessages,
      icon: <Mail size={28} className="text-white" />,
      bg: "from-yellow-300 to-orange-400",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-200 via-white to-purple-200 flex flex-col gap-7 mt-0 pt-7 px-0">
      {/* Welcome Section */}
      <div className="flex items-center gap-4 px-8 pt-10 pb-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg overflow-hidden">
          {/* Avatar with fallback */}
          {/* <Image
            src="/avatar-default.png"
            width={48}
            height={48}
            alt="User Avatar"
            className="rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;  
              target.src = "data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='24' fill='%236366f1'/%3E%3Cpath d='M24 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 2c-4.418 0-13 2.239-13 6.667V38h26v-4.333C37 29.239 28.418 27 24 27z' fill='white'/%3E%3C/svg%3E";
            }}
          /> */}
        </div>
        <div>
          <h1 className="text-black font-bold text-3xl md:text-4xl">Welcome, <span className="text-purple-600">{firstName} {lastName}</span></h1>
          <p className="text-gray-500 text-base mt-1">Here is a quick overview of your dashboard</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 px-8">
        {statsItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 flex-1 min-w-[220px] max-w-[320px] p-5 rounded-2xl shadow-md bg-gradient-to-br ${item.bg} transition-transform duration-200 hover:scale-105 cursor-pointer`}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow">
              {item.icon}
            </div>
            <div>
              <h3 className="text-white text-base font-semibold drop-shadow">{item.label}</h3>
              <p className="text-3xl font-bold text-white drop-shadow">
                {
                  isLoading?(
                    <Spinner/>
                  ):(
                    <>
                        {item.value}
                    </>
                  )
                }
                </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Content Edited */}
      <div className="flex flex-col gap-4 px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#a78bfa"/><path d="M8 7h8M8 11h8M8 15h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              <div>
                <p className="text-2xl font-bold text-gray-800">Recent Content Edited</p>
                <p className="text-gray-500 text-sm">Your most recently updated tracks</p>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">View All</button>
          </div>
          <hr className="my-2 border-purple-100" />
          <div className="flex flex-wrap gap-6 justify-center md:justify-between mt-2">
            {["Front-End", "Back-End", "Robotics", "MobileApp"].map((track, i) => (
              <div
                key={i}
                className="relative flex flex-col gap-3 items-center flex-1 min-w-[180px] max-w-[260px] bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-3 hover:shadow-2xl hover:-translate-y-1 transition duration-200 border border-purple-100 group"
              >
                {/* Badge */}
                <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow group-hover:bg-purple-700 transition">Track</span>
                <Image
                  src={`/Tracks img/${track.replaceAll(" ", "-")}.jpeg`}
                  width={240}
                  height={140}
                  alt={track}
                  priority={track === "Front-End"}
                  className="rounded-lg shadow w-full h-[120px] object-cover"
                  style={{ height: "auto" }}
                />
                <p className="mt-2 text-center font-semibold text-lg text-gray-700">
                  {track.replace("-", " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col mb-8 px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-2xl font-bold mb-2 text-gray-800">Content Engagement</p>
          <p className="text-gray-500 mb-4">Track how users are engaging with your content over time.</p>
          <Chart />
        </div>
      </div>
    </div>
  );
}
