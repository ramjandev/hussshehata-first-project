import ActionButton from "@/common/button/ActionButton";
import type { ExerciseSingle } from "@/store/features/program/types/newProgram";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import { IoVideocamOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import AddExerciseAnimationModal from "./AddExerciseAnimationModal";
import AddExerciseImageModal from "./AddExerciseImageModal";
import ExerciseModal from "./ExerciseModal";
import SetTable from "./SetTable";
interface ExerciseProps {
  exercise: ExerciseSingle;
  index: number;
}

const ExerciseCard: React.FC<ExerciseProps> = ({ exercise, index }) => {
  const [open, setOpen] = useState(index === 0);

  const [uploadType, setUploadType] = useState<
    "image" | "animation" | "editExercise" | null
  >(null);
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseSingle | null>(null);

  const closeModal = () => setUploadType(null);

  const setsCount = exercise.sets.length;
  const repsLabel = exercise.defaultReps;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Exercise Row Header */}
        <div
          className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* Exercise name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">
                {exercise.name}
              </span>
              <span className="text-xs text-slate-400">
                {setsCount} × {repsLabel}
              </span>
            </div>
            <p className="text-xs text-white bg-purple w-fit mt-0.5 py-1 px-2 rounded-2xl">
              {exercise.exerciseFor}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-blue px-2 py-0.5 text-xs text-white">
                Sets: {setsCount}
              </span>
              <span className="rounded-md bg-blue px-2 py-0.5 text-xs text-white">
                Reps: {repsLabel}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex shrink-0 items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <ActionButton
              title="Edit exercise"
              variant="add"
              onClick={() => {
                setSelectedExercise(exercise);
                setUploadType("editExercise");
              }}
            >
              <MdModeEdit className="size-5" />
            </ActionButton>
          </div>

          <RiArrowDownSLine
            className={`shrink-0 text-xl  transition-transform duration-300 ${open ? "rotate-180 text-blue" : "text-slate-400"}`}
          />
        </div>

        <div
          className={`grid transition-all duration-300 ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-slate-100 px-4 pb-4 pt-3 space-y-3">
              <div className="flex items-start justify-between gap-4">
                {exercise.image ? (
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="h-24 w-24 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                ) : (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 text-2xl font-black text-indigo-400 border border-indigo-100">
                    {index + 1}
                  </div>
                )}

                <div className="flex  gap-2 items-end">
                  <ActionButton
                    title="Add image"
                    variant="add"
                    onClick={() => setUploadType("image")}
                  >
                    <FiImage className="size-5" />
                  </ActionButton>
                  <ActionButton
                    title="Add animation"
                    variant="add"
                    onClick={() => setUploadType("animation")}
                  >
                    <IoVideocamOutline className="size-5" />
                  </ActionButton>
                </div>
              </div>

              {/* Description */}
              {exercise.description && (
                <p className="text-xs italic text-slate-500">
                  {exercise.description}
                </p>
              )}

              {exercise.animation && (
                <video
                  src={exercise.animation}
                  controls
                  className="h-48 w-full rounded-xl object-cover"
                />
              )}

              <SetTable sets={exercise.sets} />
            </div>
          </div>
        </div>
      </div>

      <AddExerciseImageModal
        isOpen={uploadType === "image"}
        onClose={closeModal}
        exerciseId={exercise.id}
      />
      <AddExerciseAnimationModal
        isOpen={uploadType === "animation"}
        onClose={closeModal}
        exerciseId={exercise.id}
      />
      <ExerciseModal
        isOpen={uploadType === "editExercise"}
        onClose={closeModal}
        defaultValues={selectedExercise as ExerciseSingle}
      />
    </>
  );
};

export default ExerciseCard;
