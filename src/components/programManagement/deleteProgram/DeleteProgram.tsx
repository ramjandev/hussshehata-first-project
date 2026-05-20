import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/button/SectionHeader";
import {
  useGetallDeletedProgramQuery,
  useGetBackDeletedProgramMutation,
} from "@/store/features/program/programAPI";
import { useState } from "react";
import { getLevelColor } from "../AllProgram";

const DeleteProgram = () => {
  const { data: deletedProgram } = useGetallDeletedProgramQuery();

  const programData = deletedProgram?.data?.data ?? [];
  const [restoreProgram] = useGetBackDeletedProgramMutation();
  const [selectProgamId, setSelectProgamId] = useState<string | null>(null);
  const handleRestore = async (id: string) => {
    try {
      setSelectProgamId(id);
      await restoreProgram(id).unwrap();
    } catch (error) {
      console.error(error);
    }
    setSelectProgamId(null);
  };
  return (
    <div className="space-y-6">
      {programData.length === 0 && <p>No deleted programs found</p>}
      {programData.map((program) => (
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
                  disabled={selectProgamId === program.id}
                  onClick={() => handleRestore(program.id)}
                >
                  {selectProgamId === program.id ? (
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
      ))}
    </div>
  );
};

export default DeleteProgram;
