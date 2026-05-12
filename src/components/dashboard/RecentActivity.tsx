import SectionHeader from "@/common/button/SectionHeader";
import { Activity, Crown, Dumbbell, UserPlus } from "lucide-react";

const topContent = [
  { title: "BFR Training Guide", category: "Education", time: "5 min ago" },
  {
    title: "Lower BFR Conditioning",
    category: "BFR Sessions",
    time: "5 min ago",
  },
  {
    title: "Lower BFR Conditioning",
    category: "BFR Sessions",
    time: "5 min ago",
  },
];
const activities = [
  {
    name: "John Smith",
    action: "Upgraded to Premium",
    time: "5 min ago",
    icon: Crown,
  },
  {
    name: "Sarah Johnson",
    action: "Enrolled in Monster Mass Builder",
    time: "5 min ago",
    icon: Dumbbell,
  },
  {
    name: "Sarah Johnson",
    action: "New user registration",
    time: "5 min ago",
    icon: UserPlus,
  },
];

const RecentActivity = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white text-black rounded-2xl p-6">
        <SectionHeader
          title="Recent Activity"
          description="Latest user actions and events"
        />

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{activity.name}</p>
                    <p className="text-gray-500 text-xs">{activity.action}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white text-black rounded-2xl p-6">
        <SectionHeader
          title="Top Content"
          description="Most viewed this week"
        />

        <div className="space-y-4">
          {topContent.map((content, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{content.title}</p>
                  <p className="text-gray-500 text-xs">{content.category}</p>
                </div>
              </div>
              <span className="text-gray-400 text-xs">{content.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
