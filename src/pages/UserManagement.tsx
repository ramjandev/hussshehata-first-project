import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import CommonCard from "@/common/CommonCard";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
import DashboardTopSection from "@/common/DashboardTopSection";
import AllClients from "@/components/userManagement/AllClients";
import AllCoached from "@/components/userManagement/AllCoached";
import AllUsers from "@/components/userManagement/AllUsers";
import ClientAndCoached from "@/components/userManagement/ClientAndCoached";
import UserSearchBar from "@/components/userManagement/UserSearchBar";
import { useGetUserManagementQuery } from "@/store/features/program/programAPI";
import type { UserType } from "@/store/features/program/types/review";
import { Activity, Crown, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import UserTabs from "./UserTabs";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("All Users");

  const tabs = ["All Users", "Clients", "Coaches", "Coached Client"];

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const [userType, setUserType] = useState<UserType>("");
  const { data, isLoading } = useGetUserManagementQuery(
    {
      page,
      search: searchDebounce,
      role: userType,
    },
    { refetchOnMountOrArgChange: true },
  );

  const allUsers = data?.data.data ?? [];
  const dashboardData = data?.data.dashboardData;
  useEffect(() => {
    const tabMap: Record<string, UserType | ""> = {
      "All Users": "",
      Clients: "USER",
      Coaches: "COACH",
    };

    if (tabMap[activeTab] !== undefined) {
      setUserType(tabMap[activeTab]);
    }

    setPage(1);
  }, [activeTab]);

  const statsData = [
    {
      icon: Users,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      value: dashboardData?.totalUserCount ?? 0,
      title: "Total Users",
    },
    {
      icon: Activity,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      value: dashboardData?.totalActiveUser ?? 0,
      title: "Active Users",
    },
    {
      icon: Crown,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      value: dashboardData?.premiumUser ?? 0,
      title: "Premium Users",
    },
    {
      icon: UserPlus,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      value: dashboardData?.lastMonthUserCount ?? 0,
      title: "New This Month",
    },
  ];

  const list = new Array(4).fill(null);

  return (
    <div className=" space-y-6">
      <DashboardTopSection
        title="User Management"
        description="Manage all users, clients, and coaches on the platform"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? list.map((_, index) => <DashboardCardSkeleton key={index} />)
          : statsData.map((stat) => (
              <CommonCard
                key={stat.title}
                icon={stat.icon}
                iconBgColor={stat.iconBgColor}
                iconColor={stat.iconColor}
                value={stat.value}
                title={stat.title}
              />
            ))}
      </div>

      <div className="w-full">
        <UserTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {activeTab !== "Activity Tracking" && (
        <UserSearchBar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />
      )}

      <LoadingStatus isLoading={isLoading} items={allUsers} itemName="users" />

      {!isLoading && allUsers.length > 0 && (
        <>
          {activeTab === "All Users" && <AllUsers users={allUsers} />}

          {activeTab === "Clients" && <AllClients users={allUsers} />}

          {activeTab === "Coaches" && <AllCoached users={allUsers} />}

          {activeTab === "Coached Client" && (
            <ClientAndCoached users={allUsers} />
          )}

          {/* {activeTab === "Activity Tracking" && (
            <Tracking activity={activity as ActivityTrackingResponse} />
          )} */}

          {data?.data.data && data?.data?.data?.length > 1 && (
            <Pagination
              totalPages={data?.data?.meta?.totalPage ?? 0}
              currentPage={page}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserManagement;
