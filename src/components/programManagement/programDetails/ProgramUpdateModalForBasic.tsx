import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import ModalContainer from "@/common/custom/ModalContainer";
import { useUpdateProgramBasicMutation } from "@/store/features/program/programAPI";
import type { Programme } from "@/store/features/program/types/allProgram";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { inputClass } from "../modal/showExerciseModal";

export const programSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()).min(1, "At least one feature required"),
  tags: z.array(z.string()).min(1, "At least one tag required"),
});

export type ProgramPayloadForBasic = z.infer<typeof programSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: Programme | null;
};

const ProgramUpdateModalForBasic: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const [updateProgram, { isLoading }] = useUpdateProgramBasicMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProgramPayloadForBasic>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: "",
      description: "",
      features: [],
      tags: ["sdafjh"],
    },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      reset({
        name: defaultValues.name,
        description: defaultValues.description,
        features: defaultValues.features,
        tags: defaultValues.tags,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const submitHandler = async (data: ProgramPayloadForBasic) => {
    try {
      await updateProgram({ programmeId: defaultValues!.id, data }).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const features = watch("features");

  const handleTagKeyDown =
    (field: "features" | "tags", current: string[]) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const input = e.currentTarget;
        const value = input.value.trim();
        if (value && !current.includes(value)) {
          setValue(field, [...current, value], { shouldValidate: true });
          input.value = "";
        }
      }
    };

  const removeItem = (
    field: "features" | "tags",
    current: string[],
    item: string,
  ) => {
    setValue(
      field,
      current.filter((v) => v !== item),
      { shouldValidate: true },
    );
  };

  if (!isOpen) return null;

  return (
    <ModalContainer onClose={onClose} title="Update Program" size="xl">
      <form onSubmit={handleSubmit(submitHandler)} className=" space-y-4">
        {/* Name */}
        <div>
          <label className={inputClass.label}>Program Name</label>
          <input
            placeholder="Program Name"
            {...register("name")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.name?.message}</p>
        </div>

        <div>
          <label className={inputClass.label}>Description</label>
          <textarea
            placeholder="Description"
            rows={3}
            {...register("description")}
            className={inputClass.input}
          />
          <p className={inputClass.error}>{errors.description?.message}</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Features</label>
          <div className="w-full rounded-lg border p-2">
            <div className="mb-1 flex flex-wrap gap-1">
              {features.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 rounded-full bg-blue px-2 py-0.5 text-xs text-white"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeItem("features", features, f)}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              placeholder="Add feature, press Enter"
              onKeyDown={handleTagKeyDown("features", features)}
              className="w-full text-sm outline-none"
            />
          </div>
          <p className={inputClass.error}>{errors.features?.message}</p>
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

export default ProgramUpdateModalForBasic;
