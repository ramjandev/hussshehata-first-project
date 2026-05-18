import SectionHeader from "@/common/button/SectionHeader";
import {
  useRevenueGrowthQuery,
  useUserGrowthQuery,
} from "@/store/features/premium/premiumFeature";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RevenueAndSubscription = () => {
  const { data } = useUserGrowthQuery();

  const userGrowthData =
    data?.data?.items?.map((item: { month: string; newUsers: number }) => ({
      month: item.month,
      free: item.newUsers,
    })) || [];

  const { data: revenue } = useRevenueGrowthQuery();
  const revenueData =
    revenue?.data?.items?.map(
      (item: { month: string; revenue: number; newSubscriptions: number }) => ({
        month: item.month,
        value: item.revenue,
      }),
    ) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white text-black rounded-2xl p-6">
        <SectionHeader
          title="Revenue & Subscriptions"
          description=" Monthly revenue and new subscriptions trend"
        />

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86efac" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#86efac" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4ade80"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              fillOpacity={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white text-black rounded-2xl p-6">
        <SectionHeader title="User Growth" description="Monthly user growth" />

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Bar dataKey="free" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="premium" fill="#a855f7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">User</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAndSubscription;
