import CommonCard from "@/common/CommonCard";
import DashboardTopSection from "@/common/DashboardTopSection";
import AllProgram from "@/components/programManagement/AllProgram";
import CreateProgramModal from "@/components/programManagement/modal/CreateProgramModal";
import ProgramAnalytics from "@/components/programManagement/ProgramAnalytics";
import Training from "@/components/programManagement/Training";
import { openProgramModal } from "@/store/baseApi/programSlice/program.slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Clock, Crown, Dumbbell, Users } from "lucide-react";
import { useState } from "react";
import UserTabs from "./UserTabs";
export const cardGrid =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ";
const ProgramManagement = () => {
  const [activeTab, setActiveTab] = useState("All Programs");

  const statsData = [
    {
      icon: Dumbbell,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      value: "4",
      title: "Total Programs",
    },
    {
      icon: Users,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      value: "987",
      title: "Active Enrolments",
    },
    {
      icon: Crown,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      value: "01",
      title: "Premium Programs",
    },
    {
      icon: Clock,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      value: "78%",
      title: "Avg Completion",
    },
  ];

  const tabs = [
    "All Programs",
    "Training Methods Library",
    "Program Analytics",
  ];

  const { isProgramModalOpen } = useAppSelector((state) => state.program);
  const dispatch = useAppDispatch();
  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="Program Management"
        description="Create and manage comprehensive workout programs"
        buttonText="Create Program"
        action={() => {
          dispatch(openProgramModal());
        }}
      />

      <div className={cardGrid}>
        {statsData.map((stat, index) => {
          return <CommonCard key={index} {...stat} />;
        })}
      </div>

      <UserTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "All Programs" && <AllProgram />}
      {activeTab === "Training Methods Library" && <Training />}
      {activeTab === "Program Analytics" && <ProgramAnalytics />}
      {isProgramModalOpen && <CreateProgramModal />}
    </div>
  );
};

export default ProgramManagement;
