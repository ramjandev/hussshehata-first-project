import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import ModalContainer from "@/common/custom/ModalContainer";
import { useAddSetMutation } from "@/store/features/program/programAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { inputClass } from "../modal/showExerciseModal";

const addSetSchema = z.object({
  weight: z
    .number({ error: "Weight is required" })
    .positive("Weight must be greater than 0"),
  reps: z
    .number({ error: "Reps is required" })
    .int("Reps must be a whole number")
    .min(1, "Minimum 1 rep required"),
  rest: z
    .number({ error: "Rest is required" })
    .int("Rest must be a whole number")
    .min(0, "Rest cannot be negative"),
});

type AddSetFormValues = z.infer<typeof addSetSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string | null;
};

const AddSetModal: React.FC<Props> = ({ isOpen, onClose, exerciseId }) => {
  const [addSet, { isLoading }] = useAddSetMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddSetFormValues>({
    resolver: zodResolver(addSetSchema),
    defaultValues: { weight: undefined, reps: undefined, rest: undefined },
  });

  // reset form whenever the modal opens fresh for a (possibly new) exercise
  useEffect(() => {
    if (isOpen) {
      reset({ weight: undefined, reps: undefined, rest: undefined });
    }
  }, [isOpen, exerciseId, reset]);

  const submitHandler = async (data: AddSetFormValues) => {
    if (!exerciseId) return; // guard, shouldn't happen if isOpen is gated correctly
    try {
      await addSet({ exerciseId, ...data }).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer title="Add Set" onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
        <div>
          <label className={inputClass.label}>Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g., 80.5"
            {...register("weight", { valueAsNumber: true })}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.weight?.message}</p>
        </div>

        <div>
          <label className={inputClass.label}>Reps</label>
          <input
            type="number"
            placeholder="e.g., 8"
            {...register("reps", { valueAsNumber: true })}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.reps?.message}</p>
        </div>

        <div>
          <label className={inputClass.label}>Rest (seconds)</label>
          <input
            type="number"
            placeholder="e.g., 90"
            {...register("rest", { valueAsNumber: true })}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.rest?.message}</p>
        </div>

        <div className="flex justify-end gap-3 pt-5">
          <CommonButton variant="secondary" onClick={onClose}>
            Cancel
          </CommonButton>
          <CommonButton disabled={isLoading} type="submit">
            {isLoading ? <ButtonWithLoading title="Saving..." /> : "Add Set"}
          </CommonButton>
        </div>
      </form>
    </ModalContainer>
  );
};

export default AddSetModal;
