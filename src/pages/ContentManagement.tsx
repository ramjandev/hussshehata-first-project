import DashboardTopSection from "@/common/DashboardTopSection";
import BFRSessionsGuidelines from "@/components/contentManagement/BFRSessionsGuidelines";
import Essential from "@/components/contentManagement/Essential";
import Execution from "@/components/contentManagement/Execution";
import HomePageContent from "@/components/contentManagement/HomePageContent";
import Premium from "@/components/contentManagement/Premium";
import React, { useState } from "react";
import UserTabs from "./UserTabs";

const tabs = [
  "Home Page Content",
  "Premium Lock Library",
  "Execution Notes",
  "BFR Sessions Guidelines",
  "Essential Management",
];

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Home Page Content");

  return (
    <div className="">
      <DashboardTopSection
        title="Content Management"
        description="Manage app content, premium features, and training notes"
      />

      <div className="w-full">
        <UserTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="py-6">
        {activeTab === "Home Page Content" && <HomePageContent />}
        {activeTab === "Premium Lock Library" && <Premium />}
        {activeTab === "Execution Notes" && <Execution />}
        {activeTab === "BFR Sessions Guidelines" && <BFRSessionsGuidelines />}
        {activeTab === "Essential Management" && <Essential />}
      </div>
    </div>
  );
};

export default ContentManagement;
