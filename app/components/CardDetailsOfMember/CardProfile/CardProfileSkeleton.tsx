import React from 'react';
import "./CardProfile.css";

const CardProfileSkeleton = () => (
  <div className="card-client animate-pulse">
    <div className="user-picture bg-gray-300" />
    <div className="user-info mt-8">
      <div className="h-8 w-32 bg-gray-300 rounded mb-2 mx-auto" />
      <div className="h-5 w-40 bg-gray-200 rounded mx-auto" />
    </div>
    <div className="profile-summary-row mt-10">
      <div className="summary-item">
        <div className="h-4 w-12 bg-gray-200 rounded mb-1" />
        <div className="h-6 w-8 bg-gray-300 rounded" />
      </div>
      <div className="summary-item">
        <div className="h-4 w-12 bg-gray-200 rounded mb-1" />
        <div className="h-6 w-8 bg-gray-300 rounded" />
      </div>
      <div className="summary-item">
        <div className="h-4 w-12 bg-gray-200 rounded mb-1" />
        <div className="h-6 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  </div>
);

export default CardProfileSkeleton; 