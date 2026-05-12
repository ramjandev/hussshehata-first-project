import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import ModalContainer from "@/common/custom/ModalContainer";
import { useUpdateExerciseMutation } from "@/store/features/program/programAPI";
import type { ExerciseSingle } from "@/store/features/program/types/newProgram";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { inputClass } from "../modal/showExerciseModal";

export const exerciseSchema = z.object({
  dayId: z.string().min(1, "Day ID is required"),
  name: z.string().min(1, "Exercise name is required"),
  exerciseFor: z.string().min(1, "Exercise target is required"),
  description: z.string().min(1, "Description is required"),
  defaultSet: z.number().min(1, "Minimum 1 set required"),
  defaultReps: z.number().min(1, "Minimum 1 rep required"),
});

export type ExercisePayload = z.infer<typeof exerciseSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: ExerciseSingle | null;
};

const ExerciseModal: React.FC<Props> = ({ isOpen, onClose, defaultValues }) => {
  const [updateExercise, { isLoading }] = useUpdateExerciseMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExercisePayload>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      dayId: defaultValues?.dayId ?? "",
      name: defaultValues?.name ?? "",
      exerciseFor: defaultValues?.exerciseFor ?? "",
      description: defaultValues?.description ?? "",
      defaultSet: defaultValues?.defaultSet ?? 1,
      defaultReps: defaultValues?.defaultReps ?? 1,
    },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      reset({
        dayId: defaultValues.dayId,
        name: defaultValues.name,
        exerciseFor: defaultValues.exerciseFor,
        description: defaultValues.description ?? "",
        defaultSet: defaultValues.defaultSet,
        defaultReps: defaultValues.defaultReps,
      });
    }
  }, [isOpen, defaultValues, reset]);
  const submitHandler = async (data: ExercisePayload) => {
    try {
      await updateExercise({ exerciseId: defaultValues!.id, data }).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer title="Update Exercise" onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
        <div>
          <label className={inputClass.label}> Day ID</label>
          <input
            placeholder="Day ID"
            {...register("dayId")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.dayId?.message}</p>
        </div>

        {/* Name */}
        <div>
          <label className={inputClass.label}> Exercise Name</label>
          <input
            placeholder="Exercise Name"
            {...register("name")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.name?.message}</p>
        </div>

        {/* Exercise For */}
        <div>
          <label className={inputClass.label}> Exercise For</label>
          <input
            placeholder="Exercise For"
            {...register("exerciseFor")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.exerciseFor?.message}</p>
        </div>

        {/* Description */}
        <div>
          <label className={inputClass.label}>Description</label>
          <textarea
            placeholder="Description"
            {...register("description")}
            className={inputClass.input}
          />
        </div>

        {/* Sets */}
        <div>
          <label className={inputClass.label}>Default Sets</label>
          <input
            type="number"
            placeholder="Default Sets"
            {...register("defaultSet", { valueAsNumber: true })}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.defaultSet?.message}</p>
        </div>

        {/* Reps */}
        <div>
          <label className={inputClass.label}>Default Reps</label>
          <input
            type="number"
            placeholder="Default Reps"
            {...register("defaultReps", { valueAsNumber: true })}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.defaultReps?.message}</p>
        </div>

        <div className="flex justify-end gap-3 pt-5">
          <CommonButton variant="secondary" onClick={onClose}>
            Cancel
          </CommonButton>
          <CommonButton disabled={isLoading} type="submit">
            {isLoading ? <ButtonWithLoading title="Saving..." /> : "Update"}
          </CommonButton>
        </div>
      </form>
    </ModalContainer>
  );
};

export default ExerciseModal;
