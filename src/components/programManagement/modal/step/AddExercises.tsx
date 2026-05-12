import ActionButton from "@/common/button/ActionButton";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  next,
  prev,
  updateProgram,
} from "@/store/baseApi/programSlice/program.slice";
import type { ExerciseType } from "@/store/features/program/types/newProgram";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ShowExerciseModal from "../showExerciseModal";
import UpdateSetsModal, { type ExerciseForModal } from "../UpdateSetsModal";

interface WorkoutSet {
  weight: number;
  reps: number;
  rest: number;
  sequence: number;
}

// Shape of a single exercise stored in the program slice
interface StoredExercise {
  name: string;
  exerciseType: ExerciseType;
  exerciseFor: string; // "main" | "bfr" | "abs"
  description?: string;
  defaultSet: number;
  defaultReps: number;
  sets: WorkoutSet[];
}

// Context passed down to modals so they know where to save
interface ExerciseContext {
  weekIndex: number;
  dayIndex: number;
  exerciseFor: "main" | "bfr" | "abs";
}

const AddExercises = () => {
  const dispatch = useAppDispatch();
  const { program } = useAppSelector((state) => state.program);

  const weeks = program?.weeks ?? [];

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exerciseContext, setExerciseContext] =
    useState<ExerciseContext | null>(null);

  const [showSetModal, setShowSetModal] = useState(false);
  const [selectSet, setSelectSet] = useState<ExerciseForModal | null>(null);
  const [editContext, setEditContext] = useState<{
    weekIndex: number;
    dayIndex: number;
    exerciseFor: "main" | "bfr" | "abs";
    exerciseIndex: number;
  } | null>(null);

  // Open "Add Exercise" modal with context of which day/week/type
  const handleOpenAddExercise = (
    weekIndex: number,
    dayIndex: number,
    exerciseFor: "main" | "bfr" | "abs",
  ) => {
    setExerciseContext({ weekIndex, dayIndex, exerciseFor });
    setShowExerciseModal(true);
  };

  // Called by ShowExerciseModal when user picks an exercise
  const handleAddExercise = (exercise: StoredExercise) => {
    if (!exerciseContext) return;
    const { weekIndex, dayIndex, exerciseFor } = exerciseContext;

    const updatedWeeks = weeks.map((week, wIdx) => {
      if (wIdx !== weekIndex) return week;
      return {
        ...week,
        days: week.days.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day;
          const currentExercises = day.exercises ?? [];
          return {
            ...day,
            exercises: [...currentExercises, { ...exercise, exerciseFor }],
          };
        }),
      };
    });

    dispatch(updateProgram({ weeks: updatedWeeks }));
    setShowExerciseModal(false);
    setExerciseContext(null);
  };

  // Delete an exercise from a specific day
  const handleDeleteExercise = (
    weekIndex: number,
    dayIndex: number,
    exerciseFor: "main" | "bfr" | "abs",
    exerciseIndex: number,
  ) => {
    const typeExercises = getExercisesByType(
      weeks[weekIndex]?.days[dayIndex]?.exercises ?? [],
      exerciseFor,
    );
    const targetExercise = typeExercises[exerciseIndex];

    const updatedWeeks = weeks.map((week, wIdx) => {
      if (wIdx !== weekIndex) return week;
      return {
        ...week,
        days: week.days.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day;
          return {
            ...day,
            exercises: (day.exercises ?? []).filter(
              (ex) => ex !== targetExercise,
            ),
          };
        }),
      };
    });

    dispatch(updateProgram({ weeks: updatedWeeks }));
  };

  // Open edit modal — passes WorkoutSet[] directly via ExerciseForModal
  const handleOpenEditExercise = (
    weekIndex: number,
    dayIndex: number,
    exerciseFor: "main" | "bfr" | "abs",
    exerciseIndex: number,
  ) => {
    const typeExercises = getExercisesByType(
      weeks[weekIndex]?.days[dayIndex]?.exercises ?? [],
      exerciseFor,
    );
    const exercise = typeExercises[exerciseIndex];
    if (!exercise) return;

    const forModal: ExerciseForModal = {
      name: exercise.name,
      defaultSet: exercise.defaultSet,
      defaultReps: exercise.defaultReps,
      sets: exercise.sets,
    };

    setSelectSet(forModal);
    setEditContext({ weekIndex, dayIndex, exerciseFor, exerciseIndex });
    setShowSetModal(true);
  };

  // Called by UpdateSetsModal when user saves — receives WorkoutSet[] directly
  const handleSaveUpdatedSets = (updatedSets: WorkoutSet[]) => {
    if (!editContext) return;
    const { weekIndex, dayIndex, exerciseFor, exerciseIndex } = editContext;

    const typeExercises = getExercisesByType(
      weeks[weekIndex]?.days[dayIndex]?.exercises ?? [],
      exerciseFor,
    );
    const originalExercise = typeExercises[exerciseIndex];

    const updatedWeeks = weeks.map((week, wIdx) => {
      if (wIdx !== weekIndex) return week;
      return {
        ...week,
        days: week.days.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day;
          return {
            ...day,
            exercises: (day.exercises ?? []).map((ex) => {
              if (ex !== originalExercise) return ex;
              return {
                ...ex,
                defaultSet: updatedSets.length,
                sets: updatedSets,
              };
            }),
          };
        }),
      };
    });

    dispatch(updateProgram({ weeks: updatedWeeks }));
    setShowSetModal(false);
    setSelectSet(null);
    setEditContext(null);
  };

  return (
    <div>
      <div className="space-y-6">
        <CommonHeader size="lg" className="">
          Day Split Configuration
        </CommonHeader>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="space-y-4">
            {(week.days ?? []).map((dayConfig, dayIndex) => {
              const allExercises = dayConfig.exercises ?? [];
              const mainExercises = getExercisesByType(allExercises, "main");
              const bfrExercises = getExercisesByType(allExercises, "bfr");
              const absExercises = getExercisesByType(allExercises, "abs");

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="border border-indigo-200 bg-indigo-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {week.name ?? weekIndex + 1}{" "}
                        <span className="text-[#6A7282]">
                          ({(week.trainingDays ?? []).length} workout days)
                        </span>
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Day {dayConfig.dayNumber}
                      </p>
                      <p className="text-sm text-gray-900">
                        {dayConfig.dayFocus} (
                        {dayConfig.isEnableBFR ? "BFR" : ""}
                        {dayConfig.isEnableABS ? " ABS" : ""})
                      </p>
                      <p className="text-xs text-gray-500">
                        Method: {dayConfig.trainingMethodId}
                      </p>
                      {(dayConfig.dayFocusMuscle ?? []).length > 0 && (
                        <p className="text-xs text-gray-400">
                          Muscles: {dayConfig.dayFocusMuscle.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Main Exercises */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <CommonHeader size="lg" className="">
                        Main exercises
                      </CommonHeader>

                      <ActionButton
                        variant="add"
                        onClick={() =>
                          handleOpenAddExercise(weekIndex, dayIndex, "main")
                        }
                        title="Add Main Exercise"
                      >
                        <Plus className="w-4 h-4" />
                      </ActionButton>
                    </div>

                    {mainExercises.length > 0 ? (
                      <div className="space-y-4">
                        {mainExercises.map((exercise, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center border border-blue rounded-lg p-4"
                          >
                            <p className="text-sm text-gray-700">
                              <span className="text-blue">{idx + 1}.</span>
                              {exercise.name}
                            </p>
                            <div className="flex gap-2">
                              <ActionButton
                                variant="edit"
                                onClick={() =>
                                  handleOpenEditExercise(
                                    weekIndex,
                                    dayIndex,
                                    "main",
                                    idx,
                                  )
                                }
                              >
                                <Edit2 size={16} />
                              </ActionButton>
                              <ActionButton
                                onClick={() =>
                                  handleDeleteExercise(
                                    weekIndex,
                                    dayIndex,
                                    "main",
                                    idx,
                                  )
                                }
                                variant="delete"
                              >
                                <Trash2 size={16} />
                              </ActionButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center mt-1">
                        No exercises added yet. Click "Plus Icon" to start
                        building this workout.
                      </p>
                    )}
                  </div>

                  {/* BFR Exercises */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <CommonHeader size="lg" className="">
                        Bfr Exercises
                      </CommonHeader>

                      <ActionButton
                        variant="add"
                        onClick={() =>
                          handleOpenAddExercise(weekIndex, dayIndex, "bfr")
                        }
                        title="Add Bfr Exercise"
                      >
                        <Plus className="w-4 h-4" />
                      </ActionButton>
                    </div>
                    {bfrExercises.length > 0 ? (
                      <div className="space-y-4 mt-4">
                        {bfrExercises.map((exercise, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center border border-blue rounded-lg p-4"
                          >
                            <p className="text-sm text-gray-700">
                              <span className="text-blue">{idx + 1}.</span>
                              {exercise.name}
                            </p>
                            <div className="flex gap-2">
                              <ActionButton
                                onClick={() =>
                                  handleOpenEditExercise(
                                    weekIndex,
                                    dayIndex,
                                    "bfr",
                                    idx,
                                  )
                                }
                                variant="edit"
                              >
                                <Edit2 size={16} />
                              </ActionButton>
                              <ActionButton
                                onClick={() =>
                                  handleDeleteExercise(
                                    weekIndex,
                                    dayIndex,
                                    "bfr",
                                    idx,
                                  )
                                }
                                variant="delete"
                              >
                                <Trash2 size={16} />
                              </ActionButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center mt-1">
                        No exercises added yet. Click "Plus Icon" to start
                        building this workout.
                      </p>
                    )}
                  </div>

                  {/* Abs Exercises */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <CommonHeader size="lg" className="">
                        Abs Exercises
                      </CommonHeader>

                      <ActionButton
                        variant="add"
                        onClick={() =>
                          handleOpenAddExercise(weekIndex, dayIndex, "abs")
                        }
                        title="Add Abs Exercise"
                      >
                        <Plus className="w-4 h-4" />
                      </ActionButton>
                    </div>
                    {absExercises.length > 0 ? (
                      <div className="space-y-4 mt-4">
                        {absExercises.map((exercise, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center border border-blue rounded-lg p-4"
                          >
                            <p className="text-sm text-gray-700">
                              <span className="text-blue">{idx + 1}.</span>
                              {exercise.name}
                            </p>
                            <div className="flex gap-2">
                              <ActionButton
                                onClick={() =>
                                  handleOpenEditExercise(
                                    weekIndex,
                                    dayIndex,
                                    "abs",
                                    idx,
                                  )
                                }
                                variant="edit"
                              >
                                <Edit2 size={16} />
                              </ActionButton>
                              <ActionButton
                                onClick={() =>
                                  handleDeleteExercise(
                                    weekIndex,
                                    dayIndex,
                                    "abs",
                                    idx,
                                  )
                                }
                                variant="delete"
                              >
                                <Trash2 size={16} />
                              </ActionButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center mt-1">
                        No exercises added yet. Click "Plus Icon" to start
                        building this workout.
                      </p>
                    )}
                  </div>

                  {dayConfig.executeHint && (
                    <p className="text-xs text-gray-400 mt-2 italic">
                      Note: {dayConfig.executeHint}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {weeks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">
            No week data available yet.
          </p>
        )}

        <div className="flex gap-4">
          <CommonButton variant="secondary" onClick={() => dispatch(prev())}>
            Previous
          </CommonButton>
          <CommonButton onClick={() => dispatch(next())}>
            Next Step
          </CommonButton>
        </div>
      </div>

      {showExerciseModal && (
        <ShowExerciseModal
          setShowExerciseModal={setShowExerciseModal}
          onSelectExercise={handleAddExercise}
        />
      )}
      {selectSet && (
        <UpdateSetsModal
          isOpen={showSetModal}
          onClose={() => {
            setShowSetModal(false);
            setSelectSet(null);
            setEditContext(null);
          }}
          selectSet={selectSet}
          onSave={handleSaveUpdatedSets}
        />
      )}
    </div>
  );
};

// Helper: filter exercises by their exerciseFor field
function getExercisesByType(
  exercises: StoredExercise[],
  type: "main" | "bfr" | "abs",
): StoredExercise[] {
  return exercises.filter((ex) => ex.exerciseFor === type);
}

export default AddExercises;
