import CommonCard from "@/common/CommonCard";
import { Activity, Award, DollarSign, Users } from "lucide-react";

const DashboardCard = () => {
  const cardsData = [
    {
      icon: Users,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      percentage: "+12.5%",
      value: "3,421",
      title: "Total Users",
      subtitle: "1,050 Premium 2,371 Free",
      subtitleColor: "text-purple-600",
    },
    {
      icon: DollarSign,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      percentage: "+12.5%",
      value: "$28,900",
      title: "Monthly Revenue",
      subtitle: "105 active subscriptions",
      subtitleColor: "text-cyan-500",
    },
    {
      icon: Activity,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      percentage: "+12.5%",
      value: "2,463",
      title: "Active Enrolments",
      subtitle: "Across 04 programs",
      subtitleColor: "text-cyan-500",
    },
    {
      icon: Award,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      percentage: "+12.5%",
      value: "340",
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
            percentage={card.percentage}
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
