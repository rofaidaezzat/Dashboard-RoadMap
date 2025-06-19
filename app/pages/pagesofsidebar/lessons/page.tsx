"use client";
import Table from "@/app/components/Table";
import Button from "@/app/components/Ui/Button";
import { Pencil, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import NotFound from "@/app/components/NotFound/NotFound";
import DeleteModal from "@/app/components/Ui/DeleteModal";
import {
  useDeleteDashboardLessonMutation,
  useGetDashboardLessonQuery,
} from "@/app/redux/services/crudLesson";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import SkeletonTable from "@/app/components/SkeletonTable";
import CreateNewLessonModal from "@/app/components/Ui/LessonModal/CreateNewLessonModal";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import UpdateLessonModal from "@/app/components/Ui/LessonModal/UpdateNewLessonModal";
import { axiosInstance } from "@/app/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import Spinner from "@/app/components/Ui/LoadingSpinner";
import HeaderOfPages from "@/app/components/HeaderOfPages";
import Paginator from "@/app/components/Paginator/Paginator";

interface StatsData {
  lessons: number;
}
const Lessonpage = () => {
  // -------------------States---------------------
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [isOpenCreateModel, setIsOpenCreateModel] = useState(false);
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const { data, isLoading } = useGetDashboardLessonQuery();
  const { ClickedId } = useSelector((state: RootState) => state.clickedId);
  const [desrtoyMember, { isLoading: isloadingDelete, isSuccess }] =
    useDeleteDashboardLessonMutation();

  const [LessonToEdit, setLessonToEdit] = useState<{
    _id: string;
    title: string;
    description: string;
    link: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const Dispatch = useDispatch();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.length || 0) / pageSize) || 1;
  const paginatedLessons = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) || [];

  // ---------------Toast for Delete-------------------
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
      setIsOpenDeleteModel(false);
    }
  }, [isSuccess]);
  // --------------------fetch data for number of Lesson ---------------------
  const { data: statsData ,isLoading:isLoadingFetchNumberOfLesson} = useQuery<StatsData>({
    queryKey: ["allCategory"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("admin/stats");
      return {
        lessons: data.counts.lessons,
      };
    },
  });

  if (isLoading) return <SkeletonTable />;
  // -----------------------filter data in search---------------
  const filteredLesson = data?.filter((lesson) =>
    `${lesson.title} ${lesson.description} ${lesson.roadmap?.title}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 mt-20 mx-7 ">
      {/* Section Card */}
      <HeaderOfPages
      IconOfFetch={PiChalkboardTeacherBold}
      IconOfTitle={<svg width='32' height='32' viewBox='0 0 24 24' fill='none'><rect x='3' y='5' width='18' height='14' rx='3' fill='#fff'/><rect x='3' y='5' width='18' height='14' rx='3' fill='#a78bfa' fillOpacity='0.2'/><rect x='7' y='9' width='10' height='2' rx='1' fill='#a78bfa'/><rect x='7' y='13' width='6' height='2' rx='1' fill='#a78bfa'/></svg>}
      TitleOfFetch="ToTal Lessons"
      TitleOfHeader="Lessons"
      description="Manage lessons across all courses"
      isLoadingFetchNumberOfFetchData={isLoadingFetchNumberOfLesson}
      numberIsFetched={statsData?.lessons}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      placeholder="Search Lesson by Title or description or roadmap"
      >
           {/* Modern Add Button */}
        {
          data?.length? (
            <div className="flex justify-end items-center gap-2 mt-5 mb-4 relative z-10">
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-4 py-2 hover:from-purple-600 hover:to-indigo-600 transition shadow"
            onClick={() => setIsOpenCreateModel(true)}
          >
            <Plus size={18} />
            Add new lesson
          </Button>
        </div>
          ):(
            ""
          )
        }

      </HeaderOfPages>
      {/* -------------------Table--------------------------  */}
      <Table
        header={[
          "id",
          "Title",
          "Description",
          "Roadmap",
          "Stage",
          "Category",
          "Link",
        ]}
      >
        {paginatedLessons.length ? (
          paginatedLessons.map(
            ({ _id, title, description, roadmap, stage, category, link }) => (
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
                  {roadmap.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {stage.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {category.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {link}
                </td>
                {/* ------------------Buttons------------------------ */}
                <td className="px-6 py-4 whitespace-nowrap space-x-2 text-end text-sm font-medium">
                  <button
                    onClick={() => {
                      setIsOpenUpdateModel(true);
                      Dispatch(clickedIdAction(_id));
                      setLessonToEdit({ _id, title, description, link });
                    }}
                    className="inline-flex items-center bg-[#523a77] p-2 gap-x-2 font-semibold rounded-lg border border-transparent"
                  >
                    <Pencil size={17} color="white" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpenDeleteModel(true);
                      Dispatch(clickedIdAction(_id));
                    }}
                    className="inline-flex items-center bg-red-600 p-2 gap-x-2 rounded-lg border border-transparent"
                  >
                    <Trash size={17} color="white" />
                  </button>
                </td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan={6}>
              <div className="flex gap-4 flex-col justify-center items-center min-h-[300px]">
                <NotFound />
                <Button
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-4 py-2 hover:from-purple-600 hover:to-indigo-600 transition shadow"
                  onClick={() => setIsOpenCreateModel(true)}
                >
                  <Plus size={18} />
                  Add new Lesson
                </Button>
              </div>
            </td>
          </tr>
        )}
      </Table>
      <Paginator
        page={currentPage}
        pageCount={totalPages}
        total={data?.length || 0}
        isLoading={isLoading}
        onClickPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onClickNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      />
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
              desrtoyMember(ClickedId);
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {isloadingDelete ? (
              <div className="flex gap-1">
                <Spinner/>
                <span>Deleting...</span>
              </div>
            ) : (
              " Confirm Delete"
            )}
          </button>
        </DeleteModal>
      )}

      {/* Add new lesson  */}
      {isOpenCreateModel && (
        <CreateNewLessonModal
          isOpen={isOpenCreateModel}
          setIsOpen={setIsOpenCreateModel}
        />
      )}

      {/* update lesson  */}
      {LessonToEdit && (
        <UpdateLessonModal
          LessonData={LessonToEdit}
          isOpen={isOpenUpdateModel}
          setIsOpen={setIsOpenUpdateModel}
        />
      )}
    </div>
  );
};

export default Lessonpage;
