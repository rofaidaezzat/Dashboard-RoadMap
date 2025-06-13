import React from "react";

const SkeletonContactus = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-20 mx-7">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="relative h-fit p-2 rounded-xl bg-gradient-to-l from-[#a5c1e7] to-[#9b59b6] z-[1] w-full max-w-xs overflow-hidden"
        >
          <div className="absolute top-10 left-0 right-0 h-full scale-[0.85] blur-[30px] bg-gradient-to-l from-[#a5c1e7] to-[#9b59b6] z-[-1]"></div>

          <div className="bg-white text-black w-full flex flex-col gap-4 rounded-lg p-6 shadow-lg animate-pulse h-auto max-h-full">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="flex justify-between gap-4">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-20 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonContactus;
