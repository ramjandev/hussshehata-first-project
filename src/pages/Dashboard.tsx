import DashboardTopSection from "@/common/DashboardTopSection";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RevenueAndSubscription from "@/components/dashboard/RevenueAndSubscription";
import UserAndProgram from "@/components/dashboard/UserAndProgram";

const Dashboard = () => {
  return (
    <div className="">
      <DashboardTopSection
        title="Dashboard"
        description="Welcome back! Here's what's happening with your fitness platform."
      />

      <DashboardCard />
      <RevenueAndSubscription />
      <UserAndProgram />
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
