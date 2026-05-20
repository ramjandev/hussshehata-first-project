import ActionButton from "@/common/button/ActionButton";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  next,
  prev,
  updateProgram,
} from "@/store/baseApi/programSlice/program.slice";
import type { ExerciseTabType } from "@/store/features/program/types/addExperience";
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

interface StoredExercise {
  name: string;
  exerciseType: ExerciseType;
  exerciseFor: string;
  description?: string;
  defaultSet: number;
  defaultReps: number;
  sets: WorkoutSet[];
}

interface ExerciseContext {
  weekIndex: number;
  dayIndex: number;
  exerciseType: ExerciseType;
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
    exerciseType: ExerciseType;
    exerciseIndex: number;
  } | null>(null);

  const handleOpenAddExercise = (
    weekIndex: number,
    dayIndex: number,
    exerciseType: ExerciseType,
  ) => {
    setExerciseContext({ weekIndex, dayIndex, exerciseType });
    setShowExerciseModal(true);
  };

  console.log("program", program);
  // AddExercises.tsx
  const handleAddExercise = (exercise: StoredExercise) => {
    if (!exerciseContext) return;
    const { weekIndex, dayIndex } = exerciseContext;

    const updatedWeeks = weeks.map((week, wIdx) => {
      if (wIdx !== weekIndex) return week;
      return {
        ...week,
        days: week.days.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day;
          const currentExercises = day.exercises ?? [];
          return {
            ...day,
            exercises: [...currentExercises, exercise],
          };
        }),
      };
    });

    dispatch(updateProgram({ weeks: updatedWeeks }));
    setShowExerciseModal(false);
    setExerciseContext(null);
  };

  const handleDeleteExercise = (
    weekIndex: number,
    dayIndex: number,
    exerciseType: ExerciseType,
    exerciseIndex: number,
  ) => {
    const typeExercises = getExercisesByType(
      weeks[weekIndex]?.days[dayIndex]?.exercises ?? [],
      exerciseType,
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

  const handleOpenEditExercise = (
    weekIndex: number,
    dayIndex: number,
    exerciseType: ExerciseType,
    exerciseIndex: number,
  ) => {
    const typeExercises = getExercisesByType(
      weeks[weekIndex]?.days[dayIndex]?.exercises ?? [],
      exerciseType,
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
    setEditContext({ weekIndex, dayIndex, exerciseType, exerciseIndex });
    setShowSetModal(true);
  };

  const handleSaveUpdatedSets = (updatedSets: WorkoutSet[]) => {
    if (!editContext) return;
    const { weekIndex, dayIndex, exerciseType, exerciseIndex } = editContext;

    const typeExercises = getExercisesByType(
      weeks[weekIndex]?.days[dayIndex]?.exercises ?? [],
      exerciseType,
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

  // controlled by UpdateSetsModal
  const [exerciseType, setExerciseType] =
    useState<ExerciseTabType>("MAIN_EXERCISE");
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
              const mainExercises = getExercisesByType(allExercises, "Main");
              const bfrExercises = getExercisesByType(allExercises, "BFR");
              const absExercises = getExercisesByType(allExercises, "ABS");

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
                        onClick={() => {
                          handleOpenAddExercise(weekIndex, dayIndex, "Main");
                          setExerciseType("MAIN_EXERCISE");
                        }}
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
                                    "Main",
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
                                    "Main",
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
                        onClick={() => {
                          handleOpenAddExercise(weekIndex, dayIndex, "BFR");
                          setExerciseType("BFR_EXERCISE");
                        }}
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
                                    "BFR",
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
                                    "BFR",
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
                        onClick={() => {
                          handleOpenAddExercise(weekIndex, dayIndex, "ABS");

                          setExerciseType("ABS_EXERCISE");
                        }}
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
                                    "ABS",
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
                                    "ABS",
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
          exerciseType={exerciseType}
          setExerciseType={setExerciseType}
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

function getExercisesByType(
  exercises: StoredExercise[],
  type: ExerciseType,
): StoredExercise[] {
  return exercises.filter((ex) => ex.exerciseType === type);
}

export default AddExercises;
