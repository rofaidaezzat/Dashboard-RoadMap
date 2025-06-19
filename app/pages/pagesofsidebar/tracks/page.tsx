"use client";
import Table from "@/app/components/Table";
import Button from "@/app/components/Ui/Button";
import { Pencil, Plus, Route, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useDeleteDashboardTracksMutation,
  useGetDashboardTracksQuery,
} from "@/app/redux/services/crudTracks";
import SkeletonTable from "@/app/components/SkeletonTable";
import NotFound from "@/app/components/NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import DeleteModal from "@/app/components/Ui/DeleteModal";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import toast from "react-hot-toast";
import CreateNewTrack from "@/app/components/Ui/tracksModals/CreateTrackModal";
import UpdateTrack from "@/app/components/Ui/tracksModals/UpdateTrackModal";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/app/config/axios.config";
import Spinner from "@/app/components/Ui/LoadingSpinner";
import HeaderOfPages from "@/app/components/HeaderOfPages";
import Paginator from "@/app/components/Paginator/Paginator";

interface StatsData {
  roadmaps: number;
}

const Trackpage = () => {
  const [isOpenCreateeModel, setIsOpenCreateModel] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [TrackToEdit, setTrackToEdit] = useState<{
    id: string;
    title: string;
    requirments: string;
    target_audience: string;
    assignedTo: string;
  } | null>(null);

  const Dispatch = useDispatch();
  const { ClickedId } = useSelector((state: RootState) => state.clickedId);
  const { data, isLoading } = useGetDashboardTracksQuery();
  const [DestroyTrack, { isLoading: isLoadingDelete, isSuccess }] =
    useDeleteDashboardTracksMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data?.length || 0) / pageSize) || 1;
  const paginatedTracks = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) || [];

  // --------------------------Toast for delete Track-------------
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
  // -------------------Filtering for search---------------------
  const filteredTracks = data?.filter((track) =>
    `${track.title} ${track.requirments} ${track.target_audience}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  // ------------------fetch data all Roadmap--------------
  const { data: statsData ,isLoading:isLoadingFetchNumberOfTracks} = useQuery<StatsData>({
    queryKey: ["allTracks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("admin/stats");
      return {
        roadmaps: data.counts.roadmaps,
      };
    },
  });

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="flex flex-col gap-5 mt-20 mx-7">
      {/* Section Card */}
      <HeaderOfPages
        IconOfFetch={Route}
        IconOfTitle={<svg width='32' height='32' viewBox='0 0 24 24' fill='none'><rect x='3' y='7' width='18' height='10' rx='5' fill='#fff'/><rect x='3' y='7' width='18' height='10' rx='5' fill='#a78bfa' fillOpacity='0.2'/><path d='M7 12h10' stroke='#a78bfa' strokeWidth='2' strokeLinecap='round'/></svg>}
        TitleOfFetch="Total Tracks"
        TitleOfHeader="Tracks"
        description="Manage all tracks and roadmaps"
        isLoadingFetchNumberOfFetchData={isLoadingFetchNumberOfTracks}
        numberIsFetched={statsData?.roadmaps}
        placeholder="Search About Roadmap You Need"
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
            Create Track
          </Button>
        </div>
          ):(
            ""
          )
        }
      </HeaderOfPages>
      {/* ---------------------Table------------------------ */}
      <Table
        header={[
          "_id",
          "title",
          "requirments",
          "target_audience",
          "Number Of Users",
        ]}
      >
        {paginatedTracks.length ? (
          paginatedTracks.map(
            ({
              _id,
              requirments,
              target_audience,
              title,
              user,
              assignedTo,
            }) => (
              <tr key={_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-black">
                  {_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-black">
                  {title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-black">
                  {requirments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">
                  {target_audience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">
                  {user.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2 text-end text-sm font-medium">
                  <button className="inline-flex items-center bg-[#523a77] p-2 gap-x-2 font-semibold rounded-lg border border-transparent">
                    <Pencil
                      size={17}
                      color="white"
                      onClick={() => {
                        setTrackToEdit({
                          id: _id,
                          title,
                          requirments,
                          target_audience,
                          assignedTo,
                        });
                        setIsOpenUpdateModel(true);
                        Dispatch(clickedIdAction(_id));
                      }}
                    />
                  </button>
                  <button className="inline-flex items-center bg-red-600 p-2 gap-x-2 rounded-lg border border-transparent">
                    <Trash
                      size={17}
                      color="white"
                      onClick={() => {
                        Dispatch(clickedIdAction(_id));
                        setIsOpenDeleteModel(true);
                      }}
                    />
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
                      Add new Track      
                  </Button>
              </div>
            </td>
          </tr>
        )}
      </Table>
      <Paginator
        page={currentPage}
        pageCount={totalPages}
        total={filteredTracks?.length || 0}
        isLoading={isLoading}
        onClickPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onClickNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      />
      {/* ---------------------Create Modal---------------- */}
      {isOpenCreateeModel && (
        <CreateNewTrack
          isOpen={isOpenCreateeModel}
          setIsOpen={setIsOpenCreateModel}
        />
      )}
      {/* ---------------------Delete Modal---------------- */}
      {isOpenDeleteModel && (
        <DeleteModal
          isOpen={isOpenDeleteModel}
          setIsOpen={setIsOpenDeleteModel}
          description="Are you sure you want to delete this Member?"
          title="Delete Track"
        >
          <button
            onClick={() => setIsOpenDeleteModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => DestroyTrack(ClickedId)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {isLoadingDelete ?
            <div className="flex justify-center items-center gap-1">
              <Spinner/>
              <p>Deleting...</p>
            </div>
                : " Confirm Delete"}
          </button>
        </DeleteModal>
      )}
      {/* ---------------------Update Modal---------------- */}
      {isOpenUpdateModel && TrackToEdit && (
        <UpdateTrack
          trackdata={TrackToEdit}
          isOpen={isOpenUpdateModel}
          setIsOpen={setIsOpenUpdateModel}
        />
      )}
    </div>
  );
};

export default Trackpage;
