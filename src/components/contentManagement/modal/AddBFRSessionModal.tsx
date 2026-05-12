import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";
import { inputClass } from "@/components/programManagement/modal/showExerciseModal";
import {
  usePostBFRMutation,
  useUpdateBFRMutation,
} from "@/store/features/content/contentAPI";
import type {
  BfrSession,
  CreateBfrSessionPayload,
} from "@/store/features/content/types/bfr";
import RichTextEditor from "./RichTextEditor";

// ─── Schema ────────────────────────────────────────────────────────────────────

const bfrSessionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sessionCategory: z.enum(["HYPERTROPHY", "STRENGTH", "ENDURANCE"], {
    message: "Category is required",
  }),
  bodyType: z.enum(["UPPER", "LOWER", "FULL"], {
    message: "Body type is required",
  }),
  time: z.coerce
    .number({ message: "Time must be a number" })
    .min(1, "Time is required"),
  exercise: z.coerce
    .number({ message: "Exercise must be a number" })
    .min(1, "Exercise is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  richContent: z
    .string()
    .min(1, "Rich content is required")
    .refine((val) => val !== "<p></p>" && val !== "<p><br></p>", {
      message: "Rich content cannot be empty",
    }),
});

interface AddBFRSessionModalProps {
  onClose: () => void;
  selectBfr?: BfrSession | null;
}

const AddBFRSessionModal: React.FC<AddBFRSessionModalProps> = ({
  onClose,
  selectBfr,
}) => {
  const [postBFR, { isLoading }] = usePostBFRMutation();
  const [updateBFR, { isLoading: isUpdating }] = useUpdateBFRMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBfrSessionPayload>({
    resolver: zodResolver(bfrSessionSchema) as any,
    defaultValues: {
      title: selectBfr?.title || "",
      sessionCategory: selectBfr?.sessionCategory || undefined,
      bodyType: selectBfr?.bodyType || undefined,
      time: selectBfr?.durationMinutes || undefined,
      exercise: selectBfr?.exerciseCount || undefined,
      shortDescription: selectBfr?.shortDescription || "",
      richContent: selectBfr?.richContent || "",
    },
  });

  const handleFormSubmit = async (data: CreateBfrSessionPayload) => {
    if (selectBfr?.id) {
      await updateBFR({ bfrId: selectBfr.id, data });
    } else {
      await postBFR(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <CommonHeader size="xl">
              {selectBfr ? "Edit BFR Session" : "Add BFR Session"}
            </CommonHeader>
            <CloseButton action={onClose} />
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-4 border border-darkBlue rounded-lg p-6">
              <div>
                <label className={inputClass.label}>Title</label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Upper Body Hypertrophy BFR"
                  className={inputClass.input}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Category</label>
                <Controller
                  name="sessionCategory"
                  control={control}
                  render={({ field }) => (
                    <CommonSelect
                      value={field.value}
                      item={[
                        { value: "HYPERTROPHY", label: "Hypertrophy" },
                        { value: "STRENGTH", label: "Strength" },
                        { value: "ENDURANCE", label: "Endurance" },
                      ]}
                      onValueChange={(val) => field.onChange(val)}
                      className="!w-full"
                    />
                  )}
                />
                {errors.sessionCategory && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.sessionCategory.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Body Type</label>
                <Controller
                  name="bodyType"
                  control={control}
                  render={({ field }) => (
                    <CommonSelect
                      value={field.value}
                      item={[
                        { value: "UPPER", label: "Upper" },
                        { value: "LOWER", label: "Lower" },
                        { value: "FULL", label: "Full Body" },
                      ]}
                      onValueChange={(val) => field.onChange(val)}
                      className="!w-full"
                    />
                  )}
                />
                {errors.bodyType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bodyType.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Time</label>
                <input
                  {...register("time")}
                  type="number"
                  placeholder="20 min"
                  className={inputClass.input}
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.time.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Exercise</label>
                <input
                  {...register("exercise")}
                  type="number"
                  placeholder="04"
                  className={inputClass.input}
                />
                {errors.exercise && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.exercise.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Short Description</label>
                <textarea
                  {...register("shortDescription")}
                  placeholder="For chest, shoulders, arms using light loads."
                  className={inputClass.input}
                />
                {errors.shortDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="richContent"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={(html) => field.onChange(html)}
                    />
                  )}
                />
                {errors.richContent && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.richContent.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <CommonButton type="submit" disabled={isLoading || isUpdating}>
                {isLoading || isUpdating ? (
                  <ButtonWithLoading
                    title={selectBfr ? "Updating..." : "Saving..."}
                  />
                ) : selectBfr ? (
                  "Update Execution Note"
                ) : (
                  "Save Execution Note"
                )}
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBFRSessionModal;
