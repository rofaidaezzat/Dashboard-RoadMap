"use client";
import NotFound from "@/app/components/NotFound/NotFound";
import Table from "@/app/components/Table";
import Button from "@/app/components/Ui/Button";
import CreateCategoryModal from "@/app/components/Ui/CategoryModal/CreateCategoryModal";
import UpdateCategoryModal from "@/app/components/Ui/CategoryModal/UpdateCategoryModal";
import DeleteModal from "@/app/components/Ui/DeleteModal";
import {
  useDeleteDashboardCategoryMutation,
  useGetDashboardCategoryQuery,
} from "@/app/redux/services/crudCategory";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import SkeletonTable from "@/app/components/SkeletonTable";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { MdCategory } from "react-icons/md";
import Spinner from "@/app/components/Ui/LoadingSpinner";
import HeaderOfPages from "@/app/components/HeaderOfPages";
import Paginator from "@/app/components/Paginator/Paginator";


interface StatsData {
  categories: number;
}

const CategoryPage = () => {
  const [isOpenCreateModel, setIsOpenCreateModel] = useState(false);
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const { data, isLoading } = useGetDashboardCategoryQuery();
  const { ClickedId } = useSelector((state: RootState) => state.clickedId);
  const Dispatch = useDispatch();
  const [desrtoyMember, { isLoading: isloadingDelete, isSuccess }] =
    useDeleteDashboardCategoryMutation();
  const [CategoryToEdit, setCategoryToEdit] = useState<{
    _id: string;
    title: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.length || 0) / pageSize) || 1;
  const paginatedCategory = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) || [];
  // ----------------Toast for Delete----------------
  useEffect(() => {
    if (isSuccess) {
      Dispatch(clickedIdAction(null));
      toast.success("You Delete Category succussefully", {
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
  // --------------------fetch data for number of Category ---------------------
  const { data: statsData ,isLoading:isLoadingFetchNumberOfCategory} = useQuery<StatsData>({
    queryKey: ["allCategory"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("admin/stats");
      return {
        categories: data.counts.categories,
      };
    },
  });

  if (isLoading) return <SkeletonTable />;
  // -----------------------filter data in search---------------
  const filteredCategory = data?.filter((category) =>
    `${category.title} ${category.roadmap} ${category.stage}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5 mt-20 mx-7 ">
      {/* Section Card */}
      <HeaderOfPages
      IconOfFetch={MdCategory}
      IconOfTitle={ 
      <svg width='32' height='32' viewBox='0 0 24 24' fill='none'><rect x='3' y='3' width='7' height='7' rx='2' fill='#fff'/><rect x='3' y='3' width='7' height='7' rx='2' fill='#a78bfa' fillOpacity='0.2'/><rect x='14' y='3' width='7' height='7' rx='2' fill='#fff'/><rect x='14' y='3' width='7' height='7' rx='2' fill='#a78bfa' fillOpacity='0.2'/><rect x='3' y='14' width='7' height='7' rx='2' fill='#fff'/><rect x='3' y='14' width='7' height='7' rx='2' fill='#a78bfa' fillOpacity='0.2'/><rect x='14' y='14' width='7' height='7' rx='2' fill='#fff'/><rect x='14' y='14' width='7' height='7' rx='2' fill='#a78bfa' fillOpacity='0.2'/></svg>
      }
      TitleOfFetch="Categories"
      TitleOfHeader="Category"
      description="Manage all categories for your content"
      isLoadingFetchNumberOfFetchData={isLoadingFetchNumberOfCategory}
      numberIsFetched={statsData?.categories}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      placeholder="Search Stage by name or role"
      >
         {/* Modern Add Button */}
        {
          data?.length ? (
          <div className="flex justify-end items-center gap-2 mt-5 mb-4 relative z-10">
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-4 py-2 hover:from-purple-600 hover:to-indigo-600 transition shadow"
            onClick={() => setIsOpenCreateModel(true)}
          >
            <Plus size={18} />
            Add Category
          </Button>
        </div>
          ):(
            ""
          )
        }
      </HeaderOfPages>

      {/* -----------------table--------------------------- */}
      <Table header={["id", "title", "roadmap", "stage"]}>
        {paginatedCategory.length ? (
          paginatedCategory.map(({ _id, title, roadmap, stage }) => (
            <tr key={_id}>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                {_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                {title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                {roadmap.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {stage.title}
              </td>
              {/* ---------edit and delete------------ */}
              <td className="px-6 py-4 whitespace-nowrap space-x-2 text-end text-sm font-medium">
                <button
                  className="inline-flex items-center bg-[#523a77] p-2 gap-x-2 font-semibold rounded-lg border border-transparent"
                  onClick={() => {
                    setIsOpenUpdateModel(true);
                    setCategoryToEdit({ _id, title });
                    Dispatch(clickedIdAction(_id));
                  }}
                >
                  <Pencil size={17} color="white" />
                </button>
                <Button className="inline-flex items-center bg-red-600 p-2 gap-x-2 rounded-lg border border-transparent">
                  <Trash2
                    onClick={() => {
                      setIsOpenDeleteModel(true);
                      Dispatch(clickedIdAction(_id));
                    }}
                    size={17}
                    color="white"
                  />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          // ---------not found Data-----------
          <tr>
            <td colSpan={6}>
              <div className="flex gap-4 flex-col justify-center items-center min-h-[300px]">
                <NotFound />
                <Button
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-4 py-2 hover:from-purple-600 hover:to-indigo-600 transition shadow"
                  onClick={() => setIsOpenCreateModel(true)}
                >
                  <Plus size={18} />
                  Add Category
                </Button>
              </div>
            </td>
          </tr>
        )}
      </Table>
      <Paginator
        page={currentPage}
        pageCount={totalPages}
        total={filteredCategory?.length || 0}
        isLoading={isLoading}
        onClickPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onClickNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      />
      {/* ------------Delete Modal--------------- */}
      {isOpenDeleteModel && (
        <DeleteModal
          isOpen={isOpenDeleteModel}
          setIsOpen={setIsOpenDeleteModel}
          title="Delete Category"
          description="Are you sure you want to delete this Category?"
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
              <div className="flex items-center justify-center gap-1">
                <Spinner/>
                <span>Deleting...</span>
              </div>
            ) : (
              " Confirm Delete"
            )}
          </button>
        </DeleteModal>
      )}
      {/* ----------Create Modal---------- */}
      {isOpenCreateModel && (
        <CreateCategoryModal
          isOpen={isOpenCreateModel}
          setIsOpen={setIsOpenCreateModel}
        />
      )}
      {/* ----------Update Modal---------- */}
      {CategoryToEdit && (
        <UpdateCategoryModal
          CategoryData={CategoryToEdit}
          isOpen={isOpenUpdateModel}
          setIsOpen={setIsOpenUpdateModel}
        />
      )}
    </div>
  );
};

export default CategoryPage;
