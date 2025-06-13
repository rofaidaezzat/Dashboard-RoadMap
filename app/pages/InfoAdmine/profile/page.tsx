"use client";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "@/app/config/axios.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateAdminProfile } from "@/app/data";
import InputErrorMessage from "@/app/components/Ui/inputErrorMsg";
import { UpdateProfileSchema } from "@/app/Validation";
import Input from "@/app/components/Ui/Input";
import OTPForm from "@/app/components/OTPForm";
import ImageProfile from "@/app/components/profileComponents/ImageProfile";
import GoBack from "@/app/components/Ui/goBack/GoBack";

interface IAdmineProfileForm {
  first_name: string;
  last_name: string;
  email: string;
}

interface IUserData extends IAdmineProfileForm {
  _id?: string;
}


const Profile = () => {
  const [userInfo, setUserInfo] = useState<IAdmineProfileForm | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null); // تم استبدال any
  const [showOTP, setShowOTP] = useState(false);

  // Profile Form
  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset,
  } = useForm<IAdmineProfileForm>({
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  // جلب بيانات المستخدم من localStorage فقط في المتصفح
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataString = localStorage.getItem("loggedInUser");
      const userDataObj = userDataString ? JSON.parse(userDataString) : null;
      setUserData(userDataObj);
      if (userDataObj) {
        setUserInfo({
          first_name: userDataObj.first_name || "",
          last_name: userDataObj.last_name || "",
          email: userDataObj.email || "",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [userInfo, reset]);

  // Handler for profile update
  const onSubmitAdmineprofileupdate: SubmitHandler<IAdmineProfileForm> = async (
    data
  ) => {
    try {
      const payload = userData ? { ...data, _id: userData._id } : data;
      const { status } = await axiosInstance.put(
        "/users/update-profile",
        payload
      );
      if (status === 200) {
        const updatedUserData = {
          ...userData,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        setUserInfo({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
        toast.success("Your Update Done successfully", {
          position: "bottom-center",
          duration: 1000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        setShowOTP(true);
      }
    } catch (error) {
      toast.error("Error sending message", {
        position: "bottom-center",
        duration: 1500,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      console.error("خطأ في الإرسال:", error);
    }
  };

  // Handler for email verification
  const handleVerifyOTP = async (code: string) => {
    try {
      const res = await axiosInstance.post("users/verify-email", { code });
      if (res.status === 200) {
        toast.success("Email verified successfully!", {
          position: "bottom-center",
          style: { backgroundColor: "black", color: "white" },
        });
        setShowOTP(false);
      } else {
        toast.error("Invalid code");
      }
    } catch (err) {
      toast.error("Verification failed!");
      console.error(err);
    }
  };

  // ------------Render------------
  const rendeAdmineProfileForm = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {UpdateAdminProfile.map(({ name, Label, type }, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <label htmlFor={name} className="font-semibold text-gray-700">
              {Label}
            </label>
            <Input
              type={type}
              id={name}
              autoComplete="off"
              className="h-12 bg-gray-100 border  border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#413198] shadow-sm transition"
              {...profileRegister(name as keyof IAdmineProfileForm)}
            />
            {profileErrors[name as keyof IAdmineProfileForm] && (
              <InputErrorMessage
                msg={profileErrors[name as keyof IAdmineProfileForm]?.message}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 flex flex-col items-start justify-center p-0 m-0">
      <GoBack/>
      <div className="w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 md:p-12 flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">
        {/* الصورة والبيانات */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 gap-4 mb-8 md:mb-0">
          <div className="w-full">
            <ImageProfile/>
          </div>
          <div className="mt-2 text-center md:text-left flex flex-col space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-800 mb-1">
              {userInfo
                ? `${userInfo.first_name} ${userInfo.last_name}`
                : "Admin User"}
            </h1>
            <p className="text-base text-gray-500 mb-1">
              {userInfo?.email || "admin@example.com"}
            </p>
            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-semibold shadow">
              Role: Admin
            </span>
          </div>
        </div>
        {/* الفورم */}
        <div className="flex-1 w-full">
          <form
            className="space-y-6 bg-white/90 p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 mx-auto backdrop-blur-sm"
            onSubmit={handleProfileSubmit(onSubmitAdmineprofileupdate)}
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#413198] text-center mb-6">
              Update Profile Information
            </h2>
            {rendeAdmineProfileForm()}
            <div className="flex justify-end w-full mt-4">
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                <Pencil size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
        {/* OTP فورم */}
        {showOTP && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
            <OTPForm onVerify={handleVerifyOTP} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
