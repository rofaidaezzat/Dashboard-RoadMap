import React from 'react';

const CardProgressSkeleton = () => (
  <div className="bg-gray-100 p-6 rounded-xl flex flex-col gap-3 shadow-sm animate-pulse">
    <div className="flex items-center gap-2 mb-2">
      <div className="h-6 w-6 bg-gray-300 rounded-full" />
      <div className="h-5 w-24 bg-gray-300 rounded" />
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div className="bg-gray-300 h-3 rounded-full" style={{ width: '60%' }} />
    </div>
    <div className="flex justify-between text-sm">
      <div className="h-4 w-10 bg-gray-300 rounded" />
      <div className="h-4 w-8 bg-gray-300 rounded" />
    </div>
  </div>
);

export default CardProgressSkeleton; 