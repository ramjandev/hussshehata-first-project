import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import SectionHeader from "@/common/button/SectionHeader";
import {
  useGetallDeletedProgramQuery,
  useGetBackDeletedProgramMutation,
} from "@/store/features/program/programAPI";
import { useState } from "react";
import { getLevelColor } from "../AllProgram";

const DeleteProgram = () => {
  const { data: deletedProgram, isLoading } = useGetallDeletedProgramQuery();
  const list = new Array(10).fill(null);
  const programData = deletedProgram?.data?.data ?? [];
  const [restoreProgram] = useGetBackDeletedProgramMutation();
  const [selectProgramId, setSelectProgramId] = useState<string | null>(null);
  const handleRestore = async (id: string) => {
    try {
      setSelectProgramId(id);
      await restoreProgram(id).unwrap();
    } catch (error) {
      console.error(error);
    }
    setSelectProgramId(null);
  };
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Deleted Programs</h3>
      {isLoading ? (
        list.map((_, index) => <DashboardCardSkeleton key={index} />)
      ) : programData.length > 0 ? (
        programData.map((program) => (
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
                  <CommonButton
                    disabled={selectProgramId === program.id}
                    onClick={() => handleRestore(program.id)}
                  >
                    {selectProgramId === program.id ? (
                      <ButtonWithLoading title="Restoring..." />
                    ) : (
                      "Restore"
                    )}
                  </CommonButton>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-sm font-medium text-gray-900">
                    {program.description}
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No deleted programs found</p>
      )}
    </div>
  );
};

export default DeleteProgram;
