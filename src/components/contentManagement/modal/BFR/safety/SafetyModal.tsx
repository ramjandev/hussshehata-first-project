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
  usePostSafetyMutation,
  useUpdateSafetyMutation,
} from "@/store/features/content/contentAPI";
import type { SafetyContentItem } from "@/store/features/content/types/saftey";
import RichTextEditor from "../../RichTextEditor";

const safetySchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Short description is required"),
  finalMessage: z.string().min(1, "Final  message is required"),
  content: z
    .string()
    .min(1, "Rich content is required")
    .refine((val) => val !== "<p></p>" && val !== "<p><br></p>", {
      message: "Rich content cannot be empty",
    }),
  isActive: z.boolean(),
});
type CreateBSafetyPayload = z.infer<typeof safetySchema>;
interface AddBFRSessionModalProps {
  onClose: () => void;
  selectSafety?: SafetyContentItem | null;
}

const SafetyModal: React.FC<AddBFRSessionModalProps> = ({
  onClose,
  selectSafety,
}) => {
  const [postSafety, { isLoading }] = usePostSafetyMutation();
  const [updateSafety, { isLoading: isUpdating }] = useUpdateSafetyMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBSafetyPayload>({
    resolver: zodResolver(safetySchema) as any,
    defaultValues: {
      title: selectSafety?.title || "",
      category: selectSafety?.category || undefined,
      description: selectSafety?.description || undefined,
      finalMessage: selectSafety?.finalMessage || undefined,
      content: selectSafety?.content || "",
      isActive: selectSafety?.isActive || false,
    },
  });

  const handleFormSubmit = async (data: CreateBSafetyPayload) => {
    if (selectSafety?.id) {
      await updateSafety({ id: selectSafety.id, data });
    } else {
      await postSafety(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <CommonHeader size="xl">
              {selectSafety ? "Edit safety declaimer" : "Add safety declaimer"}
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
                  name="category"
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
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Description</label>
                <textarea
                  {...register("description")}
                  placeholder="For chest, shoulders, arms using light loads."
                  className={inputClass.input}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Final Message</label>
                <textarea
                  {...register("finalMessage")}
                  placeholder="For chest, shoulders, arms using light loads."
                  className={inputClass.input}
                />
                {errors.finalMessage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.finalMessage.message}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={(html) => field.onChange(html)}
                    />
                  )}
                />
                {errors.content && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <CommonButton type="submit" disabled={isLoading || isUpdating}>
                {isLoading || isUpdating ? (
                  <ButtonWithLoading
                    title={selectSafety ? "Updating..." : "Saving..."}
                  />
                ) : selectSafety ? (
                  "Update safety declaimer"
                ) : (
                  "Save safety declaimer"
                )}
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SafetyModal;
