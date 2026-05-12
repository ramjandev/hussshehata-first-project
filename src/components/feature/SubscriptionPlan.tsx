import ActionButton from "@/common/button/ActionButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  useDeletePlansMutation,
  useGetPlansQuery,
} from "@/store/features/premium/premiumFeature";
import type { SubscriptionPlanType } from "@/store/features/premium/types/premium";
import { Check, Trash2 } from "lucide-react";
import { useState } from "react";
import PlanModel from "./PlanModel";

interface SubscriptionPlanProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editingPlan: SubscriptionPlanType | null;
  setEditingPlan: (plan: SubscriptionPlanType | null) => void;
}
const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  isModalOpen,
  setIsModalOpen,
  editingPlan,
  setEditingPlan,
}) => {
  const { data: plansData, isLoading } = useGetPlansQuery();

  const handleEditPlan = (plan: SubscriptionPlanType) => {
    setIsModalOpen(true);
    setEditingPlan(plan);
  };
  const plans = plansData?.data ?? [];
  const list = new Array(3).fill(0);

  const [deletePlan] = useDeletePlansMutation();

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleDeletePlan = async (id: string) => {
    try {
      setSelectedPlanId(id);
      if (id) {
        await deletePlan(id).unwrap();
      }

      setSelectedPlanId(null);
    } catch (error) {
      console.error("Delete failed:", error);
      setSelectedPlanId(null);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {isLoading ? (
          <>
            {list.map((_, index) => (
              <DashboardCardSkeleton key={index} />
            ))}
          </>
        ) : plans.length > 0 ? (
          plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative flex flex-col justify-between"
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-darkPurple text-white text-xs font-semibold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <CommonHeader size="lg" className="">
                  {plan.name}
                </CommonHeader>
                <div className="flex items-baseline gap-1 pt-2">
                  <CommonHeader size="3xl" className="text-[#0A0A0A]">
                    ${plan.priceUSD.toFixed(2)}
                  </CommonHeader>

                  <span className="text-[#4A5565]">{plan.periodLabel}</span>
                </div>
                {plan.savingsPercent && (
                  <span className="inline-block mt-2 px-2 py-1 text-[#008236] text-sm font-medium rounded bg-[#DCFCE7]">
                    Save {plan.savingsPercent}%
                  </span>
                )}

                <ul className="space-y-3 my-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <CommonHeader size="sm" className="">
                        {feature}
                      </CommonHeader>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => handleEditPlan(plan)}
                  className={`w-full py-2.5 rounded-md font-medium transition-colors cursor-pointer ${
                    plan.isPopular
                      ? "bg-darkPurple text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Edit Plan
                </button>
                <ActionButton
                  isDelete={selectedPlanId === plan.id}
                  variant="delete"
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  <Trash2 size={16} />
                </ActionButton>
              </div>
            </div>
          ))
        ) : (
          <p>No plans available.</p>
        )}
      </div>

      {isModalOpen && (
        <PlanModel
          editingPlan={editingPlan as SubscriptionPlanType}
          handleCloseModal={() => setIsModalOpen(false)}
          setEditingPlan={setEditingPlan}
        />
      )}
    </div>
  );
};

export default SubscriptionPlan;
