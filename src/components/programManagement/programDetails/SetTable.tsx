import ActionButton from "@/common/button/ActionButton";
import { useDeleteSetMutation } from "@/store/features/program/programAPI";
import type { WorkoutSetSingle } from "@/store/features/program/types/newProgram";
import { useState } from "react";
import AddSetModal from "./AddSetModal";

interface ExerciseSetProps {
  sets: WorkoutSetSingle[];
}

const SetTable: React.FC<ExerciseSetProps> = ({ sets }) => {
  if (!sets.length) return null;
  const [deleteSet] = useDeleteSetMutation();
  const [isSetOpen, setIsSetOpen] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteSet(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue text-white">
              <th className="px-4 py-3 text-center text-xs font-semibold">
                Sets
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold">
                Reps
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold">
                Rest
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sets.map((set, index) => (
              <tr
                key={set.exerciseId}
                className={`border-t border-slate-100 text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <td className="px-4 py-3 text-sm font-medium text-black">
                  {set.sequence}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-black ">
                  {set.reps}
                </td>

                <td className="px-4 py-3 text-sm text-black font-medium ">
                  {set.rest}sec
                </td>
                <td className="px-4 py-3 text-sm text-black font-medium ">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      variant="edit"
                      className="px-2! py-1! text-[12px]!"
                      onClick={() => {
                        setIsSetOpen(true);
                        setSelectedSetId(set.exerciseId);
                      }}
                    >
                      Add
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      className="px-2! py-1! text-[12px]!"
                      onClick={() => handleDelete(set.id)}
                    >
                      Delete
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedSetId && (
        <AddSetModal
          exerciseId={selectedSetId!}
          isOpen={isSetOpen}
          onClose={() => {
            (setIsSetOpen(false), setSelectedSetId(null));
          }}
        />
      )}
    </div>
  );
};

export default SetTable;
