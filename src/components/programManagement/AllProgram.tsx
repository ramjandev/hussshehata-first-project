import ActionButton from "@/common/button/ActionButton";
import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import SectionHeader from "@/common/button/SectionHeader";
import CommonSelect from "@/common/custom/CommonSelect";
import {
  useDeleteProgramMutation,
  useGetallProgramQuery,
  usePublishProgramMutation,
  useToggleProgramMutation,
} from "@/store/features/program/programAPI";
import type { Programme } from "@/store/features/program/types/allProgram";
import type { publishedStatus } from "@/store/features/program/types/newProgram";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { MdPublishedWithChanges } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ProgramUpdateModalForBasic from "./programDetails/ProgramUpdateModalForBasic";

export const getLevelColor = (level: string) => {
  switch (level) {
    case "Advanced":
      return "bg-red-100 text-red-700";
    case "Beginner":
      return "bg-green-100 text-green-700";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const AllProgram = () => {
  const [status, setStatus] = useState<publishedStatus | "ALL">("ALL");
  const { data, isLoading } = useGetallProgramQuery(
    {
      publishedStatus: status === "ALL" ? undefined : status,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [selectedProgram, setSelectedProgram] = useState<Programme | null>(
    null,
  );
  const programs = data?.data?.data || [];
  const navigate = useNavigate();

  const list = new Array(10).fill(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteProgram] = useDeleteProgramMutation();
  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteProgram(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [publishProgram] = usePublishProgramMutation();
  const handlePublish = async (id: string) => {
    try {
      setPublishingId(id);
      await publishProgram(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setPublishingId(null);
    }
  };

  const [toggleId, setToggleId] = useState(null);
  const [programToggle] = useToggleProgramMutation();

  const handleToggle = async (id: string) => {
    try {
      setToggleId(id);
      await programToggle(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setToggleId(null);
    }
  };
  return (
    <div>
      {isLoading ? (
        list.map((_, index) => <DashboardCardSkeleton key={index} />)
      ) : programs?.length > 0 ? (
        <div>
          <div className="pb-4 flex justify-end">
            <CommonSelect
              onValueChange={setStatus}
              value={status}
              item={[
                { label: "All", value: "ALL" },
                { label: "Publish", value: "PUBLISHED" },
                { label: "Draft", value: "DRAFT" },
              ]}
              placeholder="Select Status"
            />
          </div>
          <div className="space-y-4">
            {programs.map((program) => (
              <div className="flex flex-col gap-4">
                <div
                  key={program.id}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <SectionHeader
                        title={program.name}
                        description=""
                        className="!mb-0 line-clamp-1!"
                      />

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium hidden md:block ${getLevelColor(program.status)}`}
                      >
                        {program.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ActionButton
                        onClick={() => handleToggle(program.id)}
                        variant="edit"
                      >
                        {!program.isPremium ? "Make basic" : "Make premium"}
                      </ActionButton>

                      <ActionButton
                        onClick={() => {
                          handlePublish(program.id);
                        }}
                        isDelete={publishingId === program.id}
                      >
                        {publishingId === program.id ? (
                          <ButtonWithLoading title="Publishing.." />
                        ) : (
                          <>
                            <MdPublishedWithChanges className="w-4 h-4" />
                            Publish
                          </>
                        )}
                      </ActionButton>
                      <ActionButton
                        onClick={() => {
                          navigate(
                            `/dashboard/program-management/${program.id}`,
                          );
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </ActionButton>
                      <ActionButton
                        onClick={() => {
                          setSelectedProgram(program);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDelete(program.id)}
                        isDelete={deletingId === program.id}
                        variant="delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </ActionButton>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Duration</p>
                      <p className="text-sm font-medium text-gray-900">
                        {program.weeks.length} weeks
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Enrolment</p>
                      <p className="text-sm font-medium text-gray-900">452</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-5">
          <p className="text-center text-gray-600">No program found</p>
        </div>
      )}

      <ProgramUpdateModalForBasic
        isOpen={!!selectedProgram}
        onClose={() => {
          setSelectedProgram(null);
        }}
        defaultValues={selectedProgram}
      />
    </div>
  );
};

export default AllProgram;
