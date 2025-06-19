"use client";
import Table from "@/app/components/Table";
import Button from "@/app/components/Ui/Button";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useDeleteDashboardStagesMutation,
  useGetDashboardStagesQuery,
} from "@/app/redux/services/crudStatges";
import SkeletonTable from "@/app/components/SkeletonTable";
import NotFound from "@/app/components/NotFound/NotFound";
import DeleteModal from "@/app/components/Ui/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import toast from "react-hot-toast";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import CreateNewStages from "@/app/components/Ui/StageModal/Createstage";
import UpdateStage from "@/app/components/Ui/StageModal/UpdateStageModal";
import { axiosInstance } from "@/app/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { FaLayerGroup } from "react-icons/fa";
import Spinner from "@/app/components/Ui/LoadingSpinner";
import HeaderOfPages from "@/app/components/HeaderOfPages";
import Paginator from "@/app/components/Paginator/Paginator";

interface StatsData {
  stages: number;
}
const Coursepage = () => {
  // ---------------States-------------------
  const [isOpenCreateModel, setIsOpenCreateModel] = useState(false);
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [StageToEdit, setStatgeToEdit] = useState<{
    _id: string;
    title: string;
  } | null>(null);
  const { ClickedId } = useSelector((state: RootState) => state.clickedId);
  const Dispatch = useDispatch();
  const { data, isLoading } = useGetDashboardStagesQuery();
  const [destroyStage, { isLoading: isLoadingDestroy, isSuccess }] =
    useDeleteDashboardStagesMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.length || 0) / pageSize) || 1;
  const paginatedStages = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) || [];

  //  --------------------------Toast for delete Track-------------
  useEffect(() => {
    if (isSuccess) {
      Dispatch(clickedIdAction(null));
      toast.success("You Delete Track succussefully", {
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
  // --------------------fetch data for number of Stages ---------------------
  const { data: statsData ,isLoading:isLoadingFetchNumberOfStges} = useQuery<StatsData>({
    queryKey: ["allStages"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("admin/stats");
      return {
        stages: data.counts.stages,
      };
    },
  });

  if (isLoading) return <SkeletonTable />;
  // -----------------------filter data in search---------------
  const filteredStage = data?.filter((stage) =>
    `${stage.title} ${stage.roadmap} ${stage.order}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5 mt-20 mx-7 ">
      {/* Section Card */}
      <HeaderOfPages
        IconOfFetch={FaLayerGroup}
        IconOfTitle={<svg width='32' height='32' viewBox='0 0 24 24' fill='none'><rect x='4' y='4' width='16' height='16' rx='4' fill='#fff'/><rect x='4' y='4' width='16' height='16' rx='4' fill='#a78bfa' fillOpacity='0.2'/><path d='M8 16l4-8 4 8' stroke='#a78bfa' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/></svg>}
        TitleOfFetch="Total Stages"
        TitleOfHeader="Stages"
        description="Manage all stages for your roadmaps"
        isLoadingFetchNumberOfFetchData={isLoadingFetchNumberOfStges}
        numberIsFetched={statsData?.stages}
        placeholder="Search Stage by name or role"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
            Add New Stage
          </Button>
        </div>
          ):(
            ""
          )
        }

      </HeaderOfPages>
      {/* ----------------table--------------------------- */}
      <Table header={["id", "title", "order", "roadmap"]}>
        {paginatedStages.length ? (
          paginatedStages.map(({ _id, order, roadmap, title }) => (
            <tr key={_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                {_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                {title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-black">
                {order}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {roadmap?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2 text-end text-sm font-medium">
                <button className="inline-flex items-center bg-[#523a77] p-2 gap-x-2 font-semibold rounded-lg border border-transparent">
                  <Pencil
                    size={17}
                    color="white"
                    onClick={() => {
                      setStatgeToEdit({ _id, title });
                      Dispatch(clickedIdAction(_id));
                      setIsOpenUpdateModel(true);
                    }}
                  />
                </button>
                <button
                  className="inline-flex items-center bg-red-600 cursor-pointer p-2 gap-x-2 rounded-lg border border-transparent"
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
                    Add new Stage
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
      {/* Modals */}
      {isOpenCreateModel && (
        <CreateNewStages
          isOpen={isOpenCreateModel}
          setIsOpen={setIsOpenCreateModel}
        />
      )}

      {isOpenUpdateModel && StageToEdit && (
        <UpdateStage
          trackdata={StageToEdit}
          isOpen={isOpenUpdateModel}
          setIsOpen={setIsOpenUpdateModel}
        />
      )}
      {/* delete modal */}
      {isOpenDeleteModel && (
        <DeleteModal
          isOpen={isOpenDeleteModel}
          setIsOpen={setIsOpenDeleteModel}
          description="Are you sure you want to delete this Stage?"
          title="Delete Stage"
        >
          <button
            onClick={() => setIsOpenDeleteModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700  text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => destroyStage(ClickedId)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {isLoadingDestroy ? (
              <div className="flex gap-1 items-center justify-center">
                  <Spinner/>
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

export default Coursepage;
