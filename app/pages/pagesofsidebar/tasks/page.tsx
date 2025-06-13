"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaLayerGroup } from "react-icons/fa";
import { Pencil, Trash } from "lucide-react";
import HeaderOfPages from "@/app/components/HeaderOfPages";
import NotFound from "@/app/components/NotFound/NotFound";
import SkeletonTable from "@/app/components/SkeletonTable";
import Table from "@/app/components/Table";
import DeleteModal from "@/app/components/Ui/DeleteModal";
import Spinner from "@/app/components/Ui/LoadingSpinner";
import UpdateTask from "@/app/components/Ui/TaskModal/UpdateTask";

import { axiosInstance } from "@/app/config/axios.config";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import { RootState } from "@/app/redux/store";
import {
  useDeleteDashboardTaskMutation,
  useGetDashboardTaskQuery,
} from "@/app/redux/services/crudTask";

interface StatsData {
  tasks: number;
}

const Taskpage = () => {
  // States
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [TaskToEdit, setTaskToEdit] = useState<{
    _id: string;
    title: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { ClickedId } = useSelector((state: RootState) => state.clickedId);
  const Dispatch = useDispatch();

  const { data, isLoading } = useGetDashboardTaskQuery();
  const [destroyStage, { isLoading: isLoadingDestroy, isSuccess }] =
    useDeleteDashboardTaskMutation();

  // Toast on successful delete
  useEffect(() => {
    if (isSuccess) {
      Dispatch(clickedIdAction(null));
      toast.success("You deleted the task successfully", {
        position: "bottom-center",
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      setIsOpenDeleteModel(false);
    }
  }, [isSuccess, Dispatch]);

  // Fetch stats for total number of tasks
  const { data: statsData, isLoading: isLoadingFetchNumberOfTasks } =
    useQuery<StatsData>({
      queryKey: ["allTask"],
      queryFn: async () => {
        const { data } = await axiosInstance.get("admin/stats");
        return { tasks: data.counts.tasks };
      },
    });

  if (isLoading) return <SkeletonTable />;

  // Filter tasks based on search term
  const filteredTask = data?.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 mt-20 mx-7">
      {/* Header Section */}
      <HeaderOfPages
        IconOfFetch={FaLayerGroup}
        IconOfTitle={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="4" fill="#fff" />
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="4"
              fill="#a78bfa"
              fillOpacity="0.2"
            />
            <path
              d="M8 16l4-8 4 8"
              stroke="#a78bfa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        TitleOfFetch="Total Tasks"
        TitleOfHeader="Tasks"
        description="Manage all tasks"
        isLoadingFetchNumberOfFetchData={isLoadingFetchNumberOfTasks}
        numberIsFetched={statsData?.tasks}
        placeholder="Search task by title"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      >
        {data?.length ? (
          <div className="flex justify-end items-center gap-2 mt-5 mb-4 relative z-10"></div>
        ) : null}
      </HeaderOfPages>

      {/* Table Section */}
      <Table header={["_id", "Title", "Description", "Status"]}>
        {filteredTask?.length ? (
          filteredTask.map(({ _id, title, description, status }) => (
            <tr key={_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                {_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2 text-end text-sm font-medium">
                <button
                  className="inline-flex items-center bg-[#523a77] p-2 gap-x-2 font-semibold rounded-lg border border-transparent"
                  onClick={() => {
                    setTaskToEdit({ _id, title });
                    Dispatch(clickedIdAction(_id));
                    setIsOpenUpdateModel(true);
                  }}
                >
                  <Pencil size={17} color="white" />
                </button>
                <button
                  className="inline-flex items-center bg-red-600 p-2 gap-x-2 rounded-lg border border-transparent"
                  onClick={() => {
                    Dispatch(clickedIdAction(_id));
                    setIsOpenDeleteModel(true);
                  }}
                >
                  <Trash size={17} color="white" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <div className="flex gap-4 flex-col justify-center items-center min-h-[300px]">
                <NotFound />
              </div>
            </td>
          </tr>
        )}
      </Table>

      {/* Update Task Modal */}
      {isOpenUpdateModel && TaskToEdit && (
        <UpdateTask
          TaskData={TaskToEdit}
          isOpen={isOpenUpdateModel}
          setIsOpen={setIsOpenUpdateModel}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isOpenDeleteModel && (
        <DeleteModal
          isOpen={isOpenDeleteModel}
          setIsOpen={setIsOpenDeleteModel}
          description="Are you sure you want to delete this Task?"
          title="Delete task"
        >
          <button
            onClick={() => setIsOpenDeleteModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => destroyStage(ClickedId)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {isLoadingDestroy ? (
              <div className="flex gap-1 items-center justify-center">
                <Spinner />
                <span>Deleting...</span>
              </div>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </DeleteModal>
      )}
    </div>
  );
};

export default Taskpage;
