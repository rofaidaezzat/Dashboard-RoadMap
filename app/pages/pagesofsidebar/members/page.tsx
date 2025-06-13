"use client";
import Button from "@/app/components/Ui/Button";
import Table from "@/app/components/Table";
import { Eye, GraduationCap, Pencil, Plus, Shield } from "lucide-react";
import {
  useGetDashboardMemberQuery,
  useGiveRoleDashboardMemberMutation,
} from "@/app/redux/services/crudMember";
import SkeletonTable from "@/app/components/SkeletonTable";
import NotFound from "@/app/components/NotFound/NotFound";
import { useEffect, useState } from "react";
import UpdateMemberModal from "../../../components/Ui/MemberModal/UpdateNewMemberModal";
import CreateNewMemberModal from "../../../components/Ui/MemberModal/CreateNewMemberModal";
import { useDispatch, useSelector } from "react-redux";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import { axiosInstance } from "@/app/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import HeaderOfPages from "@/app/components/HeaderOfPages";
import Paginator from "@/app/components/Paginator/Paginator";
import Spinner from "@/app/components/Ui/LoadingSpinner";
import DeleteModal from "@/app/components/Ui/DeleteModal";
import { RootState } from "@/app/redux/store";
import toast from "react-hot-toast";

interface StatsData {
  users: number;
}
const Memberpage = () => {
  // -----------states-------------------
  const [isOpenCreateModel, setIsOpenCreateModel] = useState(false);
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [isOpenRoleModel, setIsOpenRoleModel] = useState(false);
  const [giveRoleAmind, { isLoading: isLoadingGiveRole, isSuccess }] =
    useGiveRoleDashboardMemberMutation();
  const { ClickedId } = useSelector((state: RootState) => state.clickedId);
  const { data, isLoading, isFetching } = useGetDashboardMemberQuery();
  const router = useRouter();

  const [MemberToEdit, setMemberToEdit] = useState<{
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const Dispatch = useDispatch();

  //  --------------------------Toast for Give Role Admin To Member -------------
  useEffect(() => {
    if (isSuccess) {
      Dispatch(clickedIdAction(null));
      toast.success("You Give Role Admin To Member succussefully", {
        position: "bottom-center",
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      setIsOpenRoleModel(false);
    }
  }, [isSuccess]);

  // -----------------------filter data in search---------------
  const filteredMembers =
    data?.filter((member) =>
      `${member.first_name} ${member.last_name} ${member.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || [];

  // Pagination logic (apply to filteredMembers)
  const pageSize = 10;
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset to page 1 if searchTerm changes or filteredMembers changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, data]);

  // --------------------fetch data for number of track ---------------------
  const { data: statsData, isLoading: isLoadingFetchNumberOfUsers } =
    useQuery<StatsData>({
      queryKey: ["allTracks"],
      queryFn: async () => {
        const { data } = await axiosInstance.get("admin/stats");
        return {
          users: data.counts.users,
        };
      },
    });

  const viewDetailsOfMember = (_id: string) => {
    Dispatch(clickedIdAction(_id));
    router.push("/pages/pagesofsidebar/getonemember");
  };

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="flex flex-col gap-5 mt-20 mx-7 ">
      {/* Section Card */}
      <HeaderOfPages
        IconOfFetch={GraduationCap}
        IconOfTitle={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="4" fill="#fff" />
            <circle cx="16" cy="8" r="4" fill="#fff" />
            <ellipse cx="8" cy="17" rx="7" ry="3" fill="#fff" />
            <ellipse cx="16" cy="17" rx="7" ry="3" fill="#fff" />
            <circle cx="8" cy="8" r="3" fill="#a78bfa" />
            <circle cx="16" cy="8" r="3" fill="#a78bfa" />
            <ellipse cx="8" cy="17" rx="5" ry="2" fill="#a78bfa" />
            <ellipse cx="16" cy="17" rx="5" ry="2" fill="#a78bfa" />
          </svg>
        }
        TitleOfFetch="Total Users"
        TitleOfHeader="Members"
        description="Manage your team and their access to Acme Inc"
        isLoadingFetchNumberOfFetchData={isLoadingFetchNumberOfUsers}
        numberIsFetched={statsData?.users}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search members by name or role"
      >
        {/* Modern Buttons */}
        {data?.length ? (
          <div className="flex justify-end gap-4 mt-2 mb-4 relative z-10">
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-4 py-2 hover:from-purple-600 hover:to-indigo-600 transition shadow"
              onClick={() => setIsOpenCreateModel(true)}
            >
              <Plus size={18} />
              Add new member
            </Button>
            <Button className="bg-gray-100 text-gray-700 rounded-xl py-2 px-4 shadow hover:bg-gray-200 transition">
              Manage permissions
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-4 mt-2 mb-4 relative z-10">
            <Button className="bg-gray-100 text-gray-700 rounded-xl py-2 px-4 shadow hover:bg-gray-200 transition">
              Manage permissions
            </Button>
          </div>
        )}
      </HeaderOfPages>
      {/* -------------------Table--------------------------  */}
      <Table header={["No", "_id", "first_name", "last_name", "email", "Role"]}>
        {paginatedMembers?.length ? (
          paginatedMembers.map(
            ({ _id, email, first_name, last_name, role }, idx) => (
              <tr key={_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  {idx + 1}-
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  {_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  {first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  {last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {role}
                </td>
                {/* ---------edit and delete------------ */}
                <td className="px-6 py-4 whitespace-nowrap space-x-2 text-end text-sm font-medium">
                  <Button className="inline-flex items-center bg-yellow-500 p-2 gap-x-2 rounded-lg border border-transparent">
                    <Shield
                      size={17}
                      color="white"
                      onClick={() => {
                        Dispatch(clickedIdAction(_id));
                        setIsOpenRoleModel(true);
                      }}
                    />
                  </Button>
                  <Button className="inline-flex items-center bg-blue-500 p-2 gap-x-2 rounded-lg border border-transparent">
                    <Eye
                      onClick={() => {
                        viewDetailsOfMember(_id);
                      }}
                      size={17}
                      color="white"
                    />
                  </Button>
                  <button
                    className="inline-flex items-center bg-[#523a77] p-2 gap-x-2 font-semibold rounded-lg border border-transparent"
                    onClick={() => {
                      setIsOpenUpdateModel(true);
                      setMemberToEdit({ _id, first_name, last_name, email });
                      Dispatch(clickedIdAction(_id));
                    }}
                  >
                    <Pencil size={17} color="white" />
                  </button>
                </td>
              </tr>
            )
          )
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
                  Add new member
                </Button>
              </div>
            </td>
          </tr>
        )}
      </Table>
      {/* Paginator */}
      <div className="mt-4">
        <Paginator
          page={currentPage}
          pageCount={totalPages}
          total={filteredMembers.length}
          isLoading={isLoading || isFetching}
          onClickPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onClickNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        />
      </div>
      {/* ----------Create Modal---------- */}
      {isOpenCreateModel && (
        <CreateNewMemberModal
          isOpen={isOpenCreateModel}
          setIsOpen={setIsOpenCreateModel}
        />
      )}
      {/* ----------Update Modal---------- */}
      {MemberToEdit && (
        <UpdateMemberModal
          memberData={MemberToEdit}
          isOpen={isOpenUpdateModel}
          setIsOpen={setIsOpenUpdateModel}
        />
      )}

      {/* ------------Delete Modal--------------- */}
      {isOpenRoleModel && (
        <DeleteModal
          isOpen={isOpenRoleModel}
          setIsOpen={setIsOpenRoleModel}
          title="Give Role"
          description="Are you sure you want to Give Role Admin to this Member?"
        >
          <button
            onClick={() => setIsOpenRoleModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700  text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              giveRoleAmind({
                _id: ClickedId,
                body: { role: "admin" },
              });
            }}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
          >
            {isLoadingGiveRole ? (
              <div className="flex gap-1 items-center justify-center">
                <Spinner />
                <span>Loading...</span>
              </div>
            ) : (
              " Confirm Role"
            )}
          </button>
        </DeleteModal>
      )}
    </div>
  );
};

export default Memberpage;
