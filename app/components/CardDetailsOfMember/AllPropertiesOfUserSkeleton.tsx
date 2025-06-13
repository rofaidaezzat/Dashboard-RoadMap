import React from 'react';

const AllPropertiesOfUserSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-gray-100 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-lg" />
          <div className="h-6 w-32 bg-gray-300 rounded" />
        </div>
        <div className="space-y-2">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="h-4 bg-gray-200 rounded w-3/4" />
          ))}
        </div>
      </div>
    ))}
    {/* Tasks section (spans 2 columns) */}
    <div className="bg-gray-100 p-4 rounded-xl md:col-span-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-300 rounded-lg" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[...Array(2)].map((_, j) => (
          <div key={j} className="h-4 bg-gray-200 rounded w-3/4" />
        ))}
      </div>
    </div>
  </div>
);

export default AllPropertiesOfUserSkeleton; 