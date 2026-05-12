import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import { inputClass } from "@/components/programManagement/modal/showExerciseModal";
import {
  usePostHealthMarkerMutation,
  useUpdateHealthMarkerMutation,
} from "@/store/features/content/essentialManagement";
import type { HealthMarkerItem } from "@/store/features/content/types/healthCare";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const healthMarkerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  details: z
    .array(z.string().min(1, "Detail cannot be empty"))
    .min(1, "At least one detail is required"),
});

export type HealthMarkerPayload = z.infer<typeof healthMarkerSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedHealthMarker: HealthMarkerItem | null;
};

const HealthMarkerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedHealthMarker,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HealthMarkerPayload>({
    resolver: zodResolver(healthMarkerSchema),
    defaultValues: {
      title: "",
      details: [],
    },
  });

  console.log("selectedHealthMarker", selectedHealthMarker);

  const [tagInput, setTagInput] = useState("");
  const details = watch("details") || [];

  useEffect(() => {
    if (selectedHealthMarker) {
      reset({
        title: selectedHealthMarker.title,
        details: selectedHealthMarker.items,
      });
    } else {
      reset({ title: "", details: [] });
    }
  }, [selectedHealthMarker, reset]);

  if (!isOpen) return null;

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;

    if (details.includes(trimmed)) {
      alert("Tag already exists");
      return;
    }

    setValue("details", [...details, trimmed], { shouldValidate: true });
    setTagInput("");
  };

  const removeTag = (index: number) => {
    const newTags = details.filter((_, i) => i !== index);
    setValue("details", newTags, { shouldValidate: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const [postHealthMarker, { isLoading }] = usePostHealthMarkerMutation();
  const [updateHealthMarker, { isLoading: isUpdating }] =
    useUpdateHealthMarkerMutation();
  const onSubmit = async (data: HealthMarkerPayload) => {
    if (selectedHealthMarker) {
      await updateHealthMarker({ id: selectedHealthMarker.id, data });
    } else {
      await postHealthMarker(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {selectedHealthMarker ? "Edit Health Marker" : "Add Health Marker"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className={inputClass.label}>Title</label>
            <input
              {...register("title")}
              className={inputClass.input}
              placeholder="Enter title"
            />
            {errors.title && (
              <p className={inputClass.error}>{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Details</label>
            <div className="flex flex-wrap gap-2 border p-2 rounded-lg min-h-[50px]">
              {details.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 text-red-500 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter tags"
                className="flex-1 border-none outline-none min-w-[120px]"
              />
            </div>
            {errors.details && (
              <p className={inputClass.error}>{errors.details.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <CommonButton variant="secondary" onClick={onClose}>
              Cancel
            </CommonButton>
            <CommonButton type="submit">
              {isLoading || isUpdating ? (
                <ButtonWithLoading title="Saving..." />
              ) : selectedHealthMarker ? (
                "Update Health Marker"
              ) : (
                "Add Health Marker"
              )}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthMarkerModal;
