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
  usePostResearchMutation,
  useUpdateResearchMutation,
} from "@/store/features/content/contentAPI";
import type {
  ResearchEducation,
  ResearchEducationPayload,
} from "@/store/features/content/types/research";
import RichTextEditor from "../../RichTextEditor";

const researchSchema = z.object({
  title: z.string().min(1, "Title is required"),
  researchCategory: z.enum(
    ["BASIC", "SAFETY", "PROGRAMMING", "RECOVERY", "REHAB"],
    {
      message: "Category is required",
    },
  ),
  sortOrder: z.coerce
    .number({ message: "Time must be a number" })
    .min(1, "order is required"),
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
  selectResearch?: ResearchEducation | null;
}

const ResearchModal: React.FC<AddBFRSessionModalProps> = ({
  onClose,
  selectResearch,
}) => {
  const [postResearch, { isLoading }] = usePostResearchMutation();
  const [updateResearch, { isLoading: isUpdating }] =
    useUpdateResearchMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResearchEducationPayload>({
    resolver: zodResolver(researchSchema) as any,
    defaultValues: {
      title: selectResearch?.title || "",
      researchCategory: selectResearch?.researchCategory || undefined,
      shortDescription: selectResearch?.shortDescription || "",
      richContent: selectResearch?.richContent || "",
      sortOrder: selectResearch?.sortOrder || 0,
    },
  });

  const handleFormSubmit = async (data: ResearchEducationPayload) => {
    if (selectResearch?.id) {
      await updateResearch({
        id: selectResearch.id,
        data,
      }).unwrap();
    } else {
      await postResearch(data).unwrap();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <CommonHeader size="xl">
              {selectResearch
                ? "Edit Research & Educations"
                : "Add Research & Educations"}
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
                <label className={inputClass.label}>Sort Order</label>
                <input
                  {...register("sortOrder", { valueAsNumber: true })}
                  type="number"
                  placeholder="1"
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
                  name="researchCategory"
                  control={control}
                  render={({ field }) => (
                    <CommonSelect
                      value={field.value}
                      item={[
                        { value: "BASIC", label: "Basic" },
                        { value: "SAFETY", label: "Safety" },
                        { value: "PROGRAMMING", label: "Programming" },
                        { value: "RECOVERY", label: "Recovery" },
                        { value: "REHAB", label: "Rehab" },
                      ]}
                      onValueChange={(val) => field.onChange(val)}
                      className="!w-full"
                    />
                  )}
                />
                {errors.researchCategory && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.researchCategory.message}
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
                    title={selectResearch ? "Updating..." : "Saving..."}
                  />
                ) : selectResearch ? (
                  "Update content"
                ) : (
                  "Save content"
                )}
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResearchModal;
