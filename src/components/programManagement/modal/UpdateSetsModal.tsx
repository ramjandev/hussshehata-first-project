import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import { z } from "zod";
import { inputClass } from "./showExerciseModal";

interface WorkoutSet {
  weight: number;
  reps: number;
  rest: number;
  sequence: number;
}

export interface ExerciseForModal {
  name: string;
  defaultSet: number;
  defaultReps: number;
  sets: WorkoutSet[];
}

const exerciseSetsSchema = z.object({
  sets: z.array(
    z.object({
      reps: z.string().min(1, "Reps required"),
      rest: z.number().min(0, "Rest required"),
      weight: z.number().min(0),
    }),
  ),
});

type ExerciseSets = z.infer<typeof exerciseSetsSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectSet: ExerciseForModal | null;
  onSave: (updatedSets: WorkoutSet[]) => void;
}

const UpdateSetsModal = ({ isOpen, onClose, selectSet, onSave }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExerciseSets>({
    resolver: zodResolver(exerciseSetsSchema),
    defaultValues: { sets: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "sets" });

  useEffect(() => {
    if (selectSet?.sets?.length) {
      reset({
        sets: selectSet.sets.map((s) => ({
          reps: String(s.reps),
          rest: s.rest,
          weight: s.weight,
        })),
      });
    } else {
      reset({ sets: [{ reps: "", rest: 60, weight: 0 }] });
    }
  }, [selectSet, reset]);

  const onSubmit = (formValues: ExerciseSets) => {
    const updatedSets: WorkoutSet[] = formValues.sets.map((s, i) => ({
      weight: s.weight,
      reps: Math.round(Number(s.reps)),
      rest: s.rest,
      sequence: i + 1,
    }));
    onSave(updatedSets);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl relative">
        <div className="flex justify-between px-6 pt-6">
          <CommonHeader size="lg" className="text-gray-900">
            Update Exercise Sets
          </CommonHeader>
          <CloseButton action={onClose} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 gap-3">
              <div className="flex items-end pb-3">
                <span className="text-sm font-medium text-gray-700">
                  Set {index + 1}
                </span>
              </div>

              {/* Reps */}
              <div>
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

              {/* Rest */}
              <div>
                <label className={inputClass.label}>Rest (s)</label>
                <input
                  type="number"
                  {...register(`sets.${index}.rest`, { valueAsNumber: true })}
                  className={inputClass.input}
                />
                {errors.sets?.[index]?.rest && (
                  <p className={inputClass.error}>
                    {errors.sets[index]?.rest?.message}
                  </p>
                )}
              </div>

              {/* Delete */}
              <div className="flex items-end pb-2">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="cursor-pointer"
                >
                  <RiDeleteBin5Line className="w-6 h-6 text-blue" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ reps: "", rest: 60, weight: 0 })}
            className="text-sm text-blue font-medium cursor-pointer"
          >
            + Add Set
          </button>

          <div className="flex justify-end gap-3 pt-4">
            <CommonButton variant="secondary" onClick={onClose}>
              Cancel
            </CommonButton>
            <CommonButton type="submit">Update</CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSetsModal;
