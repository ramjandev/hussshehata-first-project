import CommonCard from "@/common/CommonCard";
import { useGetDashboardStartQuery } from "@/store/features/premium/premiumFeature";
import { Activity, Award, DollarSign, Users } from "lucide-react";

const DashboardCard = () => {
  const { data } = useGetDashboardStartQuery();
  const cardsData = [
    {
      icon: Users,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      percentage: "+12.5%",
      value: `${data?.data?.totalUsers}`,
      title: "Total Users",
      subtitle: "1,050 Premium 2,371 Free",
      subtitleColor: "text-purple-600",
    },
    {
      icon: DollarSign,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      percentage: "+12.5%",
      value: `${data?.data?.monthlyRevenue || 0}`,
      title: "Monthly Revenue",
      subtitle: "105 active subscriptions",
      subtitleColor: "text-cyan-500",
    },
    {
      icon: Activity,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      percentage: "+12.5%",
      value: `${data?.data?.activeEnrollments || 0}`,
      title: "Active Enrolments",
      subtitle: "Across 04 programs",
      subtitleColor: "text-cyan-500",
    },
    {
      icon: Award,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      percentage: "+12.5%",
      value: `${data?.data?.totalCoachedClients || 0}`,
      title: "Total Coached Clients",
      subtitle: "This month 24",
      subtitleColor: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {cardsData.map((card) => {
        return (
          <CommonCard
            key={card.title}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
            value={card.value}
            title={card.title}
            subtitle={card.subtitle}
            subtitleColor={card.subtitleColor}
            // percentage={card.percentage}
            showSplit={true}
            splitPremium={card.subtitle.split(" ")[0]}
            splitFree={card.subtitle.split(" ")[2]}
          />
        );
      })}
    </div>
  );
};

export default DashboardCard;
