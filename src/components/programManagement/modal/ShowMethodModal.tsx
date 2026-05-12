import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  usePostMethodMutation,
  useUpdateMethodMutation,
} from "@/store/features/program/programAPI";
import type {
  MethodPayload,
  TTrainingMethod,
} from "@/store/features/program/types/method";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputClass = {
  label: "block text-sm font-normal text-black font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-black text-xs border-[#A78BFA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A78BFA]",
  error: "text-red-500 text-sm mt-1",
};

const methodSchema = z.object({
  name: z.string().min(1, "Method name is required"),

  shortDescription: z.string().min(1, "Short description is required"),

  relatedDescription: z.string().min(1, "Related description is required"),

  defaultSet: z.number().min(1, "Default set is required"),

  defaultReps: z.number().min(1, "Default reps is required"),
});

type MethodFormValues = z.infer<typeof methodSchema>;

interface ShowMethodModalProps {
  setShowMethodModal: (show: boolean) => void;
  selectMethod: TTrainingMethod | null;
}

const ShowMethodModal: React.FC<ShowMethodModalProps> = ({
  setShowMethodModal,
  selectMethod,
}) => {
  const [postMethod, { isLoading }] = usePostMethodMutation();

  const [updateMethod, { isLoading: updateLoading }] =
    useUpdateMethodMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MethodFormValues>({
    resolver: zodResolver(methodSchema),

    defaultValues: {
      name: selectMethod?.name || "",

      shortDescription: selectMethod?.shortDescription || "",

      relatedDescription: selectMethod?.relatedDescription || "",

      defaultSet: selectMethod?.defaultSet || 0,

      defaultReps: selectMethod?.defaultReps || 0,
    },
  });

  const onSubmit = async (data: MethodFormValues) => {
    try {
      const payload: MethodPayload = {
        name: data.name,
        shortDescription: data.shortDescription,
        relatedDescription: data.relatedDescription,
        defaultSet: data.defaultSet,
        defaultReps: data.defaultReps,
      };

      if (selectMethod) {
        await updateMethod({
          id: selectMethod.id,
          data: payload,
        }).unwrap();
      } else {
        await postMethod(payload).unwrap();
      }

      setShowMethodModal(false);
    } catch (error) {
      console.error("Failed to save method:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <CommonHeader size="lg">
            {selectMethod
              ? "Update Training Method"
              : "Add New Training Method"}
          </CommonHeader>

          <CloseButton action={() => setShowMethodModal(false)} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className={inputClass.label}>Method Name</label>

            <input
              type="text"
              placeholder="Enter method name"
              className={inputClass.input}
              {...register("name")}
            />

            {errors.name && (
              <p className={inputClass.error}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Short Description</label>

            <textarea
              rows={3}
              placeholder="Reduce weight each set"
              className={inputClass.input}
              {...register("shortDescription")}
            />

            {errors.shortDescription && (
              <p className={inputClass.error}>
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Related Description</label>

            <textarea
              rows={5}
              placeholder="Used for hypertrophy and muscular endurance."
              className={inputClass.input}
              {...register("relatedDescription")}
            />

            {errors.relatedDescription && (
              <p className={inputClass.error}>
                {errors.relatedDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Default Sets</label>

              <input
                type="number"
                placeholder="e.g., 4"
                className={inputClass.input}
                {...register("defaultSet", {
                  valueAsNumber: true,
                })}
              />

              {errors.defaultSet && (
                <p className={inputClass.error}>{errors.defaultSet.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Default Reps</label>

              <input
                type="number"
                placeholder="e.g., 12"
                className={inputClass.input}
                {...register("defaultReps", {
                  valueAsNumber: true,
                })}
              />

              {errors.defaultReps && (
                <p className={inputClass.error}>{errors.defaultReps.message}</p>
              )}
            </div>
          </div>

          <div className="bg-[#EFF6FF] border border-blue-200 rounded-lg p-4">
            <CommonHeader size="md" className="!text-[#1C398E]">
              Method Guidelines
            </CommonHeader>

            <CommonHeader size="sm" className="!text-[#1C398E]">
              Provide clear and concise descriptions to help users understand
              the training method properly.
            </CommonHeader>
          </div>

          <div className="flex gap-4">
            <CommonButton
              type="button"
              onClick={() => setShowMethodModal(false)}
              className="!bg-white !text-[#5B667B] border border-[#5B667B]"
            >
              Cancel
            </CommonButton>

            <CommonButton type="submit" disabled={isLoading || updateLoading}>
              {isLoading || updateLoading
                ? selectMethod
                  ? "Updating..."
                  : "Adding..."
                : selectMethod
                  ? "Update Method"
                  : "Add Method"}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowMethodModal;
