import image from "@/assets/images/woman.png";
import SectionHeader from "@/common/button/SectionHeader";
import type { ActivityTrackingResponse } from "@/store/features/program/types/activity";

interface TrackingProps {
  activity: ActivityTrackingResponse;
}
const Tracking: React.FC<TrackingProps> = ({ activity }) => {
  const recentActivity = activity?.data?.userActivityLog ?? [];
  const activeUsers = activity?.data?.mostRecentActiveUser ?? [];
  const popularPrograms = activity?.data?.mostPopulerProgramme ?? [];
  return (
    <div className="space-y-6">
      {/* Recent User Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <SectionHeader
          title="Recent User Activity"
          description="Real-time user actions and workout completions"
        />

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={image || activity.type}
                  alt={activity.type || "User"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.type}
                  </p>
                  <p className="text-xs text-gray-600">
                    Completed "Monster Mass Builder - Week 3, Day 2
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500"> 2 min</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium }`}
                >
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Most Active Users */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <SectionHeader
            title="Most Active Users (This Week)"
            description="Latest user actions and events"
          />

          <div className="space-y-4">
            {activeUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">{user.streakDays}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.totalWorkouts}
                  </p>
                  <p className="text-xs text-gray-500">workouts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular Programs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <SectionHeader
            title="Most Popular Programs (This Week)"
            description="By enrollments and completion rate"
          />

          <div className="space-y-4">
            {popularPrograms.map((program, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {program.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {program.users} users
                    </span>
                    <span className="text-sm text-gray-500">
                      {program.completionRate}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${program.completionRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
