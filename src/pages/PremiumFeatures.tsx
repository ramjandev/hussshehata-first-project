import CommonButton from "@/common/button/CommonButton";
import TabButton from "@/common/custom/TabButton";
import DashboardTopSection from "@/common/DashboardTopSection";
import Payment from "@/components/feature/Payment";
import SubscriptionPlan from "@/components/feature/SubscriptionPlan";
import type { SubscriptionPlanType } from "@/store/features/premium/types/premium";
import React, { useState } from "react";

type TabType = "subscription" | "payment";

const PremiumFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("subscription");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlanType | null>(
    null,
  );
  return (
    <div className="w-full max-w-full">
      <DashboardTopSection
        title="Premium Features Control"
        description="Manage subscription plans, payments, and premium feature access"
      />

      <div className="flex justify-between items-start">
        <div className="flex gap-2 mb-8">
          <TabButton
            label="Subscription"
            value="subscription"
            activeValue={activeTab}
            onChange={setActiveTab}
          />
          <TabButton
            label="Payment"
            value="payment"
            activeValue={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === "subscription" && (
          <CommonButton
            onClick={() => {
              setIsModalOpen(true);
              setEditingPlan(null);
            }}
          >
            Create New Plan
          </CommonButton>
        )}
      </div>
      {activeTab === "subscription" && (
        <SubscriptionPlan
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
        />
      )}

      {activeTab === "payment" && <Payment />}
    </div>
  );
};

export default PremiumFeatures;
