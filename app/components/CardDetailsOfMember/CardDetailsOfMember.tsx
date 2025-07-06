"use client";
import { axiosInstance } from "@/app/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import CardProfile from "./CardProfile/CardProfile";
import { FaBook, FaMap, FaLock, FaTasks } from "react-icons/fa";
import CardProgress from "./CardProgress";
import AllPropertiesOfUser from "./AllPropertiesOfUser";
import CardProfileSkeleton from "./CardProfile/CardProfileSkeleton";
import CardProgressSkeleton from "./CardProgressSkeleton";
import AllPropertiesOfUserSkeleton from "./AllPropertiesOfUserSkeleton";
import { Trash2 } from "lucide-react";
import Button from "../Ui/Button";
import toast from "react-hot-toast";
import { useDeleteDashboardMemberMutation } from "@/app/redux/services/crudMember";
import DeleteModal from "../Ui/DeleteModal";
import Spinner from "../Ui/LoadingSpinner";
import { useRouter } from "next/navigation";

interface Iprops {
  IdUser: string | null;
}

interface IUser {
  completedlesson: string[];
  email: string;
  first_name: string;
  last_name: string;
  lesson: string[];
  profile_image: string;
  roadmap: string[];
  task: string[];
  stage: string[];
  role: string;
}

const DetailsOfMemberComponent = ({ IdUser }: Iprops) => {
  const [isClient, setIsClient] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [desrtoyMember, { isLoading: isloadingDelete, isSuccess }] =
    useDeleteDashboardMemberMutation();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ------------------Toast Delete Member ---------------------
  useEffect(() => {
    if (isSuccess) {
      toast.success("You Delete Member succussefully", {
        position: "bottom-center",
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      router.push("/pages/pagesofsidebar/members");
      setIsOpenDeleteModel(false);
    }
  }, [isSuccess]);

  const getUserById = async (): Promise<IUser> => {
    if (!IdUser) throw new Error("No User ID Provided");
    const { data } = await axiosInstance.get(`users/${IdUser}`);
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["oneUser", IdUser],
    queryFn: getUserById,
    enabled: !!IdUser,
  });

  if (!isClient) {
    return null; // Return null on server-side to avoid hydration mismatch
  }

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-7 w-full p-6">
        <CardProfileSkeleton />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <AllPropertiesOfUserSkeleton />
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <CardProgressSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <p>User not found or error occurred.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-7 w-full p-6">
      <div className="flex flex-col gap-3">
        <CardProfile
          imageUrl={
            data.profile_image
              ? `https://codemap-production.up.railway.app/${data.profile_image.replace(
                  /\\/g,
                  "/"
                )}`
              : ""
          }
          email={data.email}
          FirstName={data.first_name}
          LastName={data.last_name}
          completedLessons={data.completedlesson?.length || 0}
          tasksCount={data.task?.length || 0}
          role={data.role || "Member"}
        />
        <Button
          className="inline-flex items-center w-fit bg-red-600 gap-x-2 px-4 py-2 rounded-lg border border-transparent text-white hover:bg-red-700 transition mt-4"
          onClick={() => setIsOpenDeleteModel(true)}
        >
          <Trash2 size={17} color="white" />
          Delete User
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <AllPropertiesOfUser {...data} />
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CardProgress
              title="Lessons"
              icon={<FaBook />}
              value={data.completedlesson?.length || 0}
              total={
                (data.lesson?.length || 0) + (data.completedlesson?.length || 0)
              }
              color="purple"
            />
            <CardProgress
              title="Roadmaps"
              icon={<FaMap />}
              value={data.roadmap?.length || 0}
              total={data.roadmap?.length || 0}
              color="green"
            />
            <CardProgress
              title="Stages"
              icon={<FaLock />}
              value={data.stage?.length || 0}
              total={data.stage?.length || 0}
              color="orange"
            />
            <CardProgress
              title="Tasks"
              icon={<FaTasks />}
              value={data.task?.length || 0}
              total={data.task?.length || 0}
              color="red"
            />
          </div>
        </div>
      </div>
      {/* ------------Delete Modal--------------- */}
      {isOpenDeleteModel && (
        <DeleteModal
          isOpen={isOpenDeleteModel}
          setIsOpen={setIsOpenDeleteModel}
          title="Delete Member"
          description="Are you sure you want to delete this Member?"
        >
          <button
            onClick={() => setIsOpenDeleteModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700  text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              desrtoyMember(IdUser);
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {isloadingDelete ? (
              <div className="flex gap-1 items-center justify-center">
                <Spinner />
                <span>Deleting...</span>
              </div>
            ) : (
              " Confirm Delete"
            )}
          </button>
        </DeleteModal>
      )}
    </div>
  );
};

export default DetailsOfMemberComponent;
