"use client";
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the profile component with no SSR
const ProfileComponent = dynamic(
  () => import('@/app/components/profileComponents/ProfileComponent'),
  { ssr: false }
);

const Profile = () => {
  return <ProfileComponent />;
};

export default Profile;
