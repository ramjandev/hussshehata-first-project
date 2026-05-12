import { useUpdateProgramBasicMutation } from "@/store/features/program/programAPI";
import type { Programme } from "@/store/features/program/types/allProgram";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const [updateProgram] = useUpdateProgramBasicMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
  const tags = watch("tags");

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Update Program</h2>
          <button type="button" onClick={onClose}>
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-h-[70vh] space-y-3 overflow-y-auto pr-1"
        >
          {/* Name */}
          <div>
            <input
              placeholder="Program Name"
              {...register("name")}
              className="w-full rounded-lg border p-2 text-sm"
            />
            <p className="text-sm text-red-500">{errors.name?.message}</p>
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description"
              rows={3}
              {...register("description")}
              className="w-full rounded-lg border p-2 text-sm"
            />
            <p className="text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>

          {/* Features */}
          <div>
            <label className="mb-1 block text-sm font-medium">Features</label>
            <div className="w-full rounded-lg border p-2">
              <div className="mb-1 flex flex-wrap gap-1">
                {features.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-xs text-white"
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
            <p className="text-sm text-red-500">{errors.features?.message}</p>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1 block text-sm font-medium">Tags</label>
            <div className="w-full rounded-lg border p-2">
              <div className="mb-1 flex flex-wrap gap-1">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-xs text-white"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeItem("tags", tags, t)}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                placeholder="Add tag, press Enter"
                onKeyDown={handleTagKeyDown("tags", tags)}
                className="w-full text-sm outline-none"
              />
            </div>
            <p className="text-sm text-red-500">{errors.tags?.message}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramUpdateModalForBasic;
