import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import TabButton from "@/common/custom/TabButton";
import CommonHeader from "@/common/header/CommonHeader";
import type { ExerciseTabType } from "@/store/features/program/types/addExperience";
import type { ExerciseType } from "@/store/features/program/types/newProgram";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  ExercisePayloadSchema,
  type AddExercisePayload,
} from "./step/addSchema";

export const inputClass = {
  label: "block text-sm font-normal font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-sm border-[#A78BFA] rounded-lg outline-none",
  error: "text-red-500 text-sm mt-1",
};

interface StoredExercise {
  name: string;
  exerciseType: ExerciseType;
  exerciseFor: string;
  description?: string;
  defaultSet: number;
  defaultReps: number;
  sets: { weight: number; reps: number; rest: number; sequence: number }[];
}

interface ShowExerciseModalProps {
  setShowExerciseModal: (show: boolean) => void;
  onSelectExercise: (exercise: StoredExercise) => void;
  exerciseType: ExerciseTabType;
  setExerciseType: (type: ExerciseTabType) => void;
}

const ShowExerciseModal: React.FC<ShowExerciseModalProps> = ({
  setShowExerciseModal,
  onSelectExercise,
  exerciseType,
  setExerciseType,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddExercisePayload>({
    resolver: zodResolver(ExercisePayloadSchema),
    defaultValues: {
      tabType: "MAIN_EXERCISE",
      exerciseName: "",
      exerciseFor: "",
      exerciseDescription: "",
      setType: "Main",
      isOptional: false,
      accessoryNote: "",
      sortOrder: 0,
      sets: [{ setNumber: 1, reps: "05", restSeconds: 60 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sets",
  });

  const watchedSets = watch("sets");
  const watchedExerciseName = watch("exerciseName");

  const handleTabChange = (value: ExerciseTabType) => {
    setExerciseType(value);
    setValue("tabType", value);
  };

  const getTitle = () => {
    if (exerciseType === "BFR_EXERCISE") return `Add Exercise (BFR)`;
    if (exerciseType === "ABS_EXERCISE") return `Add Exercise (ABS)`;
    return `Add Main Exercise`;
  };

  const getExerciseType = (tab: ExerciseTabType): ExerciseType => {
    if (tab === "BFR_EXERCISE") return "BFR";
    if (tab === "ABS_EXERCISE") return "ABS";
    return "Main";
  };
  const onSubmit = (formValues: AddExercisePayload) => {
    const exercise: StoredExercise = {
      name: formValues.exerciseName,
      exerciseType: getExerciseType(exerciseType),
      exerciseFor: formValues.exerciseFor,
      description: formValues.exerciseDescription,
      defaultSet: formValues.sets.length,
      defaultReps: Math.round(Number(formValues.sets[0]?.reps ?? 0)),
      sets: formValues.sets.map((set, i) => ({
        weight: 0,
        reps: Math.round(Number(set.reps)),
        rest: set.restSeconds,
        sequence: i + 1,
      })),
    };

    onSelectExercise(exercise);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <CommonHeader size="xl">{getTitle()}</CommonHeader>
          <CloseButton action={() => setShowExerciseModal(false)} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <div className="flex gap-4 mb-6">
              <TabButton
                label="Main Exercise"
                value="MAIN_EXERCISE"
                activeValue={exerciseType}
                onChange={handleTabChange}
              />
              <TabButton
                label="BFR Exercise"
                value="BFR_EXERCISE"
                activeValue={exerciseType}
                onChange={handleTabChange}
              />
              <TabButton
                label="ABS Exercise"
                value="ABS_EXERCISE"
                activeValue={exerciseType}
                onChange={handleTabChange}
              />
            </div>

            {exerciseType === "MAIN_EXERCISE" && (
              <div className="bg-darkBlue/20 border border-darkBlue rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Exercise Name :</span>{" "}
                  {watchedExerciseName}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Set : {fields.length} &nbsp;&nbsp;&nbsp; Rep :{" "}
                  {watchedSets?.[0]?.reps || "0"} &nbsp;&nbsp;&nbsp; Rest :{" "}
                  {watchedSets?.[0]?.restSeconds || "0"}
                </p>
              </div>
            )}

            <div className="space-y-6 border border-darkBlue rounded-lg p-5">
              {/* Exercise Name */}
              <div>
                <label className={inputClass.label}>Exercise Name</label>
                <input
                  type="text"
                  {...register("exerciseName")}
                  className={inputClass.input}
                  placeholder="Enter exercise name"
                />
                {errors.exerciseName && (
                  <p className={inputClass.error}>
                    {errors.exerciseName.message}
                  </p>
                )}
              </div>

              {/* Exercise For */}
              <div>
                <label className={inputClass.label}>Exercise For</label>
                <input
                  type="text"
                  {...register("exerciseFor")}
                  className={inputClass.input}
                  placeholder="e.g., Chest, Back, Legs"
                />
                {errors.exerciseFor && (
                  <p className={inputClass.error}>
                    {errors.exerciseFor.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={inputClass.label}>Description</label>
                <textarea
                  rows={4}
                  {...register("exerciseDescription")}
                  className={inputClass.input}
                  placeholder="Enter exercise description"
                />
                {errors.exerciseDescription && (
                  <p className={inputClass.error}>
                    {errors.exerciseDescription.message}
                  </p>
                )}
              </div>

              {/* Sets */}
              <div>
                <label className={inputClass.label}>Set</label>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4">
                      <div className="flex-shrink-0 w-24">
                        <div className="bg-[#8B5CF6] text-white px-4 py-3 rounded-lg text-center font-medium">
                          Set {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 w-full">
                        <label className={inputClass.label}>Reps</label>
                        <input
                          type="text"
                          {...register(`sets.${index}.reps`)}
                          className={inputClass.input}
                        />
                        {errors.sets?.[index]?.reps && (
                          <p className={inputClass.error}>
                            {errors.sets[index]?.reps?.message}
                          </p>
                        )}
                      </div>

                      <div className="flex-1 flex items-end gap-2 w-full">
                        <div className="flex-1">
                          <label className={inputClass.label}>
                            Rest (seconds)
                          </label>
                          <input
                            type="number"
                            {...register(`sets.${index}.restSeconds`, {
                              valueAsNumber: true,
                            })}
                            className={inputClass.input}
                          />
                          {errors.sets?.[index]?.restSeconds && (
                            <p className={inputClass.error}>
                              {errors.sets[index]?.restSeconds?.message}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="cursor-pointer"
                        >
                          <RiDeleteBin5Line className="w-6 h-6 text-blue" />
                        </button>
                      </div>

                      {exerciseType === "BFR_EXERCISE" && (
                        <div className="flex-1 w-full">
                          <label className={inputClass.label}>Notes</label>
                          <input
                            type="text"
                            {...register(`sets.${index}.notes` as any)}
                            className={inputClass.input}
                            placeholder="e.g. Rest-pause"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-10">
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        setNumber: fields.length + 1,
                        reps: "05",
                        restSeconds: 60,
                      } as any)
                    }
                    className="bg-darkPurple cursor-pointer text-white rounded-full p-2 hover:bg-[#7C3AED] transition-colors"
                  >
                    <LuPlus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <CommonButton type="submit">Save Exercise</CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowExerciseModal;
