import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";
import { Plus, X } from "lucide-react";
import { inputClass } from "../programManagement/modal/showExerciseModal";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  useCreatePlansMutation,
  useUpdatePlansMutation,
} from "@/store/features/premium/premiumFeature";
import type { SubscriptionPlanType } from "@/store/features/premium/types/premium";
import {
  planFormSchema,
  type CreatePlanPayload,
  type PlanFormValues,
} from "./planSchema";

interface PlanModelProps {
  editingPlan: SubscriptionPlanType | null;
  setEditingPlan: (plan: SubscriptionPlanType | null) => void;
  handleCloseModal: () => void;
}

const PlanModel: React.FC<PlanModelProps> = ({
  editingPlan,
  handleCloseModal,
  setEditingPlan,
}) => {
  const isEdit = !!editingPlan;

  const [createPlan, { isLoading: creating }] = useCreatePlansMutation();
  const [updatePlan, { isLoading: updating }] = useUpdatePlansMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: editingPlan
      ? {
          name: editingPlan.name,
          plan: editingPlan.plan,
          priceUSD: editingPlan.priceUSD,
          features: (editingPlan.features as string[]).map((v) => ({
            value: v,
          })),
          isActive: editingPlan.isActive,
          billingPeriod: editingPlan.billingPeriod,
          savingsPercent: editingPlan.savingsPercent,
          isPopular: editingPlan.isPopular,
        }
      : {
          name: "",
          plan: "FREE",
          priceUSD: 0,
          features: [{ value: "" }],
          isActive: true,
          billingPeriod: null,
          savingsPercent: null,
          isPopular: false,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const planType = watch("plan");

  const onSubmit = async (formData: PlanFormValues) => {
    try {
      if (isEdit && editingPlan) {
        const baseUpdatePayload = {
          priceUSD: formData.priceUSD,
          features: formData.features.map((f) => f.value),
          isActive: formData.isActive,
        };

        let updatePayload;

        if (formData.plan === "FREE") {
          updatePayload = { ...baseUpdatePayload };
        } else if (formData.plan === "MONTHLY") {
          updatePayload = {
            ...baseUpdatePayload,
            billingPeriod: "MONTHLY" as const,
            isPopular: formData.isPopular || false,
          };
        } else {
          updatePayload = {
            ...baseUpdatePayload,
            billingPeriod: "ANNUAL" as const,
            savingsPercent: formData.savingsPercent || undefined,
            isPopular: formData.isPopular || false,
          };
        }

        await updatePlan({ id: editingPlan.id, data: updatePayload }).unwrap();
      } else {
        const basePayload = {
          name: formData.name,
          plan: formData.plan,
          priceUSD: formData.priceUSD,
          features: formData.features.map((f) => f.value),
          isActive: formData.isActive,
        };

        let createPayload: CreatePlanPayload;

        if (formData.plan === "FREE") {
          createPayload = { ...basePayload, plan: "FREE" };
        } else if (formData.plan === "MONTHLY") {
          createPayload = {
            ...basePayload,
            plan: "MONTHLY",
            billingPeriod: "MONTHLY",
            isPopular: formData.isPopular || false,
          };
        } else {
          createPayload = {
            ...basePayload,
            plan: "ANNUAL",
            billingPeriod: "ANNUAL",
            savingsPercent: formData.savingsPercent || undefined,
            isPopular: formData.isPopular || false,
          };
        }

        await createPlan(createPayload).unwrap();
      }

      reset();
      setEditingPlan(null);
      handleCloseModal();
    } catch (err) {
      console.error("Failed to save plan:", err);
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={handleCloseModal} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-8">
              <div className="flex justify-between pb-2">
                <CommonHeader size="lg">
                  {isEdit ? "Edit" : "Add"} Plan
                  {isEdit && `: ${editingPlan.name}`}
                </CommonHeader>
                <CloseButton action={handleCloseModal} />
              </div>

              <div className="border border-darkPurple rounded-2xl p-6 mb-6">
                <div className="mb-6">
                  <label className={inputClass.label}>Plan Name</label>
                  <input
                    {...register("name")}
                    className={inputClass.input}
                    placeholder="Enter plan name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className={inputClass.label}>Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("priceUSD", { valueAsNumber: true })}
                    className={inputClass.input}
                    placeholder="0.00"
                  />
                  {errors.priceUSD && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.priceUSD.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className={inputClass.label}>Billing Period</label>
                  <CommonSelect
                    value={planType}
                    item={[
                      { value: "FREE", label: "Free" },
                      { value: "MONTHLY", label: "Monthly" },
                      { value: "ANNUAL", label: "Annual" },
                    ]}
                    onValueChange={(val) => {
                      setValue("plan", val as PlanFormValues["plan"]);
                      if (val === "FREE") {
                        setValue("billingPeriod", null);
                        setValue("savingsPercent", null);
                        setValue("isPopular", false);
                      } else if (val === "MONTHLY") {
                        setValue("billingPeriod", "MONTHLY");
                        setValue("savingsPercent", null);
                      } else {
                        setValue("billingPeriod", "ANNUAL");
                      }
                    }}
                    className="w-full!"
                  />
                </div>

                {planType !== "FREE" && (
                  <>
                    <div className="mb-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("isPopular")}
                          className="w-4 h-4 rounded-md border-gray-300 accent-[#1447E6]  text-white"
                        />
                        <span className={``}>Mark as Popular</span>
                      </label>
                    </div>
                  </>
                )}

                {planType === "ANNUAL" && (
                  <div className="mb-6">
                    <label className={inputClass.label}>Savings %</label>
                    <input
                      type="number"
                      step="1"
                      {...register("savingsPercent", { valueAsNumber: true })}
                      className={inputClass.input}
                      placeholder="e.g., 17"
                    />
                    {errors.savingsPercent && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.savingsPercent.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className={inputClass.label}>Features</label>
                    <button
                      type="button"
                      onClick={() => append({ value: "" })}
                      className="flex items-center gap-1 text-darkPurple font-medium hover:text-darkPurple/80 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Feature
                    </button>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-3">
                        <input
                          {...register(`features.${index}.value`)}
                          className={inputClass.input}
                          placeholder={`Feature ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {errors.features && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.features.message}
                    </p>
                  )}
                </div>
              </div>

              <CommonButton
                type="submit"
                disabled={creating || updating}
                className="w-full"
              >
                {creating || updating ? "Saving..." : "Save Changes"}
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanModel;
