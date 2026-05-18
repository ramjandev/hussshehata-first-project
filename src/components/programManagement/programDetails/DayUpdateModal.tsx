import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSwitch from "@/common/custom/CommonSwitch";
import ModalContainer from "@/common/custom/ModalContainer";
import { useUpdateDayMutation } from "@/store/features/program/programAPI";
import type { TrainingDaySingle } from "@/store/features/program/types/newProgram";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { inputClass } from "../modal/showExerciseModal";

export const daySchema = z.object({
  programId: z.string().min(1, "Program ID is required"),
  weekId: z.string().min(1, "Week ID is required"),
  dayNumber: z.number().min(1, "Day number is required"),
  dayFocus: z.string().min(1, "Day focus is required"),
  dayFocusMuscle: z.array(z.string()).min(1, "At least one muscle required"),
  trainingMethodId: z.string().min(1, "Training method is required"),
  description: z.string().min(1, "Description is required"),
  executeHint: z.string().min(1, "Execute hint is required"),
  isEnableBFR: z.boolean(),
  isEnableABS: z.boolean(),
});

export type DayPayload = z.infer<typeof daySchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: TrainingDaySingle | null;
};

const DayUpdateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const [updateDay, { isLoading }] = useUpdateDayMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<DayPayload>({
    resolver: zodResolver(daySchema),
    defaultValues: {
      programId: "",
      weekId: "",
      dayNumber: 1,
      dayFocus: "",
      dayFocusMuscle: [],
      trainingMethodId: "",
      description: "",
      executeHint: "",
      isEnableBFR: false,
      isEnableABS: false,
    },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      reset({
        programId: defaultValues.programId,
        weekId: defaultValues.weekId,
        dayNumber: defaultValues.dayNumber,
        dayFocus: defaultValues.dayFocus,
        dayFocusMuscle: defaultValues.dayFocusMuscle,
        trainingMethodId: defaultValues.trainingMethodId,
        description: defaultValues.description,
        executeHint: defaultValues.executeHint,
        isEnableBFR: defaultValues.isEnableBFR,
        isEnableABS: defaultValues.isEnableABS,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const submitHandler = async (data: DayPayload) => {
    try {
      await updateDay({ dayId: defaultValues!.id, data: data }).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle muscle tag input
  const muscles = watch("dayFocusMuscle");

  const handleMuscleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();
      if (value && !muscles.includes(value)) {
        setValue("dayFocusMuscle", [...muscles, value], {
          shouldValidate: true,
        });
        input.value = "";
      }
    }
  };

  const removeMuscle = (muscle: string) => {
    setValue(
      "dayFocusMuscle",
      muscles.filter((m) => m !== muscle),
      { shouldValidate: true },
    );
  };

  if (!isOpen) return null;

  return (
    <ModalContainer onClose={onClose} title="Update Day" size="2xl">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-h-[70vh] space-y-3 overflow-y-auto pr-1"
      >
        <div>
          <label className={inputClass.label}>Day Number</label>
          <input
            type="number"
            placeholder="Day Number"
            {...register("dayNumber", { valueAsNumber: true })}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.dayNumber?.message}</p>
        </div>

        <div>
          <label className={inputClass.label}>Day Focus</label>
          <input
            placeholder="Day Focus (e.g. Push Day)"
            {...register("dayFocus")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.dayFocus?.message}</p>
        </div>

        <div>
          <label className={inputClass.label}>Day Focus Muscle</label>
          <div className={inputClass.input}>
            <div className="mb-1 flex flex-wrap gap-1">
              {muscles.map((muscle) => (
                <span
                  key={muscle}
                  className="flex items-center gap-1 rounded-full bg-blue px-2 py-0.5 text-xs text-white "
                >
                  {muscle}
                  <button
                    type="button"
                    onClick={() => removeMuscle(muscle)}
                    className="leading-none cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              placeholder="Add muscle, press Enter"
              onKeyDown={handleMuscleKeyDown}
              className="w-full outline-none text-sm"
            />
          </div>
          <p className={inputClass.error}>{errors.dayFocusMuscle?.message}</p>
        </div>

        <div>
          <label className={inputClass.label}>Description</label>
          <textarea
            placeholder="Description"
            {...register("description")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.description?.message}</p>
        </div>

        <div>
          <label className={inputClass.label}>Execute Hint</label>
          <textarea
            placeholder="Execute Hint"
            {...register("executeHint")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.executeHint?.message}</p>
        </div>

        <div className="flex gap-2 pt-1">
          <label className="flex items-center gap-2 text-sm">
            <CommonSwitch
              checked={watch("isEnableBFR")}
              onChange={(value) => setValue("isEnableBFR", value)}
            />

            <span>BFR</span>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <CommonSwitch
              checked={watch("isEnableABS")}
              onChange={(value) => setValue("isEnableABS", value)}
            />

            <span>ABS</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
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

export default DayUpdateModal;
