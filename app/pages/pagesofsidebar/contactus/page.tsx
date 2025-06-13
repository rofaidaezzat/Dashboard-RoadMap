"use client";

import SkeletonContactus from "@/app/components/SkeletonContactus";
import { axiosInstance } from "@/app/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Iprops {
  _id: string;
  first_name: string;
  last_name: string;
  whatsappnumber: number;
  email: string;
  message: string;
}

const ContactPage = () => {
  const { data, isLoading, error } = useQuery<Iprops[]>({
    queryKey: ["contactus"],
    queryFn: async () => {
      const res = await axiosInstance.get("contact-us/messages");
      return res.data;
    },
  });

  if (isLoading) return <SkeletonContactus />;
  if (error) return <p className="text-center mt-10">Something went wrong</p>;

  return (
    <div className="flex flex-col gap-8 mt-20 mx-7">
      {/* Section Card/Header */}
      <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-2 overflow-hidden max-w-4xl mx-auto">
        {/* Decorative blurred circle */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="flex items-center gap-4 mb-2 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow">
            {/* Modern contact icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="4" fill="#fff"/><rect x="3" y="5" width="18" height="14" rx="4" fill="#a78bfa" fillOpacity="0.2"/><path d="M7 9h10M7 13h6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-500 text-lg">View and manage all contact requests</p>
          </div>
        </div>
      </div>
      {/* Messages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {data?.map((item) => (
          <div
            key={item._id}
            className="relative h-fit p-2 rounded-xl bg-gradient-to-l from-[#a5c1e7] to-[#9b59b6] z-[1] w-full max-w-xs overflow-hidden shadow-xl hover:scale-105 transition-transform duration-200"
          >
            <div className="absolute top-10 left-0 right-0 h-full scale-[0.85] blur-[30px] bg-gradient-to-l from-[#a5c1e7] to-[#9b59b6] z-[-1]"></div>
            <div className="bg-white text-black w-full flex flex-col gap-4 rounded-lg p-6 shadow-lg transition-colors duration-1000 overflow-hidden h-auto max-h-full">
              <div className="flex items-center gap-2 mb-2">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a78bfa"/><path d="M12 12c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-2.67 0-8 1.336-8 4v2h16v-2c0-2.664-5.33-4-8-4z" fill="#fff"/></svg>
                <span className="font-bold text-lg text-purple-700">{item.first_name} {item.last_name}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">{item.email}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{item.whatsappnumber}</span>
              </div>
              <div className="text-gray-700 text-base mb-2">
                <span className="font-semibold">Message:</span> {item.message}
              </div>
              <div className="text-xs text-gray-400">ID: {item._id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
